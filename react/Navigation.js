'use client';
// ISA Design System: Header, Nav, Footer, SkipLink (React). Needs isa-design-system/components.css loaded.
// Docs: docs/components/navigation.md
import { createElement as h, useState } from 'react';
import { Drawer } from './Drawer.js';

const cx = (...parts) => parts.filter(Boolean).join(' ');
const menuIcon = h('svg', { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }, h('path', { d: 'M4 7h16M4 12h16M4 17h16' }));

export function SkipLink({ href = '#main', children = 'Skip to content', ...rest }) {
  return h('a', { ...rest, className: 'isa-skip-link', href }, children);
}

// items: [{ href, label, current? }]. Give the nav a name with aria-label.
export function Nav({ items, linkAs = 'a', vertical = false, onItemClick, className, ...rest }) {
  return h(
    'nav',
    { ...rest, className },
    h(
      'ul',
      { className: cx('isa-nav', vertical && 'isa-nav--vertical') },
      items.map((item) =>
        h('li', { key: item.href }, h(linkAs, { className: 'isa-nav__link', href: item.href, 'aria-current': item.current ? 'page' : undefined, onClick: onItemClick }, item.label)),
      ),
    ),
  );
}

// Brand bar with the main navigation. Below 768px the links move into a drawer behind a menu button.
export function Header({ brand, brandHref = '/', brandLabel, items = [], linkAs = 'a', actions, navLabel = 'Main', menuLabel = 'Menu', closeLabel = 'Close', className, ...rest }) {
  const [open, setOpen] = useState(false);
  const hasNav = items.length > 0;
  return h(
    'header',
    { ...rest, className: cx('isa-header', className), 'data-isa-surface': 'brand' },
    h(linkAs, { className: 'isa-header__brand', href: brandHref, 'aria-label': brandLabel }, brand),
    hasNav ? h(Nav, { items, linkAs, className: 'isa-header__nav', 'aria-label': navLabel }) : null,
    h(
      'div',
      { className: 'isa-header__actions' },
      actions,
      hasNav ? h('button', { type: 'button', className: 'isa-header__menu-button', 'aria-label': menuLabel, 'aria-haspopup': 'dialog', onClick: () => setOpen(true) }, menuIcon) : null,
    ),
    hasNav
      ? h(Drawer, { open, onClose: () => setOpen(false), title: menuLabel, closeLabel }, h(Nav, { items, linkAs, vertical: true, 'aria-label': navLabel, onItemClick: () => setOpen(false) }))
      : null,
  );
}

// links: [{ href, label }]
export function Footer({ links = [], linkAs = 'a', navLabel = 'Footer', note, className, children, ...rest }) {
  return h(
    'footer',
    { ...rest, className: cx('isa-footer', className) },
    links.length
      ? h('nav', { 'aria-label': navLabel }, h('ul', { className: 'isa-footer__links' }, links.map((l) => h('li', { key: l.href }, h(linkAs, { href: l.href }, l.label)))))
      : null,
    children,
    note ? h('p', { className: 'isa-footer__note' }, note) : null,
  );
}
