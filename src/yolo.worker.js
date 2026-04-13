// yolo.worker.js
import { loadModel, runInference, preprocessCanvas, postprocess } from './yolo.js';

// yolo.worker.js
async function loadOrt(ortUrl) {
  // fetch + eval yerine importScripts kullan — SW'yi bypass eder
  importScripts(ortUrl);  // ✅ CORS sorununu aşar, SW yakalamaz
}

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === 'load') {
    try {
      await loadOrt('https://aoi-fusebox1.neslihan-krdnz53.workers.dev/ort.wasm.min.js');
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