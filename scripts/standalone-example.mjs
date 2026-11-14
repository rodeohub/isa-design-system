// Writes one self-contained copy of an example page (fonts, CSS and script inlined) for sharing:
// node scripts/standalone-example.mjs examples/sporthub-rankings.html out.html
import { readFileSync, writeFileSync } from 'node:fs';
const d = 'dist/';
const fonts = readFileSync(d + 'fonts.css', 'utf8').match(/@font-face\s*\{[^}]+\}/g).filter((b) => !b.includes('-latin-ext-'))
  .map((b) => b.replace(/url\(\.\/fonts\/([^)]+)\)/, (_, f) => `url(data:font/woff2;base64,${readFileSync(d + 'fonts/' + f).toString('base64')})`)).join('\n');
const links = '<link rel="stylesheet" href="../dist/fonts.css"><link rel="stylesheet" href="../dist/tokens.css"><link rel="stylesheet" href="../dist/components.css">';
const script = '<script type="module" src="../dist/isa.js"></script>';
const html = readFileSync(process.argv[2], 'utf8');
if (!html.includes(links) || !html.includes(script)) throw new Error('The example must load the three dist stylesheets and dist/isa.js exactly as in examples/sporthub-rankings.html.');
writeFileSync(process.argv[3], html
  .replace(links, `<style>${fonts}\n${readFileSync(d + 'tokens.css', 'utf8')}\n${readFileSync(d + 'components.css', 'utf8')}</style>`)
  .replace(script, () => `<script type="module">${readFileSync(d + 'isa.js', 'utf8').replace(/^export /gm, '')}</script>`));
