'use client';
// Onsight: Tooltip (React). Needs @isa/onsight/components.css loaded.
// Docs: docs/components/tooltip.md
import { cloneElement, createElement as h, isValidElement, useId, useRef, useState } from 'react';

const infoIcon = h(
  'svg',
  { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
  h('circle', { cx: 12, cy: 12, r: 9 }),
  h('path', { d: 'M12 11v5M12 8h.01' }),
);

export function Tooltip({ content, children, label = 'More information', placement = 'top', align = 'center', className, ...rest }) {
  const id = useId();
  const [dismissed, setDismissed] = useState(false);
  const contentRef = useRef(null);
  // Nudge the tooltip sideways if it would leave the screen.
  const fit = () => {
    const content = contentRef.current;
    if (!content) return;
    content.style.setProperty('--isa-tooltip-shift', '0px');
    const rect = content.getBoundingClientRect(), edge = 8, width = document.documentElement.clientWidth;
    const shift = rect.left < edge ? edge - rect.left : rect.right > width - edge ? width - edge - rect.right : 0;
    content.style.setProperty('--isa-tooltip-shift', `${shift}px`);
  };
  const describedBy = (existing) => [existing, id].filter(Boolean).join(' ');
  // Without children: an info icon button. With children: your own focusable trigger (a button or link).
  const trigger = isValidElement(children)
    ? cloneElement(children, { 'aria-describedby': describedBy(children.props['aria-describedby']) })
    : h('button', { type: 'button', className: 'isa-button isa-button--ghost isa-button--icon isa-button--small', 'aria-label': label, 'aria-describedby': id }, infoIcon);
  const reset = () => setDismissed(false);
  return h(
    'span',
    {
      ...rest,
      className: ['isa-tooltip', placement === 'bottom' && 'isa-tooltip--bottom', align !== 'center' && `isa-tooltip--${align}`, className].filter(Boolean).join(' '),
      'data-dismissed': dismissed ? '' : undefined,
      onKeyDown: (event) => { if (event.key === 'Escape') setDismissed(true); },
      onMouseEnter: fit,
      onFocus: fit,
      onMouseLeave: reset,
      onBlur: reset,
    },
    trigger,
    h('span', { ref: contentRef, className: 'isa-tooltip__content', role: 'tooltip', id }, content),
  );
}
