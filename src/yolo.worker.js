// yolo.worker.js
import { loadModel, runInference, preprocessRoi, postprocess } from './yolo.js';

const ORT_BASE = 'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/';

async function loadOrt() {
  const res  = await fetch(ORT_BASE + 'ort.wasm.min.js');
  const code = await res.text();

  const script = code + '\nself.ort = ort;';
  (0, eval)(script);

  console.log('[Worker] self.ort:', typeof self.ort);
  console.log('[Worker] InferenceSession:', typeof self.ort?.InferenceSession);

  if (!self.ort) throw new Error('ORT yüklenemedi');

  self.ort.env.wasm.wasmPaths = ORT_BASE;
  self.ort.env.wasm.numThreads = 1;
  self.ort.env.wasm.proxy = false;
}

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === 'load') {
    try {
      await loadOrt();

      // Ana sayfa  URL gönderiyor
      const CACHE_NAME = 'fusebox-v3';
      const CACHE_KEY  = 'best_fuseboxV1.onnx';
      const modelUrl   = payload.modelUrl;

      let modelBuffer;

      // 1. Cache'e bak
      try {
        const cache  = await caches.open(CACHE_NAME);
        const cached = await cache.match(CACHE_KEY);
        if (cached) {
          console.log('[Worker] Model cache\'den yükleniyor…');
          self.postMessage({ type: 'progress', message: 'Model cache\'den yükleniyor…' });
          modelBuffer = await cached.arrayBuffer();
        }
      } catch { /* cache API yoksa atla */ }

      // 2. Cache'de yoksa indir
      if (!modelBuffer) {
        console.log('[Worker] Model indiriliyor…');
        self.postMessage({ type: 'progress', message: 'Model indiriliyor… (ilk açılış, bekleyin)' });

        const response = await fetch(modelUrl);
        if (!response.ok) throw new Error(`Model indirilemedi: HTTP ${response.status}`);

        // Cache'e kaydet 
        try {
          const cache = await caches.open(CACHE_NAME);
          cache.put(CACHE_KEY, response.clone());
          console.log('[Worker] Model cache\'e kaydedildi');
        } catch { /* cache yazma basarisiz*/ }

        modelBuffer = await response.arrayBuffer();
      }

      self.postMessage({ type: 'progress', message: 'Model başlatılıyor…' });
      await loadModel(modelBuffer);
      self.postMessage({ type: 'loaded' });

    } catch (err) {
      console.error('[Worker] Model/ORT yükleme hatası:', err.message);
      self.postMessage({ type: 'error', message: err.message });
    }
  }

  if (type === 'infer') {
    try {
      const offscreen = new OffscreenCanvas(payload.width, payload.height);
      offscreen.getContext('2d').drawImage(payload.bitmap, 0, 0);
      payload.bitmap.close();

      const roi = payload.roi ?? { x: 0, y: 0, w: payload.width, h: payload.height };
      const meta         = preprocessRoi(offscreen, roi);
      const outputTensor = await runInference(meta.tensor);
      const detections   = postprocess(outputTensor, meta);

      self.postMessage({ type: 'result', detections });
    } catch (err) {
      self.postMessage({ type: 'error', message: err.message });
    }
  }
};