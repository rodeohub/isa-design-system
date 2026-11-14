// ISA Design System: small behavior script for plain HTML pages (React projects use isa-design-system/react instead).
// Load it once as a module script (type="module") from dist/isa.js, or import { init } from "isa-design-system/isa.js".
// Tabs:   <div class="isa-tabs" role="tablist"> with <button role="tab" aria-controls="panel-id">
// Autocomplete: <div class="isa-autocomplete" data-isa-autocomplete> with an input (role="combobox") and a <ul role="listbox"> of options
// Filters: <button class="isa-filters__toggle" aria-expanded="false"> opens the fields on phones
// Toast:  <button data-isa-toast="Saved" data-isa-toast-variant="success">, or showToast('Saved', { variant: 'success' })
// Tooltip: closes with Escape (showing is done by CSS)
// Dialog and Drawer: <button data-isa-dialog-open="dialog-id">, and inside the dialog <button data-isa-dialog-close>

function selectTab(list, tab, focus) {
  for (const t of list.querySelectorAll('[role="tab"]')) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
    if (panel) panel.hidden = !on;
  }
  if (focus) tab.focus();
  list.dispatchEvent(new CustomEvent('isa:tabchange', { bubbles: true, detail: { tab } }));
}

export function initTabs(root = document) {
  for (const list of root.querySelectorAll('.isa-tabs[role="tablist"]')) {
    if (list.dataset.isaReady) continue;
    list.dataset.isaReady = 'true';
    const enabled = () => [...list.querySelectorAll('[role="tab"]')].filter((t) => !t.disabled && t.getAttribute('aria-disabled') !== 'true');
    const current = list.querySelector('[role="tab"][aria-selected="true"]') ?? enabled()[0];
    if (current) selectTab(list, current, false);
    list.addEventListener('click', (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (tab && enabled().includes(tab)) selectTab(list, tab, false);
    });
    list.addEventListener('keydown', (e) => {
      const tabs = enabled();
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const next = { ArrowRight: tabs[(i + 1) % tabs.length], ArrowLeft: tabs[(i - 1 + tabs.length) % tabs.length], Home: tabs[0], End: tabs[tabs.length - 1] }[e.key];
      if (next) { e.preventDefault(); selectTab(list, next, true); }
    });
  }
}

export function initDialogs(root = document) {
  if (root.isaDialogsReady) return;
  root.isaDialogsReady = true;
  root.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-isa-dialog-open]');
    if (opener) return document.getElementById(opener.dataset.isaDialogOpen)?.showModal();
    if (e.target.closest('[data-isa-dialog-close]')) return e.target.closest('dialog')?.close();
    if (e.target.matches('dialog.isa-dialog, dialog.isa-drawer')) e.target.close(); // click on the dimmed area
  });
}

export function initTooltips(root = document) {
  if (root.isaTooltipsReady) return;
  root.isaTooltipsReady = true;
  const restore = (e) => e.target.closest?.('.isa-tooltip[data-dismissed]')?.removeAttribute('data-dismissed');
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    for (const tip of root.querySelectorAll('.isa-tooltip:hover, .isa-tooltip:focus-within')) tip.dataset.dismissed = 'true';
  });
  // Nudge the tooltip sideways if it would leave the screen.
  const fit = (e) => {
    const content = e.target.closest?.('.isa-tooltip')?.querySelector(':scope > .isa-tooltip__content');
    if (!content) return;
    content.style.setProperty('--isa-tooltip-shift', '0px');
    const rect = content.getBoundingClientRect(), edge = 8, width = document.documentElement.clientWidth;
    const shift = rect.left < edge ? edge - rect.left : rect.right > width - edge ? width - edge - rect.right : 0;
    content.style.setProperty('--isa-tooltip-shift', `${shift}px`);
  };
  root.addEventListener('mouseover', fit);
  root.addEventListener('focusin', fit);
  root.addEventListener('focusout', restore);
  root.addEventListener('mouseout', (e) => { if (!e.relatedTarget || !e.target.closest?.('.isa-tooltip')?.contains(e.relatedTarget)) restore(e); });
}

const TOAST_ICONS = {
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  success: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
  warning: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
  danger: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h.01"/>',
};
const svg = (paths) => `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

// Shows a short message at the bottom of the screen. Returns a function that removes it.
// Errors stay until closed; other toasts leave after `duration` ms (default 6000, paused while hovered or focused).
export function showToast(message, { variant = 'info', title = '', duration, closeLabel = 'Close', regionLabel = 'Notifications' } = {}) {
  let region = document.querySelector('.isa-toast-region');
  if (!region) {
    region = document.createElement('div');
    region.className = 'isa-toast-region';
    region.setAttribute('role', 'region');
    region.setAttribute('aria-label', regionLabel);
    region.setAttribute('aria-live', 'polite');
    document.body.append(region);
  }
  const toast = document.createElement('div');
  toast.className = `isa-toast${variant === 'info' ? '' : ` isa-toast--${variant}`}`;
  if (variant === 'danger') toast.setAttribute('role', 'alert');
  toast.innerHTML = `${svg(TOAST_ICONS[variant] ?? TOAST_ICONS.info)}<div class="isa-toast__body"><strong class="isa-toast__title"></strong><span></span></div><button type="button" class="isa-toast__close">${svg('<path d="M6 6l12 12M18 6L6 18"/>')}</button>`;
  const [titleEl, textEl] = toast.querySelector('.isa-toast__body').children;
  if (title) titleEl.textContent = title; else titleEl.remove();
  textEl.textContent = message; // text only: never HTML from data
  toast.querySelector('.isa-toast__close').setAttribute('aria-label', closeLabel);
  const ms = duration === undefined ? (variant === 'danger' ? 0 : 6000) : duration;
  let timer;
  const remove = () => { clearTimeout(timer); toast.remove(); };
  const start = () => { if (ms > 0) timer = setTimeout(remove, ms); };
  const pause = () => clearTimeout(timer);
  toast.addEventListener('mouseenter', pause);
  toast.addEventListener('focusin', pause);
  toast.addEventListener('mouseleave', start);
  toast.addEventListener('focusout', start);
  toast.querySelector('.isa-toast__close').addEventListener('click', remove);
  region.append(toast);
  start();
  return remove;
}

export function initToasts(root = document) {
  if (root.isaToastsReady) return;
  root.isaToastsReady = true;
  root.addEventListener('click', (e) => {
    const trigger = e.target.closest?.('[data-isa-toast]');
    if (trigger) showToast(trigger.dataset.isaToast, { variant: trigger.dataset.isaToastVariant, title: trigger.dataset.isaToastTitle });
  });
}

// Autocomplete: filters the listed options while typing; arrow keys, Enter and Escape as in the ARIA combobox pattern.
// Fires "isa:select" on the wrapper with detail { value, label }; a hidden input inside receives the value.
export function initAutocompletes(root = document) {
  for (const box of root.querySelectorAll('[data-isa-autocomplete]')) {
    if (box.dataset.isaReady) continue;
    box.dataset.isaReady = 'true';
    const input = box.querySelector('input[role="combobox"]');
    const list = box.querySelector('[role="listbox"]');
    if (!input || !list) continue;
    const empty = box.querySelector('.isa-autocomplete__empty');
    const hidden = box.querySelector('input[type="hidden"]');
    const options = [...list.querySelectorAll('[role="option"]')];
    options.forEach((o, i) => { o.dataset.label = o.textContent.trim(); o.id ||= `${list.id || 'isa-ac'}-${i}`; });
    const visible = () => options.filter((o) => !o.hidden);
    let active = null;
    const setActive = (o) => {
      active?.classList.remove('is-active');
      active = o;
      if (o) { o.classList.add('is-active'); o.scrollIntoView({ block: 'nearest' }); input.setAttribute('aria-activedescendant', o.id); }
      else input.removeAttribute('aria-activedescendant');
    };
    const close = () => { list.hidden = true; if (empty) empty.hidden = true; input.setAttribute('aria-expanded', 'false'); setActive(null); };
    const open = () => {
      const q = input.value.trim().toLowerCase();
      for (const o of options) {
        const label = o.dataset.label;
        const at = q ? label.toLowerCase().indexOf(q) : 0;
        o.hidden = at < 0;
        o.textContent = '';
        if (q && at >= 0) {
          const mark = document.createElement('mark');
          mark.textContent = label.slice(at, at + q.length);
          o.append(label.slice(0, at), mark, label.slice(at + q.length));
        } else o.textContent = label;
      }
      const any = visible().length > 0;
      list.hidden = !any;
      if (empty) empty.hidden = any;
      input.setAttribute('aria-expanded', String(any));
      setActive(null);
    };
    const select = (o) => {
      for (const x of options) x.setAttribute('aria-selected', String(x === o));
      input.value = o.dataset.label;
      if (hidden) hidden.value = o.dataset.value ?? o.dataset.label;
      close();
      box.dispatchEvent(new CustomEvent('isa:select', { bubbles: true, detail: { value: o.dataset.value ?? o.dataset.label, label: o.dataset.label } }));
    };
    input.addEventListener('input', () => { if (hidden) hidden.value = ''; open(); });
    input.addEventListener('click', open);
    input.addEventListener('keydown', (e) => {
      const isOpen = !list.hidden;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) open();
        const v = visible();
        if (!v.length) return;
        const i = v.indexOf(active);
        setActive(e.key === 'ArrowDown' ? v[(i + 1) % v.length] : v[(i - 1 + v.length) % v.length]);
      } else if (e.key === 'Enter' && isOpen && active) { e.preventDefault(); select(active); }
      else if (e.key === 'Escape' && (isOpen || (empty && !empty.hidden))) { e.preventDefault(); close(); }
    });
    list.addEventListener('pointerdown', (e) => e.preventDefault()); // keep focus in the input
    list.addEventListener('click', (e) => { const o = e.target.closest('[role="option"]'); if (o) select(o); });
    input.addEventListener('blur', close);
  }
}

export function initFilters(root = document) {
  for (const toggle of root.querySelectorAll('.isa-filters__toggle')) {
    if (toggle.dataset.isaReady) continue;
    toggle.dataset.isaReady = 'true';
    toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true')));
  }
}

export function init(root = document) { initTabs(root); initDialogs(root); initTooltips(root); initToasts(root); initAutocompletes(root); initFilters(root); }

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
}
