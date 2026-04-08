# YOLOv8 Web Nesne Tespiti
ONNX Runtime Web aracılığıyla tarayıcıda çalışan, tamamen istemci taraflı (client-side) bir YOLOv8 nesne tespiti web uygulamasıdır.

## ÇInference Detayları
| Ayar | Değer |
|---|---|
| Giriş boyutu | 640 × 640 |
| Normalizasyon | 0–1 RGB |
| Tensor şekli | `[1, 3, 640, 640]` CHW |
| Güven (Confidence) eşiği | 0.5 |
| IoU eşiği (NMS) | 0.45 |
| ONNX yürütme sağlayıcısı | WASM |

## Kombinasyon Mantığı
1. Tespit edilen nesneler, merkez X koordinatlarına göre **soldan → sağa** sıralanır.
2. Sıralanan `classId` dizisi, `valid.json` içindeki her bir girdiyle karşılaştırılır.
3. Tam eşleşme sağlanırsa → **OK** (yeşil); aksi takdirde → **NOK** (kırmızı).
4. Boş kare (hiçbir nesne yoksa) → nötr `—` durumu.
