import { startCamera }                                                         from './camera.js';
import { loadValidCombinations, validateCombination, sortDetections }          from './combination.js';
import { syncCanvasSize, clearCanvas, drawRoi, drawDetections, getRoiRect, getClassName } from './overlay.js';

const CACHE_NAME = 'fusebox-v3';

const video          = document.getElementById('video');
const snapshot       = document.getElementById('snapshot');
const canvas         = document.getElementById('canvas');
const loadingOverlay = document.getElementById('loading-overlay');
const loadingMsg     = document.getElementById('loading-message');
const statusText     = document.getElementById('status-text');
const bottomBar      = document.getElementById('bottom-bar');
const resultLabel    = document.getElementById('result-label');
const detectedIdsEl  = document.getElementById('detected-ids');
const btnCapture     = document.getElementById('btn-capture');
const btnMatch       = document.getElementById('btn-match');
const btnRetake      = document.getElementById('btn-retake');

let capturedCanvas  = null;
let previewRunning  = false;
let worker          = null;  // worker global — hem preview hem match kullanır
let inferGeneration = 0;     // stale sonuçları elemek için nesil sayacı

// --- DRAWER KURULUMU ---

// Backdrop elementi
const backdrop = document.createElement('div');
backdrop.id = 'drawer-backdrop';
document.body.appendChild(backdrop);

// Drawer handle (detectedIdsEl içine ilk çocuk olarak eklenir)
const drawerHandle = document.createElement('div');
drawerHandle.className = 'drawer-handle';
detectedIdsEl.prepend(drawerHandle);

// TESPİT TABLOSU butonu — bottomBar'a eklenir
const btnDrawer = document.createElement('button');
btnDrawer.id = 'btn-drawer';
btnDrawer.textContent = '📋 TESPİT TABLOSU';
bottomBar.appendChild(btnDrawer);

// Drawer aç/kapat yardımcıları
function openDrawer() {
  detectedIdsEl.classList.add('drawer-open');
  backdrop.classList.add('visible');
  btnDrawer.textContent = '✕ KAPAT';
}
function closeDrawer() {
  detectedIdsEl.classList.remove('drawer-open');
  backdrop.classList.remove('visible');
  btnDrawer.textContent = '📋 TESPİT TABLOSU';
}

btnDrawer.addEventListener('click', () => {
  detectedIdsEl.classList.contains('drawer-open') ? closeDrawer() : openDrawer();
});
backdrop.addEventListener('click', closeDrawer);

// FPS ADAPTASYONU
const isLowEnd = (navigator.hardwareConcurrency ?? 4) <= 4 ||
                 (navigator.deviceMemory        ?? 4) <= 2;
console.log(`[Perf] ${isLowEnd ? 'Düşük uçlu' : 'Yüksek uçlu'} cihaz`);

function onResize() {
  const source = video.style.display !== 'none' ? video : snapshot;
  syncCanvasSize(canvas, source);
}
window.addEventListener('resize', onResize);

let lastHadDetections = false;
let loopTimer         = null;
let inferBusy         = false; // worker meşgulken tekrar gönderme

// --- Worker'a inference gönder, Promise döner ---
// DÜZELTME 1: workerInfer artık inferGeneration'ı artırmıyor.
// Bunun yerine çağıran kod kendi "beklenen nesil" değerini geçiyor.
// Bu sayede stopPreviewLoop()'un yaptığı inferGeneration++ match sırasında
// race condition oluşturmuyor.
function workerInfer(imageBitmap, width, height, expectedGen) {
  return new Promise((resolve, reject) => {
    const onMsg = (e) => {
      if (e.data.type === 'result') {
        worker.removeEventListener('message', onMsg);
        // Sadece bu çağrı için beklenen nesil hâlâ geçerliyse resolve et
        if (expectedGen === inferGeneration) resolve(e.data.detections);
        else resolve([]); // stale — boş dizi döndür, hata değil
      } else if (e.data.type === 'error') {
        worker.removeEventListener('message', onMsg);
        if (expectedGen === inferGeneration) reject(new Error(e.data.message));
      }
    };
    worker.addEventListener('message', onMsg);
    worker.postMessage(
      { type: 'infer', payload: { bitmap: imageBitmap, width, height } },
      [imageBitmap]
    );
  });
}

// UI loop — sadece çizim, rAF ile 60fps
function startUILoop() {
  function uiLoop() {
    if (!previewRunning) return;
    clearCanvas(canvas);
    drawRoi(canvas, lastHadDetections);
    requestAnimationFrame(uiLoop);
  }
  requestAnimationFrame(uiLoop);
}

// Inference loop — worker üzerinden, düşük FPS
function startInferenceLoop() {
  async function inferLoop() {
    if (!previewRunning) return;

    if (!inferBusy && video.readyState >= video.HAVE_ENOUGH_DATA) {
      inferBusy = true;
      // Nesli burada oku — workerInfer içinde artırma yok artık
      const myGen = ++inferGeneration;
      try {
        const roi    = getRoiRect(video);
        const bitmap = await createImageBitmap(video, roi.x, roi.y, roi.w, roi.h);
        const detections = await workerInfer(bitmap, roi.w, roi.h, myGen);
        if (myGen === inferGeneration) {
          lastHadDetections = detections.length > 0;
        }
      } catch {
        lastHadDetections = false;
      } finally {
        inferBusy = false;
      }
    }

    loopTimer = setTimeout(inferLoop, isLowEnd ? 200 : 100);
  }
  loopTimer = setTimeout(inferLoop, 0);
}

function startPreviewLoop() {
  previewRunning = true;
  startUILoop();
  startInferenceLoop();
}

function stopPreviewLoop() {
  previewRunning = false;
  // inferGeneration'ı burada artırıyoruz — uçuştaki preview inference'larını iptal eder
  inferGeneration++;
  if (loopTimer !== null) {
    clearTimeout(loopTimer);
    loopTimer = null;
  }
}

// --- CAPTURE ---
btnCapture.addEventListener('click', () => {
  stopPreviewLoop();

  // Direkt ROI'yi kes — tam çözünürlüğe gerek yok
  const roi = getRoiRect(video);
  capturedCanvas = document.createElement('canvas');
  capturedCanvas.width  = roi.w;
  capturedCanvas.height = roi.h;
  capturedCanvas.getContext('2d').drawImage(
    video, roi.x, roi.y, roi.w, roi.h, 0, 0, roi.w, roi.h
  );

  // snapshot async yüklenir — onload beklenmezse naturalWidth=0 gelir
  snapshot.onload = () => {
    syncCanvasSize(canvas, snapshot);
    clearCanvas(canvas);
    drawRoi(canvas, false);
    snapshot.onload = null;
  };
  snapshot.src           = capturedCanvas.toDataURL('image/jpeg');
  snapshot.style.display = 'block';
  video.style.display    = 'none';

  btnCapture.classList.add('hidden');
  btnMatch.classList.remove('hidden');
  btnRetake.classList.remove('hidden');

  closeDrawer();
  btnDrawer.classList.remove('visible');
  detectedIdsEl.innerHTML   = '<div class="drawer-handle"></div>';
  resultLabel.textContent   = '';
  bottomBar.className       = '';
  statusText.textContent    = 'Fotoğraf hazır';
});

// --- MATCH ---
btnMatch.addEventListener('click', async () => {
  if (!capturedCanvas) return;

  btnMatch.disabled      = true;
  btnMatch.textContent   = '⏳ Analiz ediliyor…';
  statusText.textContent = 'Analiz ediliyor…';

  try {
    // Canvas'ı capturedCanvas boyutuna eşitle
    syncCanvasSize(canvas, capturedCanvas);

    const cropped = capturedCanvas;
    const roi     = { x: 0, y: 0, w: capturedCanvas.width, h: capturedCanvas.height };

    // DÜZELTME 1: Match için nesli burada artır ve workerInfer'a geçir
    // stopPreviewLoop()'un artırdığı nesil değeri geçerliliğini koruyor,
    // match çağrısı kendi nesliyle yeni bir "slot" açıyor.
    const matchGen = ++inferGeneration;

    // Her seferinde taze bitmap — önceki workerInfer'a transfer edilmiş olabilir
    const bitmap     = await createImageBitmap(cropped);
    const detections = await workerInfer(bitmap, cropped.width, cropped.height, matchGen);

    detections.sort((a, b) => (a.x + a.width / 2) - (b.x + b.width / 2));

    const hasDetections = detections.length > 0;

    clearCanvas(canvas);

    // Match modunda canvas zaten ROI crop'unun kendisi — tüm canvas = ROI.
    // drawRoi() ise canvas boyutunu tam video gibi kabul edip içine küçük bir
    // pencere çiziyor (canvas.width*0.1 offset vs.), bu da clearRect'i yanlış
    // yere götürüyor ve deteksiyon kutuları kayıyor.
    // Bu yüzden burada drawRoi kullanmıyoruz; sadece hafif bir karartma ve
    // renkli border ile "çerçeve" efektini kendimiz çiziyoruz.
    (function drawMatchOverlay() {
      const ctx   = canvas.getContext('2d');
      const color = hasDetections ? '#ef4444' : '#ffffff';
      // Hafif karartma — deteksiyonları ön plana çıkarır
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Canvas kenarına renkli border
      ctx.strokeStyle = color;
      ctx.lineWidth   = 6;
      ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
    })();

    // source olarak capturedCanvas geçiyoruz: deteksiyonlar ve canvas aynı
    // koordinat uzayında (her ikisi de ROI crop boyutunda) → scaleX/Y = 1.0
    drawDetections(canvas, capturedCanvas, detections, { x: 0, y: 0 });

    const classIds = detections.map(d => d.classId);
    const { state } = validateCombination(classIds, detections, roi.w);

    bottomBar.className     = state === 'ok' ? 'ok' : state === 'nok' ? 'nok' : '';
    resultLabel.textContent = state === 'ok' ? 'OK' : state === 'nok' ? 'NOK' : '—';

    if (classIds.length > 0) {
      const sorted    = sortDetections(detections, roi.w);
      const leftDets  = sorted.filter(d => d.colIndex === 0);
      const rightDets = sorted.filter(d => d.colIndex === 1);

      const LEFT_LABELS  = ['F1','F2','F3','F4','F5','F6','F7','F8','F9'];
      const RIGHT_LABELS = ['F10','F11','F12','F13','F14','F15','F16','F17','TEST'];

      // Amp değerine göre CSS sınıfı
      const ampClass = (val) => {
        if (!val || val === '—')        return 'amp-none';
        if (val.includes('empty'))      return 'amp-empty';
        if (val.includes('30'))         return 'amp-30';
        if (val.includes('25'))         return 'amp-25';
        if (val.includes('20'))         return 'amp-20';
        if (val.includes('15'))         return 'amp-15';
        if (val.includes('10'))         return 'amp-10';
        if (val.includes('7'))          return 'amp-7';
        if (val.includes('5'))          return 'amp-5';
        if (val.includes('2'))          return 'amp-2';
        return '';
      };

      // Tablo satırlarını oluştur
      let rows = '';
      for (let i = 0; i < 9; i++) {
        const lLabel = LEFT_LABELS[i]  ?? '';
        const rLabel = RIGHT_LABELS[i] ?? '';
        const lVal   = leftDets[i]  ? getClassName(leftDets[i].classId)  : '—';
        const rVal   = rightDets[i] ? getClassName(rightDets[i].classId) : '—';
        rows += `<tr>
          <td class="lbl">${lLabel}</td>
          <td class="val ${ampClass(lVal)}">${lVal}</td>
          <td class="sep"></td>
          <td class="lbl">${rLabel}</td>
          <td class="val ${ampClass(rVal)}">${rVal}</td>
        </tr>`;
      }

      // Tabloyu drawer içine yerleştir
      detectedIdsEl.innerHTML = `
        <div class="drawer-handle"></div>
        <table>
          <colgroup>
            <col style="width:38px"><col>
            <col style="width:10px">
            <col style="width:38px"><col>
          </colgroup>
          <thead>
            <tr>
              <th colspan="2">◀ SOL (J2)</th>
              <th></th>
              <th colspan="2">(J3) SAĞ ▶</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>`;

      // Drawer butonunu göster — analiz tamamlandı
      btnDrawer.classList.add('visible');
    } else {
      detectedIdsEl.innerHTML = '<div class="drawer-handle"></div><p style="padding:16px;color:#666;text-align:center;">Nesne bulunamadı</p>';
      btnDrawer.classList.add('visible');
    }

    statusText.textContent = state === 'ok' ? 'Eşleşme bulundu ✓' : 'Eşleşme yok';

  } catch (err) {
    statusText.textContent = 'Hata: ' + err.message;
    console.error(err);
  }

  btnMatch.disabled    = false;
  btnMatch.textContent = '🔍 Görüntü Eşleştir';
});

// --- RETAKE ---
btnRetake.addEventListener('click', () => {
  snapshot.style.display = 'none';
  video.style.display    = 'block';
  capturedCanvas         = null;
  lastHadDetections      = false;

  syncCanvasSize(canvas, video);

  btnCapture.classList.remove('hidden');
  btnMatch.classList.add('hidden');
  btnRetake.classList.add('hidden');

  resultLabel.textContent   = '';
  detectedIdsEl.innerHTML   = '<div class="drawer-handle"></div>';
  bottomBar.className       = '';
  statusText.textContent    = 'Kamera aktif';

  closeDrawer();
  btnDrawer.classList.remove('visible');

  startPreviewLoop();
});

// --- MODEL CACHE ---
// Ana sayfa artık modeli indirmiyor — URL'yi worker'a gönderir.
// Worker kendi fetch eder, cache API'yi de kendisi kullanır.
// Bu sayede büyük ArrayBuffer ana sayfa RAM'ini hiç doldurmaz.

// --- INIT ---
const ORT_FILES = [
  'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/ort.wasm.min.js',
  'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/ort-wasm-simd-threaded.wasm',
];

async function init() {
  try {
    loadingMsg.textContent = 'Kombinasyonlar yükleniyor…';
    const validUrl = import.meta.env.BASE_URL + 'valid.json';
    await loadValidCombinations(validUrl);

    loadingMsg.textContent = 'Kamera başlatılıyor…';
    await startCamera(video);
    syncCanvasSize(canvas, video);

    async function fetchWithRetry(url, retries = 3, delayMs = 800) {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(url);
          if (res.ok) return res;
          throw new Error(`HTTP ${res.status}`);
        } catch (err) {
          if (i < retries - 1) {
            console.warn(`[Cache] Deneme ${i + 1} başarısız, tekrar: ${url}`, err.message);
            await new Promise(r => setTimeout(r, delayMs * (i + 1)));
          } else {
            console.error(`[Cache] ${retries} denemede indirilemedi, atlanıyor: ${url}`, err.message);
          }
        }
      }
      return null;
    }

    // ORT dosyalarını cache'e al — hata olursa atla, worker zaten kendi yükler
    loadingMsg.textContent = 'ORT yükleniyor…';
    await Promise.all(ORT_FILES.map(async url => {
      try {
        const cache = await caches.open('fusebox-v3');
        if (await cache.match(url)) return;
        const res = await fetchWithRetry(url);
        if (res) {
          cache.put(url, res.clone());
          console.log('[Cache] ORT dosyası kaydedildi:', url);
        }
      } catch (err) {
        console.warn('[Cache] ORT cache adımı atlandı:', err.message);
      }
    }));

    // Worker'ı başlat — modeli worker'ın kendisi indirecek
    loadingMsg.textContent = 'Model yükleniyor…';
    const MODEL_URL = 'https://aoi-fusebox1.neslihan-krdnz53.workers.dev/best_fuseboxV1.onnx';

    worker = new Worker(new URL('./yolo.worker.js', import.meta.url), { type: 'module' });

    // Sadece URL gönder — buffer transfer yok, ana sayfa RAM'i dolmuyor
    worker.postMessage({ type: 'load', payload: { modelUrl: MODEL_URL } });

    await new Promise((resolve, reject) => {
      worker.addEventListener('message', (e) => {
        if (e.data.type === 'loaded') resolve();
        if (e.data.type === 'progress') loadingMsg.textContent = e.data.message;
        if (e.data.type === 'error')  reject(new Error(e.data.message));
      }, { once: false, signal: AbortSignal.timeout(120_000) });
      // 2 dakika timeout — yavaş mobil ağ için
    }).catch(err => {
      if (err.name === 'TimeoutError') throw new Error('Model yüklenemedi: bağlantı zaman aşımı. Sayfayı yenileyin.');
      throw err;
    });

    loadingOverlay.classList.add('hidden');
    statusText.textContent = 'Hazır';
    startPreviewLoop();

  } catch (err) {
    loadingMsg.textContent = `Hata: ${err.message}`;
    statusText.textContent = 'Hata';
    console.error(err);
  }
}
init();