const INPUT_SIZE  = 640;
const CONF_THRESH = 0.5;
const IOU_THRESH  = 0.45;

let session = null;

export async function loadModel(modelUrl = '/model.onnx') {
  const ort = window.ort;  // CDN'den geliyor

  ort.env.wasm.numThreads = 1;
  ort.env.wasm.proxy = false;
  ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/';

  session = await ort.InferenceSession.create(modelUrl, {
    executionProviders: ['wasm'],
  });

  return session;
}

export async function runInference(tensor) {
  if (!session) throw new Error('Model not loaded. Call loadModel() first.');
  const inputName = session.inputNames[0];
  const feeds = { [inputName]: tensor };
  const results = await session.run(feeds);
  return results[session.outputNames[0]];
}

// Preprocessing

/**
 * HTMLVideo → Float32 Tensor [1,3,640,640]
 * 
 * @param {HTMLVideoElement} videoEl
 * @returns {{ tensor: window.ort.Tensor, scaleX: number, scaleY: number }}
 */
export function preprocess(videoEl) {
  const offscreen = document.createElement('canvas');
  offscreen.width  = INPUT_SIZE;
  offscreen.height = INPUT_SIZE;
  const ctx = offscreen.getContext('2d');

  // Letterbox: aspect ratio bozulmadan resize
  const vw = videoEl.videoWidth;
  const vh = videoEl.videoHeight;
  const scale = Math.min(INPUT_SIZE / vw, INPUT_SIZE / vh);
  const dw = Math.round(vw * scale);
  const dh = Math.round(vh * scale);
  const dx = (INPUT_SIZE - dw) / 2;
  const dy = (INPUT_SIZE - dh) / 2;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, INPUT_SIZE, INPUT_SIZE);
  ctx.drawImage(videoEl, dx, dy, dw, dh);

  const imageData = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
  const { data } = imageData;                        // RGBA, length = 640*640*4

  const nPixels  = INPUT_SIZE * INPUT_SIZE;
  const float32  = new Float32Array(3 * nPixels);   // CHW

  //[batch, channels, height, width]
  for (let i = 0; i < nPixels; i++) {
    float32[i]                = data[i * 4]     / 255; // R
    float32[i + nPixels]      = data[i * 4 + 1] / 255; // G
    float32[i + nPixels * 2]  = data[i * 4 + 2] / 255; // B
  }

  const tensor = new window.ort.Tensor('float32', float32, [1, 3, INPUT_SIZE, INPUT_SIZE]);
  return { tensor, scaleX: vw / dw, scaleY: vh / dh, offsetX: dx, offsetY: dy, scale };
}

// Postprocessing + NMS

/**
 * postprocess – YOLO çıktısını parse etme
 *
 * YOLOv8 export format (no sigmoid in output):
 *   shape  [1, 4+numClasses, numAnchors]   (transposed from training)
 *
 * @param {window.ort.Tensor}  outputTensor
 * @param {number}      srcWidth    original video width
 * @param {number}      srcHeight   original video height
 * @param {object}      meta        { scaleX, scaleY, offsetX, offsetY, scale }
 * @returns {Array<{classId:number, x:number, y:number, width:number, height:number, confidence:number}>}
 */

export function postprocess(outputTensor, srcWidth, srcHeight, meta) {
  const data  = outputTensor.data;          // Float32Array
  const dims  = outputTensor.dims;          // [1, rows, cols] or [1, cols, rows]

  // Determine shape: YOLOv8 outputs [1, 4+nc, 8400] — rows = 4+nc, cols = anchors
  let rows, cols;
  if (dims[1] < dims[2]) {
    rows = dims[1]; cols = dims[2];          // standard YOLOv8 format
  } else {
    rows = dims[2]; cols = dims[1];          // transposed — rare
  }

  const numClasses = rows - 4;
  const detections = [];

  const { scale, offsetX, offsetY } = meta;

  for (let a = 0; a < cols; a++) {
    // Find best class
    let maxScore = -Infinity;
    let classId  = -1;
    for (let c = 0; c < numClasses; c++) {
      const score = data[( 4 + c) * cols + a];
      if (score > maxScore) { maxScore = score; classId = c; }
    }
    if (maxScore < CONF_THRESH) continue;

    // cx, cy, w, h are in 640×640 space
    const cx = data[0 * cols + a];
    const cy = data[1 * cols + a];
    const bw = data[2 * cols + a];
    const bh = data[3 * cols + a];

    // Map back to original video coordinates (undo letterbox + scale)
    const x = ((cx - offsetX) / scale) - bw / scale / 2;
    const y = ((cy - offsetY) / scale) - bh / scale / 2;
    const w = bw / scale;
    const h = bh / scale;

    detections.push({ classId, x, y, width: w, height: h, confidence: maxScore });
  }

  return nms(detections, IOU_THRESH);
}

// NMS

function iou(a, b) {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.width,  b.x + b.width);
  const y2 = Math.min(a.y + a.height, b.y + b.height);
  const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const aArea = a.width * a.height;
  const bArea = b.width * b.height;
  return inter / (aArea + bArea - inter + 1e-6);
}

function nms(detections, iouThresh) {
  detections.sort((a, b) => b.confidence - a.confidence);
  const kept = [];
  const suppressed = new Uint8Array(detections.length);

  for (let i = 0; i < detections.length; i++) {
    if (suppressed[i]) continue;
    kept.push(detections[i]);
    for (let j = i + 1; j < detections.length; j++) {
      if (suppressed[j]) continue;
      if (iou(detections[i], detections[j]) > iouThresh) suppressed[j] = 1;
    }
  }
  return kept;
}
