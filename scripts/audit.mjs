#!/usr/bin/env node
// Scans a project folder for hard-coded colors that should be tokens.
// Usage: node scripts/audit.mjs <folder>   (exit 1 if any are found)
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const root = process.argv[2] ?? '.';
const exts = new Set(['.css', '.scss', '.html', '.jsx', '.tsx', '.js', '.ts', '.vue', '.svelte', '.php']);
const skip = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'tokens', 'assets']);
const pattern = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g;
let count = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (exts.has(extname(name))) {
      readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        if (line.includes('audit-ignore')) return;
        for (const m of line.matchAll(pattern)) {
          if (/^#[0-9a-fA-F]{3,8}$/.test(m[0]) && /href=|url\(|&#/.test(line)) continue;
          count++;
          console.log(`${p}:${i + 1}  ${m[0]}  -> use a semantic token (var(--isa-color-...))`);
        }
      });
    }
  }
}
walk(root);
if (count) { console.error(`\n${count} hard-coded color value(s). Add "audit-ignore" on a line only with a reason.`); process.exit(1); }
console.log('No hard-coded colors found.');
