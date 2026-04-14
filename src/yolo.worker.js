// yolo.worker.js
import { loadModel, runInference, preprocessCanvas, postprocess } from './yolo.js';

const ORT_BASE = 'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/';

async function loadOrt() {
  const res  = await fetch(ORT_BASE + 'ort.wasm.min.js');
  const code = await res.text();
  (0, eval)(code);

  
  console.log('[Worker] self.ort:', typeof self.ort);
  console.log('[Worker] self.onnx:', typeof self.onnx);
  console.log('[Worker] self.ort_wasm:', typeof self.ort_wasm);
  
  const possible = ['ort', 'onnx', 'OnnxRuntime', 'ort_wasm'];
  for (const key of possible) {
    if (self[key]) {
      console.log('[Worker] Bulundu! Global key:', key, typeof self[key]);
    }
  }
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