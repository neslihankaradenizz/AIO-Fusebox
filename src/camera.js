/**
 Bu dosya kamerayı baslatan ve durduran fonksiyonları icerir.
 web de kamerayi acip kapatmak icin kullanilir. 
 /**
 Kamera erisimi talep eder ve akisi belirtilen <video> ogesine baglar.
 * @param {HTMLVideoElement} videoEl
 * @param {{ width?: number, height?: number, facingMode?: string }} [opts]
 * @returns {Promise<MediaStream>}
 */
export async function startCamera(videoEl, opts = {}) {
  /* kamera ayarlari*/
  const constraints = {
    video: {
      width:  { ideal: opts.width      ?? 640 },
      height: { ideal: opts.height     ?? 480  },
      facingMode: opts.facingMode ?? 'environment', /* arka kamera*/
    },
    audio: false,
  };

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
  } catch (_) {
    // fallback mekanizmasi kameraya erisimi engellendiginde veya desteklenmediginde devreye girer 
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  }

  videoEl.srcObject = stream;

  await new Promise((resolve, reject) => {
    videoEl.onloadedmetadata = resolve;
    videoEl.onerror = reject;
  });

  await videoEl.play();
  return stream;
}