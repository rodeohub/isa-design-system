'use client';
// Onsight: toasts (React). Needs @isa/onsight/components.css loaded.
// Docs: docs/components/toast.md
// Wrap the app once in <ToastProvider>, then: const toast = useToast(); toast('Saved', { variant: 'success' });
import { createContext, createElement as h, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StatusIcon } from './icons.js';

const ToastContext = createContext(null);
const closeIcon = h('svg', { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }, h('path', { d: 'M6 6l12 12M18 6L6 18' }));

function ToastItem({ toast, onRemove, closeLabel }) {
  const timer = useRef(null);
  const ms = toast.duration === undefined ? (toast.variant === 'danger' ? 0 : 6000) : toast.duration;
  const start = useCallback(() => { if (ms > 0) timer.current = setTimeout(() => onRemove(toast.id), ms); }, [ms, onRemove, toast.id]);
  const pause = () => clearTimeout(timer.current);
  useEffect(() => { start(); return pause; }, [start]);
  return h(
    'div',
    {
      className: ['isa-toast', toast.variant !== 'info' && `isa-toast--${toast.variant}`].filter(Boolean).join(' '),
      role: toast.variant === 'danger' ? 'alert' : undefined,
      onMouseEnter: pause, onFocus: pause, onMouseLeave: start, onBlur: start,
    },
    h(StatusIcon, { name: toast.variant }),
    h('div', { className: 'isa-toast__body' }, toast.title ? h('strong', { className: 'isa-toast__title' }, toast.title) : null, h('span', null, toast.message)),
    h('button', { type: 'button', className: 'isa-toast__close', 'aria-label': closeLabel, onClick: () => onRemove(toast.id) }, closeIcon),
  );
}

export function ToastProvider({ children, regionLabel = 'Notifications', closeLabel = 'Close' }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);
  const remove = useCallback((id) => setToasts((list) => list.filter((t) => t.id !== id)), []);
  // Errors stay until closed; other toasts leave after `duration` ms (default 6000).
  const show = useCallback((message, { variant = 'info', title, duration } = {}) => {
    const id = ++nextId.current;
    setToasts((list) => [...list, { id, message, variant, title, duration }]);
    return () => remove(id);
  }, [remove]);
  return h(
    ToastContext.Provider,
    { value: show },
    children,
    // The live region is always in the page, so screen readers announce toasts added to it.
    h('div', { className: 'isa-toast-region', role: 'region', 'aria-label': regionLabel, 'aria-live': 'polite' }, toasts.map((t) => h(ToastItem, { key: t.id, toast: t, onRemove: remove, closeLabel }))),
  );
}

export function useToast() {
  const show = useContext(ToastContext);
  if (!show) throw new Error('[isa] useToast needs a <ToastProvider> around the app.');
  return show;
}
