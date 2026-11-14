// ISA Design System: EmptyState (React). Needs isa-design-system/components.css loaded.
// Docs: docs/components/empty.md
import { createElement as h, forwardRef } from 'react';

export const EmptyState = forwardRef(function EmptyState({ title, titleAs = 'h3', icon, actions, plain = false, className, children, ...rest }, ref) {
  return h(
    'div',
    { ...rest, ref, className: ['isa-empty', plain && 'isa-empty--plain', className].filter(Boolean).join(' ') },
    icon,
    h(titleAs, { className: 'isa-empty__title' }, title),
    children ? h('p', { className: 'isa-empty__text' }, children) : null,
    actions ? h('div', { className: 'isa-empty__actions' }, actions) : null,
  );
});
