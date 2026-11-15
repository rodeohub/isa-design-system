'use client';
// Onsight: Dialog (React). Needs @isa/onsight/components.css loaded.
// Docs: docs/components/dialog.md
// Uses the native <dialog>: focus trap, Escape and focus return come from the browser.
import { createElement as h, useEffect, useId, useRef } from 'react';

const closeIcon = h(
  'svg',
  { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' },
  h('path', { d: 'M6 6l12 12M18 6L6 18' }),
);

export function Dialog({ open, onClose, title, actions, closeLabel = 'Close', className, children, ...rest }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const requestClose = () => { if (onClose) onClose(); };

  return h(
    'dialog',
    {
      ...rest,
      ref,
      className: ['isa-dialog', className].filter(Boolean).join(' '),
      'aria-labelledby': titleId,
      onCancel: (event) => { event.preventDefault(); requestClose(); }, // Escape
      onClick: (event) => { if (event.target === ref.current) requestClose(); }, // dimmed area
    },
    open
      ? [
          h(
            'div',
            { key: 'header', className: 'isa-dialog__header' },
            h('h2', { className: 'isa-dialog__title', id: titleId }, title),
            h('button', { type: 'button', className: 'isa-button isa-button--ghost isa-button--icon', 'aria-label': closeLabel, onClick: requestClose }, closeIcon),
          ),
          h('div', { key: 'body', className: 'isa-dialog__body' }, children),
          actions ? h('div', { key: 'footer', className: 'isa-dialog__footer' }, actions) : null,
        ]
      : null,
  );
}
