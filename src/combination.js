/**
 * combination.js
 * valid.json'u yükler ve tespit edilen detections listesini
 * beklenen 78 pozisyonlu dizilimle karşılaştırarak OK / NOK döner.
 *
 * Sıralama mantığı:
 *   Her blok: left sütun (10) → middle sütun (6) → right sütun (10)
 *   Sütun içinde: yukarıdan aşağıya (Y koordinatına göre)
 *   Blok sırası: soldan sağa (X koordinatına göre)
 */

let validCombinations = [];

/**
 * valid.json dosyasını yükler.
 * @param {string} url
 */

export async function loadValidCombinations(url = '/valid.json') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`valid.json yüklenemedi: ${response.status}`);
  const data = await response.json();
  validCombinations = data.combinations;
}
/**
 * Detections listesini blok/sütun/pozisyona göre sıralar.
 *
 * Sıralama:
 *  1. Blok (X'e göre — soldan sağa, 3 blok)
 *  2. Sütun içi sıra (left → middle → right — X'e göre)
 *  3. Pozisyon (Y'ye göre — yukarıdan aşağıya)
 *
 * @param {Array} detections  [{classId, x, y, width, height, confidence}]
 * @returns {Array} sıralanmış detections
 */
function sortDetections(detections) {
  if (detections.length === 0) return [];

  // Tüm x merkezlerini hesapla
  const withCenter = detections.map(d => ({
    ...d,
    cx: d.x + d.width  / 2,
    cy: d.y + d.height / 2,
  }));

  // X aralığını bul ve 9 sütuna böl (3 blok × 3 sütun)
  const allCx = withCenter.map(d => d.cx);
  const midX  = (Math.min(...allCx) + Math.max(...allCx)) / 2;

  // Her detection'a sütun indeksi ata (0–8)
  const withCol = withCenter.map(d => ({
    ...d,
    colIndex: Math.round(((d.cx - minX) / range) * 8),
  }));

  // Sütun indeksine ve Y'ye göre sırala
  withCol.sort((a, b) => {
    if (a.colIndex !== b.colIndex) return a.colIndex - b.colIndex;
    return a.cy - b.cy;
  });

  return withCol;
}

/**
 * Tespit edilen detections listesini beklenen 78 pozisyonla karsilatirir
 *
 * @param {number[]} detectedClassIds  - classId dizisi 
 * @param {Array}    detections        - ham detections 
 * @returns {'ok' | 'nok' | 'unknown'}
 */

export function validateCombination(detectedClassIds, detections = null) {
  if (!detectedClassIds || detectedClassIds.length === 0) return 'unknown';

  for (const combo of validCombinations) {
    const expected = combo.expected;

    // Detections varsa yeniden sırala, yoksa gelen classId dizisini kullan
    let orderedIds;
    if (detections && detections.length > 0) {
      const sorted = sortDetections(detections);
      orderedIds = sorted.map(d => d.classId);
    } else {
      orderedIds = detectedClassIds;
    }

    // tespit sayi kontrol
    if (orderedIds.length !== expected.length) {
      console.warn(
        `[Combination] "${combo.id}": Beklenen ${expected.length} pozisyon, tespit edilen ${orderedIds.length}`
      );
      return 'nok';
    }

    // Pozisyon karsilastirma
    let allMatch = true;
    const mismatches = [];

    for (let i = 0; i < expected.length; i++) {
      const exp = expected[i];
      const det = orderedIds[i];

      if (exp.classId !== det) {
        allMatch = false;
        mismatches.push({
          position:      exp.position,
          block:         exp.block,
          column:        exp.column,
          col_pos:       exp.col_pos,
          expectedLabel: exp.label,
          expectedId:    exp.classId,
          detectedId:    det,
        });
      }
    }

    if (allMatch) {
      console.log(`[Combination] "${combo.id}" → ✅ OK`);
      return 'ok';
    } else {
      console.warn(`[Combination] "${combo.id}" → ❌ NOK — ${mismatches.length} hatalı pozisyon:`, mismatches);
      return 'nok';
    }
  }

  console.warn('[Combination] Hiçbir kombinasyonla eşleşmedi → NOK');
  return 'nok';
}

export function getCombinations() {
  return validCombinations;
}