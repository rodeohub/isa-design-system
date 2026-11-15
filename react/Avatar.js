// Onsight: Avatar (React). Needs @isa/onsight/components.css loaded.
// Docs: docs/components/avatar.md
import { createElement as h, forwardRef } from 'react';

const SIZES = { small: 'isa-avatar--small', large: 'isa-avatar--large', xlarge: 'isa-avatar--xlarge' };
export function initials(name = '') {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
}

export const Avatar = forwardRef(function Avatar({ name, src, alt, size = 'medium', square = false, decorative = false, imgProps, className, ...rest }, ref) {
  const label = alt ?? name;
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && !decorative && !label) {
    console.error('[isa] Avatar: give a name (or alt), or set decorative when the name is shown next to it.');
  }
  const className2 = ['isa-avatar', SIZES[size], square && 'isa-avatar--square', className].filter(Boolean).join(' ');
  if (src) return h('span', { ...rest, ref, className: className2 }, h('img', { loading: 'lazy', ...imgProps, src, alt: decorative ? '' : label }));
  return h('span', { ...rest, ref, className: className2, ...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': label }) }, initials(name));
});
