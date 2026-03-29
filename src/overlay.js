const ROI_RATIO = { x: 0.1, y: 0.2, w: 0.8, h: 0.6 };
const CORNER_LEN = 22;
const CORNER_W   = 4;

const CLASS_STYLES = {
  0: { color: '#ef4444', label: '10A'  },  // kırmızı
  1: { color: '#3b82f6', label: '15A'  },  // mavi
  2: { color: '#eab308', label: '20A'  },  // sarı
  3: { color: '#000000', label: '25A'  },  // siyah
  4: { color: '#868484', label: '2A'   },  // gri
  5: { color: '#22c55e', label: '30A'  },  // yeşil
  6: { color: '#f97316', label: '5A'   },  // turuncu
  7: { color: '#6b3a3a', label: '7.5A' },  // kahverengi
  8: { color: '#b81ede', label: 'BOŞ'  },  // mor
};

const DEFAULT_STYLE = { color: '#f59e0b', label: '?' };

export function getRoi(canvas) {
  return {
    x: Math.round(canvas.width  * ROI_RATIO.x),
    y: Math.round(canvas.height * ROI_RATIO.y),
    w: Math.round(canvas.width  * ROI_RATIO.w),
    h: Math.round(canvas.height * ROI_RATIO.h),
  };
}

export function syncCanvasSize(canvas, source) {
  canvas.width  = source.clientWidth  || source.offsetWidth;
  canvas.height = source.clientHeight || source.offsetHeight;
}

export function clearCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawRoi(canvas, hasDetections) {
  const ctx = canvas.getContext('2d');
  const { x, y, w, h } = getRoi(canvas);
  const color = hasDetections ? '#ef4444' : '#ffffff';

  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.clearRect(x, y, w, h);

  ctx.strokeStyle = color;
  ctx.lineWidth   = CORNER_W;
  ctx.lineCap     = 'round';

  const corners = [
    [x,     y,     1,  1 ],
    [x+w,   y,    -1,  1 ],
    [x,     y+h,   1, -1 ],
    [x+w,   y+h,  -1, -1 ],
  ];

  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx + dx * CORNER_LEN, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + dy * CORNER_LEN);
    ctx.stroke();
  }
}

export function drawDetections(canvas, source, detections, roiOffset = { x: 0, y: 0 }) {
  const ctx = canvas.getContext('2d');

  const dispW  = canvas.width;
  const dispH  = canvas.height;
  const srcW   = source.videoWidth  || source.naturalWidth  || source.width;
  const srcH   = source.videoHeight || source.naturalHeight || source.height;
  const scaleX = dispW / srcW;
  const scaleY = dispH / srcH;

  for (const det of detections) {
    const bx = (det.x + roiOffset.x) * scaleX;
    const by = (det.y + roiOffset.y) * scaleY;
    const bw = det.width  * scaleX;
    const bh = det.height * scaleY;

    const style = CLASS_STYLES[det.classId] ?? DEFAULT_STYLE;

    ctx.strokeStyle = style.color;
    ctx.lineWidth   = 2.5;
    ctx.strokeRect(bx, by, bw, bh);
  }

  drawLegend(canvas, ctx);
}

// 2 sütunlu legend — sol alt köşe
function drawLegend(canvas, ctx) {
  const entries  = Object.entries(CLASS_STYLES);
  const cols     = 2;
  const rows     = Math.ceil(entries.length / cols);
  const boxSize  = 12;
  const fontSize = 11;
  const padding  = 6;
  const colW     = 58;
  const lineH    = boxSize + 5;
  const legendW  = cols * colW + padding * 2;
  const legendH  = rows * lineH + padding * 2;
  const lx       = 8;
  const ly       = canvas.height - legendH - 8;

  // Arka plan
  ctx.fillStyle = 'rgba(0,0,0,0.65)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(lx, ly, legendW, legendH, 6);
  } else {
    ctx.rect(lx, ly, legendW, legendH);
  }
  ctx.fill();

  ctx.font = `bold ${fontSize}px sans-serif`;

  entries.forEach(([id, style], i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ex  = lx + padding + col * colW;
    const ey  = ly + padding + row * lineH;

    // Renk kutusu
    ctx.fillStyle = style.color;
    ctx.fillRect(ex, ey, boxSize, boxSize);

    // Kenarlık (beyaz gibi açık renkler için)
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth   = 0.5;
    ctx.strokeRect(ex, ey, boxSize, boxSize);

    // Label
    ctx.fillStyle = '#ffffff';
    ctx.fillText(style.label, ex + boxSize + 4, ey + boxSize - 1);
  });
}