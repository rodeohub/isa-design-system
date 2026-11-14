// Fails (exit 1) if any promised color pair is below WCAG AA. Checks every theme.
import { readFileSync, readdirSync } from 'node:fs';
import { readJsonTree, load, resolve, contrast } from './lib.mjs';

const { pairs } = JSON.parse(readFileSync('tokens/contrast-pairs.json', 'utf8'));
const base = load([...readJsonTree('tokens/primitive'), ...readJsonTree('tokens/semantic').filter((f) => !f.includes('/themes/'))]);
let failed = 0;
for (const theme of readdirSync('tokens/semantic/themes').filter((f) => f.endsWith('.json'))) {
  const all = { ...base, ...load([`tokens/semantic/themes/${theme}`]) };
  console.log(`\nTheme: ${theme.replace('.json', '')}`);
  for (const [fg, bg, min] of pairs) {
    const r = contrast(resolve(all, all[fg].value), resolve(all, all[bg].value));
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${bg}`);
  }
}
if (failed) { console.error(`\n${failed} pair(s) below WCAG AA.`); process.exit(1); }
console.log('\nAll pairs meet WCAG AA.');
