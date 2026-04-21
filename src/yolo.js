const CONF_THRESH = 0.5;
const IOU_THRESH  = 0.45;

let session   = null;
let INPUT_SIZE = null;

// --- ONNX protobuf parser — closure-free, minifier-safe ---
function onnxVarint(bytes, idx) {
  let val = 0, shift = 0, byte;
  do {
    byte = bytes[idx[0]++];
    val |= (byte & 0x7f) << shift;
    shift += 7;
  } while (byte & 0x80);
  return val;
}

function onnxSkip(bytes, idx, wireType) {
  if      (wireType === 0) onnxVarint(bytes, idx);
  else if (wireType === 1) idx[0] += 8;
  else if (wireType === 2) idx[0] += onnxVarint(bytes, idx);
  else if (wireType === 5) idx[0] += 4;
}

function onnxFindField(bytes, idx, end, targetField) {
  while (idx[0] < end) {
    const tag      = onnxVarint(bytes, idx);
    const fieldNum = tag >>> 3;
    const wireType = tag & 7;
    if (wireType === 2) {
      const msgLen = onnxVarint(bytes, idx);
      const msgEnd = idx[0] + msgLen;
      if (fieldNum === targetField) return msgEnd;
      idx[0] = msgEnd;
    } else {
      onnxSkip(bytes, idx, wireType);
    }
  }
  return null;
}

function parseInputSizeFromBuffer(buffer) {
  try {
    const bytes = new Uint8Array(buffer);
    const idx   = [0]; // tek elemanlı dizi 

    const graphEnd = onnxFindField(bytes, idx, bytes.length, 7);  // ModelProto → graph
    if (graphEnd == null) return null;

    const viEnd = onnxFindField(bytes, idx, graphEnd, 11);         // GraphProto → input
    if (viEnd == null) return null;

    const tpEnd = onnxFindField(bytes, idx, viEnd, 2);             // ValueInfoProto → type
    if (tpEnd == null) return null;

    const ttEnd = onnxFindField(bytes, idx, tpEnd, 1);             // TypeProto → tensor_type
    if (ttEnd == null) return null;

    const shapeEnd = onnxFindField(bytes, idx, ttEnd, 2);          // Tensor → shape
    if (shapeEnd == null) return null;

    const dims = [];
    while (idx[0] < shapeEnd) {
      const tag      = onnxVarint(bytes, idx);
      const fieldNum = tag >>> 3;
      const wireType = tag & 7;

      if (fieldNum === 1 && wireType === 2) {
        const dimLen = onnxVarint(bytes, idx);
        const dimEnd = idx[0] + dimLen;
        let dimValue = null;

        while (idx[0] < dimEnd) {
          const dtag      = onnxVarint(bytes, idx);
          const dfieldNum = dtag >>> 3;
          const dwireType = dtag & 7;
          if (dfieldNum === 1 && dwireType === 0) {
            dimValue = onnxVarint(bytes, idx); // dim_value (statik)
          } else {
            onnxSkip(bytes, idx, dwireType);   // dim_param (dinamik) → atla
          }
        }
        dims.push(dimValue);
        idx[0] = dimEnd;
      } else {
        onnxSkip(bytes, idx, wireType);
      }
    }

    // dims = [batch, channels, H, W] → H
    const size = dims[2] ?? dims[3];
    return (size && size > 0) ? size : null;

  } catch (err) {
    console.warn('[YOLO] ONNX parse hatası:', err.message);
    return null;
  }
}

export function getInputSize() {
  if (!INPUT_SIZE) throw new Error('getInputSize: loadModel() henüz tamamlanmadı');
  return INPUT_SIZE;
}

async function getOrt() {
  const global = typeof self !== 'undefined' ? self : window;
  if (global.ort) return global.ort;
  return new Promise((resolve, reject) => {
    let count = 0;
    const check = setInterval(() => {
      count++;
      if (global.ort) { clearInterval(check); resolve(global.ort); }
      if (count > 100) { clearInterval(check); reject(new Error('ORT yüklenemedi.')); }
    }, 50);
  });
}

export async function loadModel(modelUrl = '/best_fuseboxV1.onnx') {
  const ort = await getOrt();

  ort.env.wasm.numThreads = 1;
  ort.env.wasm.proxy = false;
  ort.env.wasm.wasmPaths = 'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/';

  // 1. ONNX buffer'dan parse et
  if (modelUrl instanceof ArrayBuffer) {
    try {
      const size = parseInputSizeFromBuffer(modelUrl);
      if (size) {
        INPUT_SIZE = size;
        console.log('[YOLO] INPUT_SIZE ONNX buffer\'dan okundu:', INPUT_SIZE);
      }
    } catch (err) {
      console.warn('[YOLO] Buffer parse hatası:', err.message);
    }
  }

  session = await ort.InferenceSession.create(modelUrl, {
    executionProviders: ['wasm'],
    sessionOptions: {
      executionMode: 'sequential',
      interOpNumThreads: 1,
      intraOpNumThreads: 1,
    },
  });

  // 2. inputMetadata dene (ORT ≥1.14)
  if (!INPUT_SIZE) {
    try {
      const inputName = session.inputNames[0];
      const meta = session.inputMetadata?.[inputName] ?? session.inputInfo?.[inputName];
      if (meta?.dimensions) {
        INPUT_SIZE = Number(meta.dimensions[2]);
        console.log('[YOLO] INPUT_SIZE inputMetadata\'dan okundu:', INPUT_SIZE);
      }
    } catch { /* sessizce geç */ }
  }

  // 3. Fallback
  if (!INPUT_SIZE) {
    INPUT_SIZE = 1024;
    console.warn('[YOLO] INPUT_SIZE okunamadı, fallback:', INPUT_SIZE);
  }

  console.log('[YOLO] INPUT_SIZE:', INPUT_SIZE);
  return session;
}

export async function runInference(tensor) {
  if (!session) throw new Error('Model not loaded. Call loadModel() first.');
  const inputName = session.inputNames[0];
  const feeds = { [inputName]: tensor };
  const results = await session.run(feeds);
  return results[session.outputNames[0]];
}

const offscreenModel = typeof OffscreenCanvas !== 'undefined'
  ? new OffscreenCanvas(1, 1)
  : document.createElement('canvas');

const offscreenModelCtx = offscreenModel.getContext('2d', { willReadFrequently: true });

/**
 * Kaynaktan (video/canvas) ROI'yi dogrudan 1024×1024 letterbox'a cizer.
 * Ara kırpma yok  sıfır kayma.
 * @param {HTMLVideoElement|HTMLCanvasElement} src
 * @param {{ x, y, w, h }} roi  — tam kaynak piksel koordinatlari
 * @returns {{ tensor, roi, scale, offsetX, offsetY }}
 */

export function preprocessRoi(src, roi) {
  if (!INPUT_SIZE) throw new Error('loadModel() bekleniyor.');

  const os = offscreenModel;
  const ctx = offscreenModelCtx;

  if (os.width !== INPUT_SIZE)  os.width  = INPUT_SIZE;
  if (os.height !== INPUT_SIZE) os.height = INPUT_SIZE;

  // 1. Letterbox olcegi — ROI'nin en dar kenarına gore
  const scale   = Math.min(INPUT_SIZE / roi.w, INPUT_SIZE / roi.h);
  const dw      = Math.round(roi.w * scale);
  const dh      = Math.round(roi.h * scale);
  const offsetX = (INPUT_SIZE - dw) / 2;
  const offsetY = (INPUT_SIZE - dh) / 2;

  // 2. Gri arka plan + ROI'yi dogrudan hedef canvas'a ciz
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, INPUT_SIZE, INPUT_SIZE);
  ctx.drawImage(src,
    roi.x, roi.y, roi.w, roi.h,   // kaynak: sadece ROI
    offsetX, offsetY, dw, dh       // hedef: letterbox ici
  );

  // 3. Normalize → Float32 NCHW
  const { data } = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
  const N        = INPUT_SIZE * INPUT_SIZE;
  const float32  = new Float32Array(3 * N);
  for (let i = 0; i < N; i++) {
    float32[i]         = data[i * 4]     / 255;
    float32[i + N]     = data[i * 4 + 1] / 255;
    float32[i + N * 2] = data[i * 4 + 2] / 255;
  }

  const global = typeof self !== 'undefined' ? self : window;
  const tensor = new global.ort.Tensor('float32', float32, [1, 3, INPUT_SIZE, INPUT_SIZE]);

  return { tensor, roi, scale, offsetX, offsetY };
}

export function postprocess(outputTensor, meta) {
  const data = outputTensor.data;
  const dims = outputTensor.dims;

  let rows, cols;
  if (dims[1] < dims[2]) { rows = dims[1]; cols = dims[2]; }
  else                   { rows = dims[2]; cols = dims[1]; }

  const numClasses            = rows - 4;
  const { scale, offsetX, offsetY, roi } = meta;
  const detections            = [];

  for (let a = 0; a < cols; a++) {
    let maxScore = -Infinity, classId = -1;
    for (let c = 0; c < numClasses; c++) {
      const s = data[(4 + c) * cols + a];
      if (s > maxScore) { maxScore = s; classId = c; }
    }
    if (maxScore < CONF_THRESH) continue;

    const cx = data[0 * cols + a];
    const cy = data[1 * cols + a];
    const bw = data[2 * cols + a];
    const bh = data[3 * cols + a];

    // Letterbox → ROI koordinati
    const xRoi = (cx - offsetX) / scale - bw / (scale * 2);
    const yRoi = (cy - offsetY) / scale - bh / (scale * 2);
    const wRoi = bw / scale;
    const hRoi = bh / scale;

    // ROI → Full-frame koordinatİ
    detections.push({
      classId,
      x:          xRoi + roi.x,
      y:          yRoi + roi.y,
      width:      wRoi,
      height:     hRoi,
      confidence: maxScore,
    });
  }

  return nms(detections, IOU_THRESH);
}

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