// yolo.worker.js
import { loadModel, runInference, preprocessCanvas, postprocess } from './yolo.js';

const ORT_BASE = 'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/';

async function loadOrt() {
  const ortModule = await import(ORT_BASE + 'ort-wasm-simd-threaded.mjs');
  
  console.log('[Worker] ortModule keys:', Object.keys(ortModule));
  console.log('[Worker] ortModule.default:', typeof ortModule.default);
  console.log('[Worker] ortModule.ort:', typeof ortModule.ort);
  console.log('[Worker] ortModule.InferenceSession:', typeof ortModule.InferenceSession);

  // InferenceSession direkt export ediliyorsa, ort objesi olarak paketle
  if (ortModule.InferenceSession) {
    self.ort = ortModule;
  } else if (ortModule.default?.InferenceSession) {
    self.ort = ortModule.default;
  } else {
    throw new Error('ORT export yapısı tanınamadı: ' + Object.keys(ortModule).join(', '));
  }

  self.ort.env.wasm.wasmPaths = ORT_BASE;
  self.ort.env.wasm.numThreads = 1;
  self.ort.env.wasm.proxy = false;

  console.log('[Worker] ORT yüklendi, InferenceSession:', !!self.ort.InferenceSession);
}

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === 'load') {
    try {
      await loadOrt();
      await loadModel(payload.modelBuffer);
      self.postMessage({ type: 'loaded' });
    } catch (err) {
      self.postMessage({ type: 'error', message: err.message });
    }
  }

  if (type === 'infer') {
    try {
      const offscreen = new OffscreenCanvas(payload.width, payload.height);
      offscreen.getContext('2d').drawImage(payload.bitmap, 0, 0);
      payload.bitmap.close();

      const meta         = preprocessCanvas(offscreen);
      const outputTensor = await runInference(meta.tensor);
      const detections   = postprocess(outputTensor, payload.width, payload.height, meta);

      self.postMessage({ type: 'result', detections });
    } catch (err) {
      self.postMessage({ type: 'error', message: err.message });
    }
  }
};