// Onsight: Breadcrumbs (React). Needs @isa/onsight/components.css loaded.
// Docs: docs/components/breadcrumbs.md
import { createElement as h } from 'react';

// items: [{ href, label }] from the top level down; the last item is the current page.
export function Breadcrumbs({ items, linkAs = 'a', className, ...rest }) {
  return h(
    'nav',
    { 'aria-label': 'Breadcrumb', ...rest, className: ['isa-breadcrumbs', className].filter(Boolean).join(' ') },
    h(
      'ol',
      null,
      items.map((item, i) =>
        h('li', { key: item.href ?? i }, i === items.length - 1 ? h('span', { 'aria-current': 'page' }, item.label) : h(linkAs, { href: item.href }, item.label)),
      ),
    ),
  );
}
