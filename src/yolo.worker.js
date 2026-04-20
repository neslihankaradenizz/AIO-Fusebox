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
      await loadModel(payload.modelBuffer);
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

      const meta         = preprocessCanvas(offscreen);
      const outputTensor = await runInference(meta.tensor);
      const detections   = postprocess(outputTensor, payload.width, payload.height, meta);

      self.postMessage({ type: 'result', detections });
    } catch (err) {
      self.postMessage({ type: 'error', message: err.message });
    }
  }
};