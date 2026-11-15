// Onsight: Card and CardGrid (React). Needs @slacklineinternational/onsight/components.css loaded.
// Docs: docs/components/card.md
import { createElement as h, forwardRef } from 'react';

const cx = (...parts) => parts.filter(Boolean).join(' ');

export const Card = forwardRef(function Card(
  { title, titleAs = 'h3', href, linkAs, image, media, meta, footer, layout = 'vertical', elevated = false, as = 'article', className, children, ...rest },
  ref,
) {
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && image && image.alt === undefined) {
    console.error('[isa] Card: image needs alt text (use alt="" only for a purely decorative image).');
  }
  const mediaContent = media ?? (image ? h('img', { loading: 'lazy', ...image }) : null);
  const titleContent = href ? h(linkAs ?? 'a', { className: 'isa-card__link', href }, title) : title;
  return h(
    as,
    { ...rest, ref, className: cx('isa-card', layout === 'horizontal' && 'isa-card--horizontal', elevated && 'isa-card--elevated', className) },
    mediaContent ? h('div', { className: 'isa-card__media' }, mediaContent) : null,
    h(
      'div',
      { className: 'isa-card__body' },
      title ? h(titleAs, { className: 'isa-card__title' }, titleContent) : null,
      meta ? h('p', { className: 'isa-card__meta' }, meta) : null,
      children,
      footer ? h('div', { className: 'isa-card__footer' }, footer) : null,
    ),
  );
});

// Renders a list: each child is wrapped in <li>.
export function CardGrid({ className, children, ...rest }) {
  const items = Array.isArray(children) ? children.flat() : [children];
  return h('ul', { ...rest, className: cx('isa-card-grid', className) }, items.filter(Boolean).map((child, i) => h('li', { key: child.key ?? i }, child)));
}
