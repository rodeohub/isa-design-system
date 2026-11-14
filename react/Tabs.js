'use client';
// ISA Design System: Tabs (React). Needs isa-design-system/components.css loaded.
// Docs: docs/components/tabs.md
import { createElement as h, useId, useRef, useState } from 'react';

export function Tabs({ tabs, value, defaultValue, onChange, variant = 'underline', size = 'medium', className, panelClassName, ...rest }) {
  const baseId = useId();
  const refs = useRef({});
  const [internal, setInternal] = useState(defaultValue ?? tabs.find((t) => !t.disabled)?.id);
  const selected = value !== undefined ? value : internal;
  const enabled = tabs.filter((t) => !t.disabled);
  const hasPanels = tabs.some((t) => t.content !== undefined);

  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && !rest['aria-label'] && !rest['aria-labelledby']) {
    console.error('[isa] Tabs: give the tab list a name with aria-label or aria-labelledby.');
  }

  const select = (id, focus) => {
    if (value === undefined) setInternal(id);
    if (id !== selected && onChange) onChange(id);
    if (focus && refs.current[id]) refs.current[id].focus();
  };
  const onKeyDown = (event) => {
    const i = enabled.findIndex((t) => t.id === selected);
    const next = {
      ArrowRight: enabled[(i + 1) % enabled.length],
      ArrowLeft: enabled[(i - 1 + enabled.length) % enabled.length],
      Home: enabled[0],
      End: enabled[enabled.length - 1],
    }[event.key];
    if (next) {
      event.preventDefault();
      select(next.id, true);
    }
  };

  const list = h(
    'div',
    {
      ...rest,
      role: 'tablist',
      className: ['isa-tabs', variant === 'pill' && 'isa-tabs--pill', size === 'large' && 'isa-tabs--large', className].filter(Boolean).join(' '),
      onKeyDown,
    },
    tabs.map((tab) =>
      h(
        'button',
        {
          key: tab.id,
          ref: (el) => { refs.current[tab.id] = el; },
          type: 'button',
          role: 'tab',
          id: `${baseId}-tab-${tab.id}`,
          className: 'isa-tab',
          'aria-selected': tab.id === selected,
          'aria-controls': hasPanels ? `${baseId}-panel-${tab.id}` : undefined,
          tabIndex: tab.id === selected ? 0 : -1,
          disabled: tab.disabled || undefined,
          onClick: () => select(tab.id, false),
        },
        tab.label,
      ),
    ),
  );
  if (!hasPanels) return list;
  return h(
    'div',
    null,
    list,
    tabs.map((tab) =>
      h(
        'div',
        {
          key: tab.id,
          role: 'tabpanel',
          id: `${baseId}-panel-${tab.id}`,
          'aria-labelledby': `${baseId}-tab-${tab.id}`,
          className: ['isa-tabpanel', panelClassName].filter(Boolean).join(' '),
          hidden: tab.id !== selected,
          tabIndex: 0,
        },
        tab.content,
      ),
    ),
  );
}
