## YOLOv8 Fusebox Tespiti
ONNX Runtime Web aracılığıyla tarayıcıda çalışan, bir YOLOv8 nesne tespiti web uygulamasıdır.

## Kombinasyon Mantığı
1. Tespit edilen nesneler, merkez X koordinatlarına göre **soldan → sağa** sıralanır.
2. Sıralanan `classId` dizisi, `valid.json` içindeki her bir girdiyle karşılaştırılır.
3. Tam eşleşme sağlanırsa → **OK** (yeşil); aksi takdirde → **NOK** (kırmızı).
4. Boş kare (hiçbir nesne yoksa) → nötr `—` durumu.
