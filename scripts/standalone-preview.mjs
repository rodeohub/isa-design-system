// Writes one self-contained preview file (fonts and CSS inlined) for sharing: node scripts/standalone-preview.mjs out.html
import { readFileSync, writeFileSync } from 'node:fs';
const d = 'dist/';
const fonts = readFileSync(d + 'fonts.css', 'utf8').match(/@font-face\s*\{[^}]+\}/g).filter((b) => !b.includes('-latin-ext-'))
  .map((b) => b.replace(/url\(\.\/fonts\/([^)]+)\)/, (_, f) => `url(data:font/woff2;base64,${readFileSync(d + 'fonts/' + f).toString('base64')})`)).join('\n');
const links = '<link rel="stylesheet" href="./fonts.css"><link rel="stylesheet" href="./tokens.css"><link rel="stylesheet" href="./components.css">';
const html = readFileSync(d + 'preview.html', 'utf8');
if (!html.includes(links)) throw new Error('preview.html head changed; update this script.');
writeFileSync(process.argv[2] ?? 'preview-standalone.html', html.replace(links, `<style>${fonts}\n${readFileSync(d + 'tokens.css', 'utf8')}\n${readFileSync(d + 'components.css', 'utf8')}</style>`));
