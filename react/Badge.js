// Onsight: Badge (React). Needs @slacklineinternational/onsight/components.css loaded.
// Docs: docs/components/badge.md
import { createElement, forwardRef } from 'react';

const COLORS = ['neutral', 'brand', 'red', 'green', 'blue', 'teal', 'orange', 'yellow', 'pink', 'violet', 'purple', 'success', 'danger', 'warning', 'info'];

export const Badge = forwardRef(function Badge({ color = 'neutral', variant = 'soft', className, children, ...rest }, ref) {
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && !COLORS.includes(color)) {
    console.error(`[isa] Badge: unknown color "${color}". Use one of: ${COLORS.join(', ')}.`);
  }
  return createElement(
    'span',
    {
      ...rest,
      ref,
      className: ['isa-badge', color !== 'neutral' && `isa-badge--${color}`, variant === 'outline' && 'isa-badge--outline', className].filter(Boolean).join(' '),
    },
    children,
  );
});
