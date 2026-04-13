let validCombinations = [];

export async function loadValidCombinations(url = '/valid.json') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`valid.json yüklenemedi: ${response.status}`);
  const data = await response.json();
  validCombinations = data.combinations;
}

export function sortDetections(detections, roiWidth = null) {
  if (!detections.length) return [];

  const withCenter = detections.map(d => ({
    ...d,
    cx: d.x + d.width  / 2,
    cy: d.y + d.height / 2,
  }));

  // roiWidth verilmişse sabit orta nokta, verilmemişse dinamik hesapla
  const allCx = withCenter.map(d => d.cx);
  const splitX = roiWidth
    ? roiWidth / 2
    : (Math.min(...allCx) + Math.max(...allCx)) / 2;

  return withCenter.map(d => ({
    ...d,
    colIndex: d.cx < splitX ? 0 : 1,
  })).sort((a, b) =>
    a.colIndex !== b.colIndex
      ? a.colIndex - b.colIndex
      : a.cy - b.cy
  );
}

export function validateCombination(detectedClassIds, detections = [], roiWidth = null) {
  if (!detectedClassIds?.length) return { state: 'unknown', score: 0, comboId: null };

  const sorted        = sortDetections(detections, roiWidth);
  const detectedLeft  = sorted.filter(d => d.colIndex === 0).map(d => d.classId);
  const detectedRight = sorted.filter(d => d.colIndex === 1).map(d => d.classId);

  for (const combo of validCombinations) {
    const expectedLeft  = combo.expected
      .filter(e => e.column === 'left')
      .sort((a, b) => a.position - b.position);
    const expectedRight = combo.expected
      .filter(e => e.column === 'right')
      .sort((a, b) => a.position - b.position);

    // Eleman sayısı uyuşmuyorsa bu combo'yu atla
    if (detectedLeft.length  !== expectedLeft.length ||
        detectedRight.length !== expectedRight.length) {
      console.warn(
        `[Combo] "${combo.id}" atlandı —`,
        `Sol: beklenen ${expectedLeft.length} tespit ${detectedLeft.length} |`,
        `Sağ: beklenen ${expectedRight.length} tespit ${detectedRight.length}`
      );
      continue;
    }

    // Sırayla karşılaştır
    const mismatches = [];

    for (let i = 0; i < expectedLeft.length; i++) {
      if (detectedLeft[i] !== expectedLeft[i].classId) {
        mismatches.push({
          column:        'left',
          position:      expectedLeft[i].position,
          expectedLabel: expectedLeft[i].label,
          expectedId:    expectedLeft[i].classId,
          detectedId:    detectedLeft[i],
        });
      }
    }

    for (let i = 0; i < expectedRight.length; i++) {
      if (detectedRight[i] !== expectedRight[i].classId) {
        mismatches.push({
          column:        'right',
          position:      expectedRight[i].position,
          expectedLabel: expectedRight[i].label,
          expectedId:    expectedRight[i].classId,
          detectedId:    detectedRight[i],
        });
      }
    }

    const total = expectedLeft.length + expectedRight.length;
    const score = (total - mismatches.length) / total;

    if (mismatches.length === 0) {
      console.log(`[Combo] ✅ OK — ${combo.id}`);
      return { state: 'ok', score: 1.0, comboId: combo.id };
    }

    // Eleman sayısı eşleşti ama içerik uyuşmadı
    // → Bu combo'ya girdiğimize göre başkasına bakma, NOK dön
    console.warn(
      `[Combo] ❌ NOK — ${combo.id} |`,
      `%${(score * 100).toFixed(0)} eşleşme`,
      mismatches
    );
    return { state: 'nok', score, comboId: combo.id, mismatches };
  }

  // Hiçbir combo eleman sayısıyla eşleşmedi
  console.warn('[Combo] Hiçbir combo eleman sayısıyla eşleşmedi → NOK');
  return { state: 'nok', score: 0, comboId: null };
}

export function getCombinations() {
  return validCombinations;
}