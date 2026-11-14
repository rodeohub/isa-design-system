// ISA Design System: page layout (React). Needs isa-design-system/components.css loaded.
// Docs: docs/components/page.md
// <SkipLink /> <Page> <Header .../> <Main> <PageTitle title="..."/> ... </Main> <Footer .../> </Page>
import { createElement as h, forwardRef } from 'react';

const cx = (...parts) => parts.filter(Boolean).join(' ');

export function Page({ className, children, ...rest }) {
  return h('div', { ...rest, className: cx('isa-page', className) }, children);
}

// The one <main> of the page, target of the skip link.
export const Main = forwardRef(function Main({ narrow = false, id = 'main', className, children, ...rest }, ref) {
  return h('main', { ...rest, ref, id, className: cx('isa-main', narrow && 'isa-main--narrow', className) }, children);
});

export function Container({ narrow = false, as = 'div', className, children, ...rest }) {
  return h(as, { ...rest, className: cx('isa-container', narrow && 'isa-container--narrow', className) }, children);
}

// The page's h1 with optional lead text (children).
export function PageTitle({ title, className, children, ...rest }) {
  return h('div', { ...rest, className: cx('isa-page-title', className) }, h('h1', null, title), children ? h('p', null, children) : null);
}

// imgAs: an image component such as Next's Image. alt="" when the picture is decoration.
export function Hero({ src, alt, caption, contain = false, imgAs = 'img', imgProps, className, ...rest }) {
  return h('figure', { ...rest, className: cx('isa-hero', contain && 'isa-hero--contain', className) }, h(imgAs, { src, alt, ...imgProps }), caption ? h('figcaption', null, caption) : null);
}
