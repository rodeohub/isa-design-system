'use client';
// Onsight: theme switch (React). Docs: docs/foundations/theming.md
// <html data-theme="light|dark|system">. The choice is kept in localStorage under "isa-theme".
import { createElement as h, useCallback, useEffect, useState } from 'react';

const KEY = 'isa-theme';
const icon = h('svg', { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, h('circle', { cx: 12, cy: 12, r: 9 }), h('path', { d: 'M12 3v18M12 7l5 -2M12 12h9M12 17l5 2' }));
const readDark = () => { const t = document.documentElement.dataset.theme; return t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches); };

// Returns [dark, setDark]. Reads the saved choice after mount, so server and first client render match.
export function useTheme() {
  const [dark, setDarkState] = useState(false);
  useEffect(() => {
    try { const saved = localStorage.getItem(KEY); if (saved) document.documentElement.dataset.theme = saved; } catch { /* no storage */ }
    setDarkState(readDark());
  }, []);
  const setDark = useCallback((next) => {
    const theme = next ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch { /* storage blocked */ }
    setDarkState(next);
  }, []);
  return [dark, setDark];
}

// A toggle button. In the Header pass it as an action: <Header actions={<ThemeToggle className="isa-header__button" />} />
export function ThemeToggle({ label = 'Dark mode', showLabel = false, className = 'isa-button isa-button--neutral', ...rest }) {
  const [dark, setDark] = useTheme();
  return h('button', { type: 'button', ...rest, className, 'aria-pressed': dark, 'aria-label': showLabel ? undefined : label, onClick: () => setDark(!dark) }, icon, showLabel ? label : null);
}
