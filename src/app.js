import { startCamera }            from './camera.js';
import { loadModel, runInference, postprocess } from './yolo.js';
import { syncCanvasSize, clearCanvas, drawRoi, drawDetections, getRoi } from './overlay.js';
import { loadValidCombinations, validateCombination, sortDetections } from './combination.js';

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

// canvas olusturma
const offscreenFull  = document.createElement('canvas');
const offscreenCrop  = document.createElement('canvas');
const offscreenModel = document.createElement('canvas');

// FPS ADAPTASYONU 
const isLowEnd = (navigator.hardwareConcurrency ?? 4) <= 4 ||
                 (navigator.deviceMemory        ?? 4) <= 2;
const INFERENCE_INTERVAL = isLowEnd ? 1000 / 4 : 1000 / 8;
console.log(`[Perf] ${isLowEnd ? 'Düşük uçlu' : 'Yüksek uçlu'} cihaz — ${isLowEnd ? 4 : 8} FPS`);

function onResize() {
  const source = video.style.display !== 'none' ? video : snapshot;
  syncCanvasSize(canvas, source);
}
window.addEventListener('resize', onResize);

let lastHadDetections = false;
let loopTimer         = null

// Canlı ROI önizleme
async function startPreviewLoop() {
  previewRunning = true;

  async function loop() {
    if (!previewRunning) return;

    clearCanvas(canvas);
    drawRoi(canvas, lastHadDetections);

    //const now = performance.now();
    //if (now - lastInferenceTime >= INFERENCE_INTERVAL) {
      //lastInferenceTime = now;

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
      loopTimer = setTimeout(loop, INFERENCE_INTERVAL);
    }

   loopTimer = setTimeout(loop, 0);
}
  
function stopPreviewLoop() {
  previewRunning = false;
  if (loopTimer !== null) {
    clearTimeout(loopTimer);
    loopTimer = null;
  }
}

// ROI crop —parametre srcCanvas → src, videpWidth → videoWidth
function cropRoi(src) {
  const isVideo = src instanceof HTMLVideoElement;
  const srcW    = isVideo ? src.videoWidth  : src.width;
  const srcH    = isVideo ? src.videoHeight : src.height;

  const roi = {
    x: Math.round(srcW * 0.1),
    y: Math.round(srcH * 0.2),
    w: Math.round(srcW * 0.8),
    h: Math.round(srcH * 0.6),
  };

  let srcCanvas;
  if (isVideo) {
    offscreenFull.width  = srcW;
    offscreenFull.height = srcH;
    offscreenFull.getContext('2d').drawImage(src, 0, 0);
    srcCanvas = offscreenFull;
  } else {
    srcCanvas = src;
  }

  // sadece roi alanini modele gonder
  offscreenCrop.width  = roi.w;
  offscreenCrop.height = roi.h;
  offscreenCrop.getContext('2d').drawImage(
    srcCanvas, roi.x, roi.y, roi.w, roi.h, 0, 0, roi.w, roi.h
  );

  return { cropped: offscreenCrop, roi };
}

// Preprocess — offscreen → offscreenModel
function preprocessCanvas(srcCanvas) {
  const INPUT_SIZE = 640;

  offscreenModel.width  = INPUT_SIZE;
  offscreenModel.height = INPUT_SIZE;
  const ctx = offscreenModel.getContext('2d');

  const vw = srcCanvas.width;
  const vh = srcCanvas.height;
  const scale = Math.min(INPUT_SIZE / vw, INPUT_SIZE / vh);
  const dw = Math.round(vw * scale);
  const dh = Math.round(vh * scale);
  const dx = (INPUT_SIZE - dw) / 2;
  const dy = (INPUT_SIZE - dh) / 2;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, INPUT_SIZE, INPUT_SIZE);
  ctx.drawImage(srcCanvas, dx, dy, dw, dh);

  const { data } = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
  const nPixels  = INPUT_SIZE * INPUT_SIZE;
  const float32  = new Float32Array(3 * nPixels);

  for (let i = 0; i < nPixels; i++) {
    float32[i]             = data[i * 4]     / 255;
    float32[i + nPixels]   = data[i * 4 + 1] / 255;
    float32[i + nPixels*2] = data[i * 4 + 2] / 255;
  }

  const tensor = new window.ort.Tensor('float32', float32, [1, 3, INPUT_SIZE, INPUT_SIZE]);
  return { tensor, scale, offsetX: dx, offsetY: dy, scaleX: vw/dw, scaleY: vh/dh };
}

// Butonlar
btnCapture.addEventListener('click', () => {
  stopPreviewLoop();

  const captured = document.createElement('canvas');
  captured.width  = video.videoWidth;
  captured.height = video.videoHeight;
  captured.getContext('2d').drawImage(video, 0, 0);
  capturedCanvas = captured;

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

    const { cropped, roi } = cropRoi(capturedCanvas);

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
    const state = validateCombination(classIds, detections);

    bottomBar.className       = state === 'ok' ? 'ok' : state === 'nok' ? 'nok' : '';
    resultLabel.textContent   = state === 'ok' ? 'OK' : state === 'nok' ? 'NOK' : '—';
    //detectedIdsEl.textContent = classIds.length > 0
    //  ? `IDs: [${classIds.join(', ')}]`
    //  : 'Nesne bulunamadı';
    if (classIds.length > 0) {
        const sorted = sortDetections(detections); 
        const left  = sorted.filter(d => d.colIndex === 0).map(d => d.classId);
        const right = sorted.filter(d => d.colIndex === 1).map(d => d.classId);
        const rows  = Math.max(left.length, right.length);
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
      console.log('[Cache] Cache\'den yüklendi');
      return cached;
    }

    console.log('[Cache] İndiriliyor...');
    const response = await fetch(url);
    if (response.ok) cache.put(CACHE_KEY, response.clone());
    return response;
  } catch (e) {
    console.warn('[Cache] Hata:', e.message);
    return fetch(url, {
      //headers: { 'ngrok-skip-browser-warning': 'true' }
    });
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
