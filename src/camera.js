/**
 * Kamerayı başlatan ve durduran fonksiyonlar.
 * Tüm telefon/tablet/masaüstü cihazlarla uyumlu.
 */

/**
 * Kamera erişimi talep eder ve akışı belirtilen <video> ögesine bağlar.
 * Yüksek çözünürlük dener, cihaz desteklemezse otomatik düşer.
 *
 * @param {HTMLVideoElement} videoEl
 * @param {{ width?: number, height?: number, facingMode?: string }} [opts]
 * @returns {Promise<MediaStream>}
 */
export async function startCamera(videoEl, opts = {}) {

  // Sırasıyla deneyeceğimiz constraint listesi — yüksekten düşüğe
  const candidates = [
    //  tam HD — iyi telefon kameralari
    {
      video: {
        width:      { ideal: opts.width      ?? 1920 },
        height:     { ideal: opts.height     ?? 1080 },
        facingMode: { ideal: opts.facingMode ?? 'environment' },
      },
      audio: false,
    },
    // 2. Orta:
    {
      video: {
        width:      { ideal: 1280 },
        height:     { ideal: 720  },
        facingMode: { ideal: opts.facingMode ?? 'environment' },
      },
      audio: false,
    },
    // 3. Dusukk: eskcihazlar
    {
      video: {
        width:      { ideal: 640 },
        height:     { ideal: 480 },
        facingMode: { ideal: opts.facingMode ?? 'environment' },
      },
      audio: false,
    },
    { video: true, audio: false },
  ];

  let stream = null;
  let lastErr = null;

  for (const constraints of candidates) {
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      break; // başarılı — döngüden çık
    } catch (err) {
      lastErr = err;
      // OverconstrainedError veya NotAllowedError ise devam etme
      if (err.name === 'NotAllowedError' || err.name === 'SecurityError') throw err;
    }
  }

  if (!stream) throw lastErr ?? new Error('Kamera açılamadı');

  videoEl.srcObject = stream;

  await new Promise((resolve, reject) => {
    videoEl.onloadedmetadata = resolve;
    videoEl.onerror = reject;
  });

  await videoEl.play();

  // Gerçekte hangi çözünürlükte açıldığını logla
  const track    = stream.getVideoTracks()[0];
  const settings = track?.getSettings?.() ?? {};
  console.log(`[Camera] ${settings.width ?? '?'}x${settings.height ?? '?'} @ ${settings.frameRate ?? '?'}fps — ${settings.facingMode ?? '?'}`);

  return stream;
}

/**
 * Kamerayı durdurur ve stream'i serbest bırakır.
 * @param {MediaStream} stream
 */
export function stopCamera(stream) {
  stream?.getTracks().forEach(t => t.stop());
}