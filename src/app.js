import { startCamera }                          from './camera.js';
import { loadModel, runInference, postprocess, preprocessCanvas } from './yolo.js';
import { loadValidCombinations, validateCombination, sortDetections }    from './combination.js';
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

// FPS ADAPTASYONU 
const isLowEnd = (navigator.hardwareConcurrency ?? 4) <= 4 ||
                 (navigator.deviceMemory        ?? 4) <= 2;
//const INFERENCE_INTERVAL = isLowEnd ? 1000 / 2 : 1000 / 4;
console.log(`[Perf] ${isLowEnd ? 'Düşük uçlu' : 'Yüksek uçlu'} cihaz — ${isLowEnd ? 4 : 8} FPS`);

function onResize() {
  const source = video.style.display !== 'none' ? video : snapshot;
  syncCanvasSize(canvas, source);
}
window.addEventListener('resize', onResize);

let lastHadDetections = false;
let loopTimer         = null

// UI loop — sadece cizim, 30fps
async function startUILoop() {
  function uiLoop() {
    if (!previewRunning) return;
    clearCanvas(canvas);
    drawRoi(canvas, lastHadDetections);
    requestAnimationFrame(uiLoop); // setTimeout yerine rAF
  }
  requestAnimationFrame(uiLoop);
}

// Inference loop — ayrı dusuk FPS
async function startInferenceLoop() {
  async function inferLoop() {
    if (!previewRunning) return;
    try {
      if (video.readyState >= video.HAVE_ENOUGH_DATA) {
        const { cropped } = cropRoi(video);
        const meta         = preprocessCanvas(cropped);
        const outputTensor = await runInference(meta.tensor);
        const detections   = postprocess(outputTensor, cropped.width, cropped.height, meta);
        lastHadDetections  = detections.length > 0;
      }
    } catch {
      lastHadDetections = false;
    }
    loopTimer = setTimeout(inferLoop, isLowEnd ? 200 : 100);
  }
  loopTimer = setTimeout(inferLoop, 0);
}

async function startPreviewLoop() {
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

// Butonlar
btnCapture.addEventListener('click', () => {
  stopPreviewLoop();

  // Tam frame'e gerek yok — direkt ROI canvas'ı al
  const { cropped, roi } = cropRoi(video);

  // Sadece ROI'yi sakla
  capturedCanvas = document.createElement('canvas');
  capturedCanvas.width  = roi.w;
  capturedCanvas.height = roi.h;
  capturedCanvas.getContext('2d').drawImage(cropped, 0, 0);

  snapshot.src = captured.toDataURL('image/jpeg');
  snapshot.style.display = 'block';
  video.style.display    = 'none';

  syncCanvasSize(canvas, snapshot);
  clearCanvas(canvas);
  drawRoi(canvas, false);

  btnCapture.classList.add('hidden');
  btnMatch.classList.remove('hidden');
  btnRetake.classList.remove('hidden');

  resultLabel.textContent   = '';
  detectedIdsEl.textContent = 'Eşleştirmek için butona bas';
  bottomBar.className       = '';
  statusText.textContent    = 'Fotoğraf hazır';
});

btnMatch.addEventListener('click', async () => {
  if (!capturedCanvas) return;

  btnMatch.disabled       = true;
  btnMatch.textContent    = '⏳ Analiz ediliyor…';
  statusText.textContent  = 'Analiz ediliyor…';

  try {
    syncCanvasSize(canvas, snapshot);

    //const { cropped, roi } = cropRoi(capturedCanvas);
    const cropped = capturedCanvas;
    const roi = { x: 0, y: 0, w: capturedCanvas.width, h: capturedCanvas.height };

    const meta         = preprocessCanvas(cropped);
    const outputTensor = await runInference(meta.tensor);
    const detections   = postprocess(outputTensor, cropped.width, cropped.height, meta);

    detections.sort((a, b) => (a.x + a.width/2) - (b.x + b.width/2));

    const hasDetections = detections.length > 0;

    clearCanvas(canvas);
    drawRoi(canvas, hasDetections);
    drawDetections(canvas, snapshot, detections, {
      x: roi.x / (capturedCanvas.width  / canvas.width),
      y: roi.y / (capturedCanvas.height / canvas.height),
    });

    const classIds = detections.map(d => d.classId);
    const { state, score, comboId } = validateCombination(classIds, detections, roi.w)

    bottomBar.className       = state === 'ok' ? 'ok' : state === 'nok' ? 'nok' : '';
    resultLabel.textContent   = state === 'ok' ? 'OK' : state === 'nok' ? 'NOK' : '—';
  
    if (classIds.length > 0) {
        const sorted = sortDetections(detections, roi.w); 
        const left  = sorted.filter(d => d.colIndex === 0).map(d => getClassName(d.classId));
        const right = sorted.filter(d => d.colIndex === 1).map(d => getClassName(d.classId));
        const rows  = Math.max(left.length, right.length);

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
          const l = left[i]  ?? '—';
          const r = right[i] ?? '—';
          html += `
              <tr>
                <td style="padding:3px 8px;">${l}</td>
                <td style="padding:3px 8px;">${r}</td>
              </tr>
          `;
        }

        html += `</tbody></table>`;
        detectedIdsEl.innerHTML = html;

        
        let matrix  = 'L | R\n';
        matrix += '--------\n';
        for (let i = 0; i < rows; i++) {
          const l = left[i]  !== undefined ? String(left[i]).padStart(2)  : ' —';
          const r = right[i] !== undefined ? String(right[i]).padStart(2) : ' —';
          matrix += `${l}  |  ${r}\n`;
        }
        detectedIdsEl.textContent = matrix;
      } else {
        detectedIdsEl.textContent = 'Nesne bulunamadı';
      }
    statusText.textContent    = state === 'ok' ? 'Eşleşme bulundu ✓' : 'Eşleşme yok';

  } catch (err) {
    statusText.textContent = 'Hata: ' + err.message;
    console.error(err);
  }

  btnMatch.disabled    = false;
  btnMatch.textContent = '🔍 Görüntü Eşleştir';
});

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

//MODEL CACHE 
async function fetchWithCache(url) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const CACHE_KEY = 'best_fuseboxV1.onnx';
    const cached = await cache.match(CACHE_KEY);
    if (cached) {
      console.log('[Model] Cache\'den yüklendi');
      return cached;
    }

    console.log('[Model] İndiriliyor...');
    const response = await fetch(url);
    console.log('[Model] İndirme tamamlandi — status:', response.status, '| url:', response.url);
    
    if (response.ok) {
      cache.put(CACHE_KEY, response.clone());
      console.log('[Model] Cache\'e kaydedildi', CACHE_KEY);
    }
    return response;
  } catch (e) {
    console.warn('[Model] Cache Hata:', e.message);
    console.log('[Model]  Direkt fetch deneniyor:', url);
    return fetch(url, {});
  }
}

async function init() {
  try {
    loadingMsg.textContent = 'Kombinasyonlar yükleniyor…';
    const validUrl = import.meta.env.BASE_URL + 'valid.json';
    console.log('[Debug] valid.json URL:', validUrl);
    await loadValidCombinations(validUrl);

    loadingMsg.textContent = 'Kamera başlatılıyor…';
    await startCamera(video);

    syncCanvasSize(canvas, video);

    loadingMsg.textContent = 'Model yükleniyor…';
    const modelResponse = await fetchWithCache('https://aoi-fusebox1.neslihan-krdnz53.workers.dev/best_fuseboxV1.onnx');
    const modelBuffer = await modelResponse.arrayBuffer();
    await loadModel(modelBuffer);

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