// Tiny DTCG token reader: no dependencies.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export function readJsonTree(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...readJsonTree(p));
    else if (name.endsWith('.json')) out.push(p);
  }
  return out.sort();
}

// Flatten a DTCG tree into { 'color.green.700': { value, type, description } }
export function flatten(obj, prefix = [], inheritedType, acc = {}) {
  const type = obj.$type ?? inheritedType;
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    if (v && typeof v === 'object' && '$value' in v) {
      acc[[...prefix, k].join('.')] = { value: v.$value, type: v.$type ?? type, description: v.$description };
    } else if (v && typeof v === 'object') {
      flatten(v, [...prefix, k], type, acc);
    }
  }
  return acc;
}

export function load(files) {
  const acc = {};
  for (const f of files) flatten(JSON.parse(readFileSync(f, 'utf8')), [], undefined, acc);
  return acc;
}

export function resolve(tokens, value, seen = new Set()) {
  if (typeof value === 'string') {
    const m = value.match(/^\{([^}]+)\}$/);
    if (m) {
      const ref = m[1];
      if (seen.has(ref)) throw new Error(`Circular reference: ${ref}`);
      if (!tokens[ref]) throw new Error(`Unknown token reference: {${ref}}`);
      return resolve(tokens, tokens[ref].value, new Set([...seen, ref]));
    }
  }
  return value;
}

export const cssName = (path) => '--isa-' + path.replace(/\./g, '-');

export function cssValue(v) {
  if (Array.isArray(v)) return v.map((f) => (/\s/.test(f) && !f.includes('-apple') ? `"${f}"` : f)).join(', ');
  return String(v);
}

export function refOrValue(tokens, value) {
  // Keep aliases as var() so themes and overrides cascade.
  if (typeof value === 'string') {
    const m = value.match(/^\{([^}]+)\}$/);
    if (m) {
      if (!tokens[m[1]]) throw new Error(`Unknown token reference: {${m[1]}}`);
      return `var(${cssName(m[1])})`;
    }
  }
  return cssValue(value);
}

// WCAG 2.x contrast
export function luminance(hex) {
  const h = hex.replace('#', '');
  const c = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
