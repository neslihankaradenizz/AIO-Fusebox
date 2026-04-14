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

  // snapshot async yüklenir — onload beklenmezse naturalWidth=0 gelir
  snapshot.onload = () => {
    syncCanvasSize(canvas, snapshot);
    clearCanvas(canvas);
    drawRoi(canvas, false);
    snapshot.onload = null;
  };
  snapshot.src           = capturedCanvas.toDataURL('image/jpeg');
  snapshot.style.display = 'block';
  video.style.display    = 'none';


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
    // capturedCanvas boyutunu doğrudan kullan — snapshot async yüklenmeyi beklemez
    syncCanvasSize(canvas, capturedCanvas);

    const cropped = capturedCanvas;
    const roi     = { x: 0, y: 0, w: capturedCanvas.width, h: capturedCanvas.height };

    // Her seferinde taze bitmap — önceki workerInfer'a transfer edilmiş olabilir
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

      // Sol kolon: colIndex===0, üstten alta sıralı → F1..F9
      const leftDets  = sorted.filter(d => d.colIndex === 0);
      // Sağ kolon: colIndex===1, üstten alta sıralı → F10..F17, TEST
      const rightDets = sorted.filter(d => d.colIndex === 1);

      const LEFT_LABELS  = ['F1','F2','F3','F4','F5','F6','F7','F8','F9'];
      const RIGHT_LABELS = ['F10','F11','F12','F13','F14','F15','F16','F17','TEST'];

      const rows = Math.max(LEFT_LABELS.length, RIGHT_LABELS.length); // 9

      detectedIdsEl.style.cssText = [
        'position:fixed',
        'left:0','right:0',
        'bottom:calc(var(--bar-h,80px) + 4px)',
        'max-height:45vh',
        'overflow-y:auto',
        'background:rgba(10,10,10,0.93)',
        'color:#fff',
        'z-index:30',
        'padding:4px 6px 6px',
        'border-radius:12px 12px 0 0',
        'font-size:13px',
      ].join(';');

      const ampColor = (val) => {
        if (!val || val === '—') return '#666';
        if (val.includes('empty'))  return '#555';
        if (val.includes('2'))      return '#a78bfa';
        if (val.includes('3'))      return '#c084fc';
        if (val.includes('5'))      return '#fb923c';
        if (val.includes('7.5'))    return '#f87171';
        if (val.includes('10'))     return '#f87171';
        if (val.includes('15'))     return '#60a5fa';
        if (val.includes('20'))     return '#facc15';
        if (val.includes('25'))     return '#4ade80';
        if (val.includes('30'))     return '#34d399';
        if (val.includes('52'))     return '#f472b6';
        return '#e2e8f0';
      };

      const thStyle  = 'padding:5px 6px; border-bottom:2px solid #444; color:#aaa; font-size:11px; text-align:center;';
      const lblStyle = 'padding:4px 5px; border-bottom:1px solid #222; color:#777; font-weight:700; font-size:12px; width:38px; text-align:right;';
      const valStyle = 'padding:4px 8px; border-bottom:1px solid #222; font-weight:600; text-align:left;';
      const sepStyle = 'width:10px; border-bottom:1px solid #111;';

      let html = `
        <table style="width:100%; border-collapse:collapse; table-layout:fixed;">
          <colgroup>
            <col style="width:38px"><col>
            <col style="width:10px">
            <col style="width:38px"><col>
          </colgroup>
          <thead><tr>
            <th colspan="2" style="${thStyle}">◀ SOL (J2)</th>
            <th style="border-bottom:2px solid #444;"></th>
            <th colspan="2" style="${thStyle}">SAĞ (J3) ▶</th>
          </tr></thead>
          <tbody>
      `;

      for (let i = 0; i < rows; i++) {
        const lLabel = LEFT_LABELS[i]  ?? '';
        const rLabel = RIGHT_LABELS[i] ?? '';
        const lVal   = leftDets[i]  ? getClassName(leftDets[i].classId)  : (lLabel ? '—' : '');
        const rVal   = rightDets[i] ? getClassName(rightDets[i].classId) : (rLabel ? '—' : '');
        html += `<tr>
          <td style="${lblStyle}">${lLabel}</td>
          <td style="${valStyle} color:${ampColor(lVal)};">${lVal}</td>
          <td style="${sepStyle}"></td>
          <td style="${lblStyle}">${rLabel}</td>
          <td style="${valStyle} color:${ampColor(rVal)};">${rVal}</td>
        </tr>`;
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

    // ORT dosyalarını cache'e al
    loadingMsg.textContent = 'ORT yükleniyor…';
    await Promise.all(ORT_FILES.map(async url => {
      const cache = await caches.open(CACHE_NAME);
      if (!await cache.match(url)) {
        const res = await fetch(url);
        if (res.ok) cache.put(url, res.clone());
        console.log('[Cache] ORT dosyası kaydedildi:', url);
      }
    })); // Promise.all burada kapanıyor

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