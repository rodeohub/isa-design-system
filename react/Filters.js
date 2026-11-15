'use client';
// Onsight: Filters (React). Needs @isa/onsight/components.css loaded.
// Docs: docs/components/filters.md
import { createElement as h, useId, useState } from 'react';

const icon = h('svg', { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }, h('path', { d: 'M4 6h16M7 12h10M10 18h4' }));

// children: the filter fields (TextField, SelectField, Autocomplete...). The project owns the filter values.
export function Filters({ children, label, onReset, activeCount = 0, toggleLabel = 'Filters', resetLabel = 'Reset', defaultOpen = false, className, ...rest }) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);
  return h(
    'div',
    { ...rest, className: ['isa-filters', className].filter(Boolean).join(' ') },
    h('button', { type: 'button', className: 'isa-button isa-button--neutral isa-filters__toggle', 'aria-expanded': open, 'aria-controls': id, onClick: () => setOpen(!open) }, icon, activeCount > 0 ? `${toggleLabel} (${activeCount})` : toggleLabel),
    h(
      'div',
      { className: 'isa-filters__fields', id, role: 'group', 'aria-label': label },
      children,
      onReset ? h('button', { type: 'button', className: 'isa-button isa-button--ghost', onClick: onReset }, resetLabel) : null,
    ),
  );
}
