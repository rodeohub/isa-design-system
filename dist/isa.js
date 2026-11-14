// ISA Design System: small behavior script for plain HTML pages (React projects use isa-design-system/react instead).
// Load it once as a module script (type="module") from dist/isa.js, or import { init } from "isa-design-system/isa.js".
// Tabs:   <div class="isa-tabs" role="tablist"> with <button role="tab" aria-controls="panel-id">
// Tooltip: closes with Escape (showing is done by CSS)
// Dialog: <button data-isa-dialog-open="dialog-id">, and inside the dialog <button data-isa-dialog-close>

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
    if (e.target.matches('dialog.isa-dialog')) e.target.close(); // click on the dimmed area
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

export function init(root = document) { initTabs(root); initDialogs(root); initTooltips(root); }

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
}
