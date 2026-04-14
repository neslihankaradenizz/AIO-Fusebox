import { startCamera }                                                         from './camera.js';
import { loadValidCombinations, validateCombination, sortDetections }          from './combination.js';
import { syncCanvasSize, clearCanvas, drawRoi, drawDetections, cropRoi, getClassName } from './overlay.js';

const CACHE_NAME = 'fusebox-v3';

const video          = document.getElementById('video');
const snapshot       = document.getElementById('snapshot');
const canvas         = document.getElementById('canvas');
const loadingOverlay = document.getElementById('loading-overlay');
const loadingMsg     = document.getElementById('loading-message');
const statusText     = document.getElementById('status-text');
const bottomBar      = document.getElementById('bottom-bar');
const resultLabel    = document.getElementById('result-label');
const detectedIdsEl  = document.getElementById('detected-ids');
const btnCapture     = document.getElementById('btn-capture');
const btnMatch       = document.getElementById('btn-match');
const btnRetake      = document.getElementById('btn-retake');

let capturedCanvas = null;
let previewRunning = false;
let worker         = null; // worker global — hem preview hem match kullanır

// FPS ADAPTASYONU
const isLowEnd = (navigator.hardwareConcurrency ?? 4) <= 4 ||
                 (navigator.deviceMemory        ?? 4) <= 2;
console.log(`[Perf] ${isLowEnd ? 'Düşük uçlu' : 'Yüksek uçlu'} cihaz`);

function onResize() {
  const source = video.style.display !== 'none' ? video : snapshot;
  syncCanvasSize(canvas, source);
}
window.addEventListener('resize', onResize);

let lastHadDetections = false;
let loopTimer         = null;
let inferBusy         = false; // worker meşgulken tekrar gönderme

// --- Worker'a inference gönder, Promise döner ---
function workerInfer(imageBitmap, width, height) {
  return new Promise((resolve, reject) => {
    const onMsg = (e) => {
      if (e.data.type === 'result') {
        worker.removeEventListener('message', onMsg);
        resolve(e.data.detections);
      } else if (e.data.type === 'error') {
        worker.removeEventListener('message', onMsg);
        reject(new Error(e.data.message));
      }
    };
    worker.addEventListener('message', onMsg);
    worker.postMessage(
      { type: 'infer', payload: { bitmap: imageBitmap, width, height } },
      [imageBitmap] // zero-copy transfer
    );
  });
}

// UI loop — sadece çizim, rAF ile 60fps
function startUILoop() {
  function uiLoop() {
    if (!previewRunning) return;
    clearCanvas(canvas);
    drawRoi(canvas, lastHadDetections);
    requestAnimationFrame(uiLoop);
  }
  requestAnimationFrame(uiLoop);
}

// Inference loop — worker üzerinden, düşük FPS
function startInferenceLoop() {
  async function inferLoop() {
    if (!previewRunning) return;

    if (!inferBusy && video.readyState >= video.HAVE_ENOUGH_DATA) {
      inferBusy = true;
      try {
        const { cropped } = cropRoi(video);
        const bitmap = await createImageBitmap(cropped);
        const detections = await workerInfer(bitmap, cropped.width, cropped.height);
        lastHadDetections = detections.length > 0;
      } catch {
        lastHadDetections = false;
      } finally {
        inferBusy = false;
      }
    }

    loopTimer = setTimeout(inferLoop, isLowEnd ? 200 : 100);
  }
  loopTimer = setTimeout(inferLoop, 0);
}

function startPreviewLoop() {
  previewRunning = true;
  startUILoop();
  startInferenceLoop();
}

function stopPreviewLoop() {
  previewRunning = false;
  if (loopTimer !== null) {
    clearTimeout(loopTimer);
    loopTimer = null;
  }
}

// --- CAPTURE ---
btnCapture.addEventListener('click', () => {
  stopPreviewLoop();

  // Direkt ROI'yi kes — tam çözünürlüğe gerek yok
  const { cropped, roi } = cropRoi(video);

  capturedCanvas = document.createElement('canvas');
  capturedCanvas.width  = roi.w;
  capturedCanvas.height = roi.h;
  capturedCanvas.getContext('2d').drawImage(cropped, 0, 0); // ✅ `captured` değil `capturedCanvas`

  snapshot.style.display = 'block';
  video.style.display    = 'none';

  // snapshot.src async yüklenir — naturalWidth/Height onload'dan sonra hazır olur.
  // onload beklemeden syncCanvasSize çağrılırsa boyutlar 0 gelir ve canvas bozulur.
  snapshot.onload = () => {
    syncCanvasSize(canvas, snapshot);
    clearCanvas(canvas);
    drawRoi(canvas, false);
    snapshot.onload = null; // tek seferlik
  };
  snapshot.src = capturedCanvas.toDataURL('image/jpeg');

  btnCapture.classList.add('hidden');
  btnMatch.classList.remove('hidden');
  btnRetake.classList.remove('hidden');

  resultLabel.textContent   = '';
  detectedIdsEl.textContent = 'Eşleştirmek için butona bas';
  bottomBar.className       = '';
  statusText.textContent    = 'Fotoğraf hazır';
});

// --- MATCH ---
btnMatch.addEventListener('click', async () => {
  if (!capturedCanvas) return;

  btnMatch.disabled      = true;
  btnMatch.textContent   = '⏳ Analiz ediliyor…';
  statusText.textContent = 'Analiz ediliyor…';

  try {
    syncCanvasSize(canvas, snapshot);

    // apturedCanvas zaten ROI — tekrar cropRoi'ye gerek yok
    const cropped = capturedCanvas;
    const roi     = { x: 0, y: 0, w: capturedCanvas.width, h: capturedCanvas.height };

    //  Worker üzerinden inference — UI donmuyor
    const bitmap     = await createImageBitmap(cropped);
    const detections = await workerInfer(bitmap, cropped.width, cropped.height);

    detections.sort((a, b) => (a.x + a.width / 2) - (b.x + b.width / 2));

    const hasDetections = detections.length > 0;

    clearCanvas(canvas);
    drawRoi(canvas, hasDetections);
    drawDetections(canvas, snapshot, detections, { x: 0, y: 0 });

    const classIds = detections.map(d => d.classId);
    const { state } = validateCombination(classIds, detections, roi.w);

    bottomBar.className     = state === 'ok' ? 'ok' : state === 'nok' ? 'nok' : '';
    resultLabel.textContent = state === 'ok' ? 'OK' : state === 'nok' ? 'NOK' : '—';

    if (classIds.length > 0) {
      const sorted = sortDetections(detections, roi.w);
      const left   = sorted.filter(d => d.colIndex === 0).map(d => getClassName(d.classId));
      const right  = sorted.filter(d => d.colIndex === 1).map(d => getClassName(d.classId));
      const rows   = Math.max(left.length, right.length);

      // Sadece innerHTML kullan — sonra textContent ile ezme
      let html = `
        <table style="width:100%; border-collapse:collapse; text-align:center;">
          <thead>
            <tr>
              <th style="padding:4px 8px; border-bottom:1px solid #444;">SOL</th>
              <th style="padding:4px 8px; border-bottom:1px solid #444;">SAĞ</th>
            </tr>
          </thead>
          <tbody>
      `;
      for (let i = 0; i < rows; i++) {
        html += `
          <tr>
            <td style="padding:3px 8px;">${left[i]  ?? '—'}</td>
            <td style="padding:3px 8px;">${right[i] ?? '—'}</td>
          </tr>
        `;
      }
      html += `</tbody></table>`;
      detectedIdsEl.innerHTML = html;
    } else {
      detectedIdsEl.textContent = 'Nesne bulunamadı';
    }

    statusText.textContent = state === 'ok' ? 'Eşleşme bulundu ✓' : 'Eşleşme yok';

  } catch (err) {
    statusText.textContent = 'Hata: ' + err.message;
    console.error(err);
  }

  btnMatch.disabled    = false;
  btnMatch.textContent = '🔍 Görüntü Eşleştir';
});

// --- RETAKE ---
btnRetake.addEventListener('click', () => {
  snapshot.style.display = 'none';
  video.style.display    = 'block';
  capturedCanvas         = null;
  lastHadDetections      = false;

  syncCanvasSize(canvas, video);

  btnCapture.classList.remove('hidden');
  btnMatch.classList.add('hidden');
  btnRetake.classList.add('hidden');

  resultLabel.textContent   = '';
  detectedIdsEl.textContent = '';
  bottomBar.className       = '';
  statusText.textContent    = 'Kamera aktif';

  startPreviewLoop();
});

// --- MODEL CACHE ---
async function fetchWithCache(url) {
  try {
    const cache     = await caches.open(CACHE_NAME);
    const CACHE_KEY = 'best_fuseboxV1.onnx';
    const cached    = await cache.match(CACHE_KEY);
    if (cached) {
      console.log('[Model] Cache\'den yüklendi');
      return cached;
    }
    console.log('[Model] İndiriliyor...');
    const response = await fetch(url);
    if (response.ok) {
      cache.put(CACHE_KEY, response.clone());
      console.log('[Model] Cache\'e kaydedildi');
    }
    return response;
  } catch (e) {
    console.warn('[Model] Cache hatası:', e.message);
    return fetch(url);
  }
}

// --- INIT ---
const ORT_FILES = [
  'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/ort.wasm.min.js',
  'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/ort-wasm-simd-threaded.wasm',
];

async function init() {
  try {
    loadingMsg.textContent = 'Kombinasyonlar yükleniyor…';
    const validUrl = import.meta.env.BASE_URL + 'valid.json';
    await loadValidCombinations(validUrl);

    loadingMsg.textContent = 'Kamera başlatılıyor…';
    await startCamera(video);
    syncCanvasSize(canvas, video);

    // ✅ ORT dosyalarını cache'e al
    loadingMsg.textContent = 'ORT yükleniyor…';
    await Promise.all(ORT_FILES.map(async url => {
      const cache = await caches.open(CACHE_NAME);
      if (!await cache.match(url)) {
        const res = await fetch(url);
        if (res.ok) cache.put(url, res.clone());
        console.log('[Cache] ORT dosyası kaydedildi:', url);
      }
    })); // ✅ Promise.all burada kapanıyor

    loadingMsg.textContent = 'Model yükleniyor…';
    const modelResponse = await fetchWithCache('https://aoi-fusebox1.neslihan-krdnz53.workers.dev/best_fuseboxV1.onnx');
    const modelBuffer   = await modelResponse.arrayBuffer();

    worker = new Worker(new URL('./yolo.worker.js', import.meta.url), { type: 'module' });
    worker.postMessage(
      { type: 'load', payload: { modelBuffer: modelBuffer.slice(0) } }
    );

    await new Promise((resolve, reject) => {
      worker.addEventListener('message', (e) => {
        if (e.data.type === 'loaded') resolve();
        if (e.data.type === 'error')  reject(new Error(e.data.message));
      }, { once: true });
    });

    loadingOverlay.classList.add('hidden');
    statusText.textContent = 'Hazır';
    startPreviewLoop();

  } catch (err) {
    loadingMsg.textContent = `Hata: ${err.message}`;
    statusText.textContent = 'Hata';
    console.error(err);
  }
}
init();