# AIO-FUSEBOX VISION

Sigorta kutusu sigortalarını kamera ile gerçek zamanlı tespit eden ve referans kombinasyonlarla karşılaştıran mobil-öncelikli web uygulaması.

---

## Nasıl Çalışır

1. **Kamera** açılır, ekrandaki ROI çerçevesine sigorta kutusu hizalanır.
2. **Fotoğraf Çek** — ROI alanı kırpılarak yakalanır.
3. **Görüntü Eşleştir** — YOLO modeli sigortaları tespit eder, `valid.json` ile karşılaştırır.
4. Sonuç **OK** veya **NOK** olarak gösterilir; tespit tablosu drawer'dan incelenebilir.

---

## Mimari

```
index.html        → UI & CSS
app.js            → Uygulama mantığı, kamera & buton akışı
camera.js         → getUserMedia, çözünürlük fallback zinciri
yolo.js           → ONNX model yükleme, preprocess, postprocess, NMS
yolo_worker.js    → Web Worker — inference ana thread'i bloke etmez
overlay.js        → Canvas çizimi (ROI, bbox, legend)
combination.js    → valid.json yükleme, sol/sağ sütun karşılaştırma
```

---

## Teknik Notlar

- **Model:** YOLOv8, ONNX formatı (`best_fuseboxV1.onnx`) — Cloudflare Worker üzerinden sunulur.
- **Runtime:** `onnxruntime-web` WASM, Web Worker içinde çalışır.
- **Cache:** Model ve ORT dosyaları `Cache API` ile saklanır; ilk açılıştan sonra offline çalışır.
- **Koordinat uzayı:** Canvas, video/snapshot ile aynı piksel uzayında tutulur — CSS scaling kaymasını önler.
- **Sınıflar:** `2A / 5A / 7.5A / 10A / 15A / 20A / 25A / 30A / empty` (9 sınıf)

---

## Gereksinimler

- Modern mobil/masaüstü tarayıcı (Chrome önerilir)
- Kamera izni
- İlk açılışta internet bağlantısı (model indirme ~ilk kez)
