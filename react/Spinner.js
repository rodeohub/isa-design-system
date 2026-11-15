// Onsight: Spinner (React). Needs onsight/components.css loaded.
// Docs: docs/components/spinner.md
import { createElement as h, forwardRef } from 'react';

export const Spinner = forwardRef(function Spinner({ size = 'medium', label = 'Loading', inherit = false, className, ...rest }, ref) {
  return h(
    'span',
    {
      ...rest,
      ref,
      role: 'status',
      className: ['isa-spinner', size === 'small' && 'isa-spinner--small', size === 'large' && 'isa-spinner--large', inherit && 'isa-spinner--inherit', className].filter(Boolean).join(' '),
    },
    h('span', { className: 'isa-visually-hidden' }, label),
  );
});
