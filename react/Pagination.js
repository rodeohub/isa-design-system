// Onsight: Pagination (React). Needs @slacklineinternational/onsight/components.css loaded.
// Docs: docs/components/pagination.md
import { createElement as h } from 'react';

const icon = (d) => h('svg', { key: 'icon', 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, h('path', { d }));

// Page numbers to show: first, last, the current page and its neighbours; null marks a gap.
export function pageList(page, pageCount, siblings = 1) {
  const wanted = new Set([1, pageCount]);
  for (let p = page - siblings; p <= page + siblings; p++) if (p >= 1 && p <= pageCount) wanted.add(p);
  const sorted = [...wanted].sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0) {
      const gap = p - sorted[i - 1];
      if (gap === 2) out.push(p - 1);
      else if (gap > 2) out.push(null);
    }
    out.push(p);
  });
  return out;
}

const defaultLabels = { nav: 'Pagination', previous: 'Previous', next: 'Next', previousPage: 'Previous page', nextPage: 'Next page', page: (n) => `Page ${n}` };

// page is 1-based. Give onPageChange (buttons) or getHref (links, when each page has its own URL).
export function Pagination({ page, pageCount, onPageChange, getHref, linkAs = 'a', siblings = 1, labels, className, ...rest }) {
  const L = { ...defaultLabels, ...labels };
  if (pageCount <= 1) return null;
  const item = (target, props, children, key) => {
    const disabled = target < 1 || target > pageCount;
    if (getHref && !disabled) return h('li', { key }, h(linkAs, { ...props, className: 'isa-pagination__item', href: getHref(target) }, children));
    if (getHref) return h('li', { key }, h('span', { ...props, className: 'isa-pagination__item', 'aria-disabled': true }, children));
    return h('li', { key }, h('button', { ...props, type: 'button', className: 'isa-pagination__item', disabled: disabled || undefined, onClick: () => onPageChange && onPageChange(target) }, children));
  };
  return h(
    'nav',
    { 'aria-label': L.nav, ...rest, className: ['isa-pagination', className].filter(Boolean).join(' ') },
    h(
      'ul',
      { className: 'isa-pagination__list' },
      item(page - 1, { 'aria-label': L.previousPage }, [icon('M15 6l-6 6 6 6'), h('span', { key: 'w', className: 'isa-pagination__word' }, L.previous)], 'prev'),
      pageList(page, pageCount, siblings).map((p, i) =>
        p === null
          ? h('li', { key: `gap-${i}` }, h('span', { className: 'isa-pagination__gap', 'aria-hidden': true }, '…'))
          : item(p, { 'aria-label': L.page(p), 'aria-current': p === page ? 'page' : undefined }, String(p), p),
      ),
      item(page + 1, { 'aria-label': L.nextPage }, [h('span', { key: 'w', className: 'isa-pagination__word' }, L.next), icon('M9 6l6 6-6 6')], 'next'),
    ),
  );
}
