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
const resultTable    = document.getElementById('result-table');
const resultTableBody = document.getElementById('result-table-body');

let capturedCanvas = null;
let previewRunning = false;
let worker         = null; // worker global — hem preview hem match kullanır

// --- DRAWER KURULUMU ---
// CSS enjeksiyonu
const drawerStyle = document.createElement('style');
drawerStyle.textContent = `
  #detected-ids {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    max-height: 72vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: rgba(8,8,12,0.97);
    color: #fff;
    z-index: 50;
    padding: 0 8px 24px;
    border-radius: 18px 18px 0 0;
    transform: translateY(100%);
    transition: transform 0.32s cubic-bezier(0.32,0.72,0,1);
    font-size: 13px;
    box-shadow: 0 -4px 32px rgba(0,0,0,0.6);
  }
  #detected-ids.drawer-open {
    transform: translateY(0);
  }
  #drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 49;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }
  #drawer-backdrop.visible {
    opacity: 1;
    pointer-events: auto;
  }
  .drawer-handle {
    width: 44px; height: 4px;
    background: #3f3f50;
    border-radius: 2px;
    margin: 12px auto 10px;
  }
  #btn-drawer {
    display: none;
    width: 100%;
    padding: 11px 14px;
    background: #0f172a;
    color: #94a3b8;
    border: 1px solid #1e293b;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 6px;
    letter-spacing: 0.02em;
    transition: background 0.2s, color 0.2s;
  }
  #btn-drawer.visible {
    display: block;
  }
  #btn-drawer:active {
    background: #1e293b;
    color: #e2e8f0;
  }
`;
document.head.appendChild(drawerStyle);

// Backdrop elementi
const backdrop = document.createElement('div');
backdrop.id = 'drawer-backdrop';
document.body.appendChild(backdrop);

// Drawer handle (detectedIdsEl içine ilk çocuk olarak eklenir)
const drawerHandle = document.createElement('div');
drawerHandle.className = 'drawer-handle';
detectedIdsEl.prepend(drawerHandle);

// TESPİT TABLOSU butonu — bottomBar'a eklenir
const btnDrawer = document.createElement('button');
btnDrawer.id = 'btn-drawer';
btnDrawer.textContent = '📋 TESPİT TABLOSU';
bottomBar.appendChild(btnDrawer);

// Drawer aç/kapat yardımcıları
function openDrawer() {
  detectedIdsEl.classList.add('drawer-open');
  backdrop.classList.add('visible');
  btnDrawer.textContent = '✕ KAPAT';
}
function closeDrawer() {
  detectedIdsEl.classList.remove('drawer-open');
  backdrop.classList.remove('visible');
  btnDrawer.textContent = '📋 TESPİT TABLOSU';
}

btnDrawer.addEventListener('click', () => {
  detectedIdsEl.classList.contains('drawer-open') ? closeDrawer() : openDrawer();
});
backdrop.addEventListener('click', closeDrawer);

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

  closeDrawer();
  btnDrawer.classList.remove('visible');
  detectedIdsEl.innerHTML   = '<div class="drawer-handle"></div>';
  resultLabel.textContent   = '';
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
      const sorted    = sortDetections(detections, roi.w);
      const leftDets  = sorted.filter(d => d.colIndex === 0);
      const rightDets = sorted.filter(d => d.colIndex === 1);

      const LEFT_LABELS  = ['F1','F2','F3','F4','F5','F6','F7','F8','F9'];
      const RIGHT_LABELS = ['F10','F11','F12','F13','F14','F15','F16','F17','TEST'];

      // Amp değerine göre CSS sınıfı
      const ampClass = (val) => {
        if (!val || val === '—')        return 'amp-none';
        if (val.includes('empty'))      return 'amp-empty';
        if (val.includes('52'))         return 'amp-52';
        if (val.includes('30'))         return 'amp-30';
        if (val.includes('25'))         return 'amp-25';
        if (val.includes('20'))         return 'amp-20';
        if (val.includes('15'))         return 'amp-15';
        if (val.includes('10'))         return 'amp-10';
        if (val.includes('7'))          return 'amp-7';
        if (val.includes('5'))          return 'amp-5';
        if (val.includes('3'))          return 'amp-3';
        if (val.includes('2'))          return 'amp-2';
        return '';
      };

      // Sadece tbody'yi doldur — yapı index.html'de
      let rows = '';
      for (let i = 0; i < 9; i++) {
        const lLabel = LEFT_LABELS[i]  ?? '';
        const rLabel = RIGHT_LABELS[i] ?? '';
        const lVal   = leftDets[i]  ? getClassName(leftDets[i].classId)  : '—';
        const rVal   = rightDets[i] ? getClassName(rightDets[i].classId) : '—';
        rows += `<tr>
          <td class="lbl">${lLabel}</td>
          <td class="val ${ampClass(lVal)}">${lVal}</td>
          <td class="sep"></td>
          <td class="lbl">${rLabel}</td>
          <td class="val ${ampClass(rVal)}">${rVal}</td>
        </tr>`;
      }
      resultTableBody.innerHTML = rows;
      resultTable.classList.add('visible');

      // Drawer butonunu göster — analiz tamamlandı
      btnDrawer.classList.add('visible');
    } else {
      resultTableBody.innerHTML = '';
      resultTable.classList.remove('visible');
      detectedIdsEl.innerHTML = '<div class="drawer-handle"></div><p style="padding:16px;color:#666;text-align:center;">Nesne bulunamadı</p>';
      btnDrawer.classList.add('visible');
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
  detectedIdsEl.innerHTML   = '<div class="drawer-handle"></div>';
  bottomBar.className       = '';
  statusText.textContent    = 'Kamera aktif';

  resultTable.classList.remove('visible');
  resultTableBody.innerHTML = '';
  closeDrawer();
  btnDrawer.classList.remove('visible');

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