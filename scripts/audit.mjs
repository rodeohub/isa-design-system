#!/usr/bin/env node
// onsight-audit (also available as isa-audit): finds colors in a project that bypass Onsight, the ISA design system.
// Usage: npx onsight-audit <folder>   (exit 1 if anything is found)
// Ignore one line on purpose by adding the comment: isa-audit-ignore <reason>
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const exts = new Set(['.css', '.scss', '.sass', '.less', '.html', '.jsx', '.tsx', '.js', '.ts', '.mjs', '.vue', '.svelte', '.astro', '.php', '.mdx']);
const skipDirs = new Set(['node_modules', '.git', '.next', '.nuxt', '.svelte-kit', 'coverage', 'onsight', '@isa', 'isa-design-system']);
const skipRootDirs = new Set(['dist', 'build', 'out', 'public']);

const twColors = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black';
const twPrefixes = 'bg|text|border|border-[trblxyse]|ring|ring-offset|outline|fill|stroke|from|via|to|divide|placeholder|caret|accent|decoration|shadow';
const named = 'white|black|red|green|blue|yellow|orange|purple|pink|gray|grey|teal|navy|maroon|olive|lime|aqua|fuchsia|silver|crimson|gold|indigo|violet|brown|cyan|magenta|tomato|coral|salmon';

const checks = [
  { name: 'hex color', re: /(?<![\w&#-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b(?![\w-])/g, only: (line) => !/href=|id=|url\(\s*['"]?#|&#/.test(line) },
  { name: 'color function', re: /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(\s*[\d.%]/g },
  { name: 'Tailwind palette class', re: new RegExp(`(?<![\\w-])(?:[\\w-]+:)*(?:${twPrefixes})-(?:${twColors})(?:-\\d{2,3})?(?:\\/\\d+)?(?![\\w-])`, 'g') },
  { name: 'primitive ISA token', re: /--isa-color-(?:red|green|gray|white|black|category-hue)\b[\w-]*/g, only: (line, file) => !file.endsWith('tokens.css') },
  { name: 'named CSS color', re: new RegExp(`(?:color|background(?:-color)?|border(?:-[a-z]+)?-color|fill|stroke|outline-color)\\s*:\\s*['"]?(?:${named})['"]?\\s*[;,}]`, 'gi') },
];

function stripComments(src, ext) {
  // Keep line numbers: replace comment bodies with spaces.
  const blank = (m) => m.replace(/[^\n]/g, ' ');
  let out = src.replace(/\/\*[\s\S]*?\*\//g, blank);
  if (['.html', '.vue', '.svelte', '.astro', '.php', '.mdx'].includes(ext)) out = out.replace(/<!--[\s\S]*?-->/g, blank);
  if (!['.css', '.html'].includes(ext)) out = out.replace(/(^|[^:'"`\\])\/\/[^\n]*/g, (m, p) => p + blank(m.slice(p.length)));
  return out;
}

const findings = [];
function walk(dir, depth = 0) {
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name) || (depth === 0 && skipRootDirs.has(name))) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, depth + 1);
    else if (exts.has(extname(name))) scan(p);
  }
}
function scan(file) {
  const raw = readFileSync(file, 'utf8');
  const rawLines = raw.split('\n');
  stripComments(raw, extname(file)).split('\n').forEach((line, i) => {
    if (rawLines[i]?.includes('isa-audit-ignore')) return;
    for (const c of checks) {
      if (c.only && !c.only(line, file)) continue;
      for (const m of line.matchAll(c.re)) findings.push(`${file.replace(root + '/', '')}:${i + 1}  ${c.name}: ${m[0].trim()}`);
    }
  });
}

if (statSync(root).isDirectory()) walk(root); else scan(root);
if (findings.length) {
  console.log(findings.join('\n'));
  console.error(`\n${findings.length} finding(s). Use semantic tokens: var(--isa-color-<role>) or the Tailwind role classes (see AGENTS.md).`);
  process.exit(1);
}
console.log('onsight-audit: no colors outside the design system.');
