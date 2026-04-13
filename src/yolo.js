const CONF_THRESH = 0.5;
const IOU_THRESH  = 0.45;

let session   = null;
let INPUT_SIZE = null;  // loadModel() içinde ONNX buffer'dan okunur

// ONNX protobuf'tan input tensor boyutunu çıkar
// Path: ModelProto[7→graph] → GraphProto[11→input] → ValueInfoProto[2→type]
//       → TypeProto[1→tensor_type] → TypeProto.Tensor[2→shape]
//       → TensorShapeProto[1→dim][] → Dimension[1→dim_value]
function parseInputSizeFromBuffer(buffer) {
  const u8  = new Uint8Array(buffer);
  const cur = { pos: 0 };  // object property — minifier'dan etkilenmez

  const varint = () => {
    let v = 0, s = 0, b;
    do { b = u8[cur.pos++]; v |= (b & 0x7f) << s; s += 7; } while (b & 0x80);
    return v;
  };

  const skipWire = (wt) => {
    if      (wt === 0) varint();
    else if (wt === 1) cur.pos += 8;
    else if (wt === 2) cur.pos += varint();
    else if (wt === 5) cur.pos += 4;
  };

  // targetField numaralı LEN field'ı bul, her bulduğunda handler(msgLen) çağır
  // İlk non-null sonucu döndür
  const find = (end, targetField, handler) => {
    while (cur.pos < end) {
      const tag = varint();
      const fn = tag >>> 3, wt = tag & 7;
      if (wt === 2) {
        const mLen = varint();
        const mEnd = cur.pos + mLen;
        if (fn === targetField) {
          const r = handler(mLen);
          if (r != null) return r;
        }
        if (cur.pos < mEnd) cur.pos = mEnd;
      } else {
        skipWire(wt);
      }
    }
    return null;
  };

  const total = u8.length;

  return find(total, 7, (graphLen) =>
    find(cur.pos + graphLen, 11, (viLen) =>
      find(cur.pos + viLen, 2, (tpLen) =>
        find(cur.pos + tpLen, 1, (ttLen) =>
          find(cur.pos + ttLen, 2, (shapeLen) => {
            const shapeEnd = cur.pos + shapeLen;
            const dims = [];
            while (cur.pos < shapeEnd) {
              const tag = varint();
              const fn = tag >>> 3, wt = tag & 7;
              if (fn === 1 && wt === 2) {
                const dLen = varint();
                const dEnd = cur.pos + dLen;
                let dimVal = null;
                while (cur.pos < dEnd) {
                  const dtag = varint();
                  const dfn = dtag >>> 3, dwt = dtag & 7;
                  if (dfn === 1 && dwt === 0) dimVal = varint(); // dim_value (static)
                  else skipWire(dwt);                             // dim_param (dynamic) → skip
                }
                dims.push(dimVal);
                cur.pos = dEnd;
              } else {
                skipWire(wt);
              }
            }
            const size = dims[2] ?? dims[3];
            return (size && size > 0) ? size : null;
          })
        )
      )
    )
  );
}

// Diğer modüllerin INPUT_SIZE'ı okuması için
export function getInputSize() {
  if (!INPUT_SIZE) throw new Error('getInputSize: loadModel() henüz tamamlanmadı');
  return INPUT_SIZE;
}

async function getOrt() {
  if (window.ort) return window.ort;
  
  return new Promise((resolve, reject) => {
    let count = 0;
    const check = setInterval(() => {
      count++;
      console.log('[ORT] Bekleniyor...', count, 'window.ort:', typeof window.ort);
      if (window.ort) {
        clearInterval(check);
        resolve(window.ort);
      }
      if (count > 100) { // 5 saniye
        clearInterval(check);
        reject(new Error('ORT CDN yüklenemedi. window.ort undefined.'));
      }
    }, 50);
  });
}

export async function loadModel(modelUrl = '/best_fuseboxV1.onnx') {
  const ort = await getOrt();

  ort.env.wasm.numThreads = 1;
  ort.env.wasm.proxy = false;
  ort.env.wasm.wasmPaths = 'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/';

  // 1. Önce ONNX buffer'dan parse et (en güvenilir yol)
  if (modelUrl instanceof ArrayBuffer) {
    try {
      const size = parseInputSizeFromBuffer(modelUrl);
      if (size) {
        INPUT_SIZE = size;
        console.log('[YOLO] INPUT_SIZE ONNX buffer\'dan okundu:', INPUT_SIZE);
      }
    } catch (e) {
      console.warn('[YOLO] Buffer parse hatası:', e.message);
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

  // 2. Buffer parse başarısız olduysa inputMetadata dene (ORT ≥1.14)
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

  // 3. Her ikisi de başarısız → fallback
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

const offscreenModel = document.createElement('canvas');
const offscreenModelCtx = offscreenModel.getContext('2d', { willReadFrequently: true });

// Preprocess — offscreen → offscreenModel
export function preprocessCanvas(srcCanvas) {
  if (!INPUT_SIZE) throw new Error('INPUT_SIZE henüz set edilmedi. loadModel() bekleniyor.');
  offscreenModel.width  = INPUT_SIZE;
  offscreenModel.height = INPUT_SIZE;
  //const ctx = offscreenModel.getContext('2d',{willReadFrequently: true});

  const vw = srcCanvas.width;
  const vh = srcCanvas.height;
  const scale = Math.min(INPUT_SIZE / vw, INPUT_SIZE / vh);
  const dw = Math.round(vw * scale);
  const dh = Math.round(vh * scale);
  const dx = (INPUT_SIZE - dw) / 2;
  const dy = (INPUT_SIZE - dh) / 2;

  offscreenModelCtx.fillStyle = '#808080';
  offscreenModelCtx.fillRect(0, 0, INPUT_SIZE, INPUT_SIZE);
  offscreenModelCtx.drawImage(srcCanvas, dx, dy, dw, dh);

  const { data } = offscreenModelCtx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
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

export function postprocess(outputTensor, srcWidth, srcHeight, meta) {
  const data = outputTensor.data;
  const dims = outputTensor.dims;

  let rows, cols;
  if (dims[1] < dims[2]) {
    rows = dims[1]; cols = dims[2];
  } else {
    rows = dims[2]; cols = dims[1];
  }

  const numClasses = rows - 4;
  const detections = [];
  const { scale, offsetX, offsetY } = meta;

  for (let a = 0; a < cols; a++) {
    let maxScore = -Infinity;
    let classId  = -1;
    for (let c = 0; c < numClasses; c++) {
      const score = data[(4 + c) * cols + a];
      if (score > maxScore) { maxScore = score; classId = c; }
    }
    if (maxScore < CONF_THRESH) continue;

    const cx = data[0 * cols + a];
    const cy = data[1 * cols + a];
    const bw = data[2 * cols + a];
    const bh = data[3 * cols + a];

    const x = ((cx - offsetX) / scale) - bw / scale / 2;
    const y = ((cy - offsetY) / scale) - bh / scale / 2;
    const w = bw / scale;
    const h = bh / scale;

    detections.push({ classId, x, y, width: w, height: h, confidence: maxScore });
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