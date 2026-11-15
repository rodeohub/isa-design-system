// Onsight: Alert (React). Needs @slacklineinternational/onsight/components.css loaded.
// Docs: docs/components/alert.md
import { createElement as h, forwardRef } from 'react';
import { StatusIcon } from './icons.js';

const VARIANTS = ['info', 'success', 'warning', 'danger'];

export const Alert = forwardRef(function Alert({ variant = 'info', title, icon = true, role, className, children, ...rest }, ref) {
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && !VARIANTS.includes(variant)) {
    console.error(`[isa] Alert: unknown variant "${variant}". Use one of: ${VARIANTS.join(', ')}.`);
  }
  return h(
    'div',
    {
      ...rest,
      ref,
      // "alert" interrupts screen reader users, so only errors use it by default.
      role: role ?? (variant === 'danger' ? 'alert' : 'status'),
      className: ['isa-alert', variant !== 'info' && `isa-alert--${variant}`, className].filter(Boolean).join(' '),
    },
    icon ? h(StatusIcon, { name: variant }) : null,
    h('div', { className: 'isa-alert__body' }, title ? h('strong', { className: 'isa-alert__title' }, title) : null, children),
  );
});
