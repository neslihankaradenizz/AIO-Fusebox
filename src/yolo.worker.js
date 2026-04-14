// yolo.worker.js
import { loadModel, runInference, preprocessCanvas, postprocess } from './yolo.js';

const ORT_BASE = 'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/';

async function loadOrt() {
  const ortModule = await import(ORT_BASE + 'ort-wasm-simd-threaded.mjs');
  
  // Emscripten factory'ye locateFile ile WASM path'ini söyle
  const ort = await ortModule.default({
    locateFile: (filename) => {
      console.log('[Worker] locateFile:', filename);
      return ORT_BASE + filename;
    }
  });

  console.log('[Worker] ort type:', typeof ort);
  console.log('[Worker] ort keys:', Object.keys(ort ?? {}));

  if (!ort) throw new Error('ORT factory undefined döndü');

  self.ort = ort;

  // env sadece gerçek ORT objesinde olur
  if (self.ort.env) {
    self.ort.env.wasm.wasmPaths = ORT_BASE;
    self.ort.env.wasm.numThreads = 1;
    self.ort.env.wasm.proxy = false;
  }

  console.log('[Worker] ORT hazır, InferenceSession:', typeof self.ort.InferenceSession);
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