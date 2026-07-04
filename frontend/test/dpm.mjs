import { computeScorecard, computeHistory } from '../src/engine/dpMetrics.ts';
for (const lag of ['l1','l3','l4']) {
  const m = computeScorecard(lag);
  console.log(`\n=== ${lag} ===`);
  console.log('accuracy:', m.accuracy.toFixed(1), '| WMAPE:', m.finalWmape.toFixed(1), '| bias:', m.bias.toFixed(1), '| TS:', m.ts.toFixed(2));
  console.log('layer WMAPE:', Object.fromEntries(Object.entries(m.layerWmape).map(([k,v])=>[k,+v.toFixed(1)])));
  console.log('FVA steps:', Object.fromEntries(Object.entries(m.fva).map(([k,v])=>[k,+v.toFixed(1)])), '| vs naive:', m.fvaVsNaive.toFixed(1));
  console.log('over share %:', m.overShare.toFixed(0), '| overInr Cr:', (m.overInr/1e7).toFixed(1), '| underInr Cr:', (m.underInr/1e7).toFixed(1));
  const seg = Object.fromEntries(Object.entries(m.seg).map(([k,c])=>[k, c.n? +c.wmape.toFixed(0): '-']));
  console.log('seg WMAPE:', seg);
}
console.log('\nhistory:', computeHistory().map(h=>`${h.week}:${h.wmape}/${h.overrideFva}`).join('  '));
