// Compiles dist/tailwind.css with the real Tailwind v4 and checks that the documented classes produce CSS.
// Needs tailwindcss and @tailwindcss/cli installed (CI installs them; they are not dependencies of the system).
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dir = mkdtempSync(join(process.cwd(), '.tw-test-'));
try {
  const classes = 'bg-action-primary-bg text-text-muted text-muted bg-subtle border border-strong p-4 rounded-md md:p-8 font-heading text-lg type-h1 type-body ease-standard bg-red-500 text-slate-700';
  writeFileSync(join(dir, 'sample.html'), `<div class="${classes}"></div>`);
  writeFileSync(join(dir, 'in.css'), `@import "tailwindcss" source(none);\n@import "${resolve('dist/tailwind.css')}";\n@source "./sample.html";\n`);
  execFileSync(resolve('node_modules/.bin/tailwindcss'), ['-i', join(dir, 'in.css'), '-o', join(dir, 'out.css')], { stdio: 'pipe' });
  const out = readFileSync(join(dir, 'out.css'), 'utf8');
  const has = (text, why) => assert.ok(out.includes(text), `${why}: expected "${text}" in the compiled CSS`);
  has('.bg-action-primary-bg', 'role color as background');
  has('.text-text-muted', 'long text color name');
  has('.text-muted', 'short text color name');
  has('.bg-subtle', 'short surface name');
  has('.border-strong', 'short border name');
  has('.type-h1', 'text style utility');
  has('.type-body', 'text style utility');
  has('.ease-standard', 'easing');
  has('48rem', 'md breakpoint is a literal value');
  assert.ok(!out.includes('.bg-red-500') && !out.includes('.text-slate-700'), 'the default Tailwind palette must not be available');
  console.log('Tailwind: compiles, roles and text styles available, default palette removed.');
} finally {
  rmSync(dir, { recursive: true, force: true });
}
