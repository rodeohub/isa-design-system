'use client';
// Onsight: Autocomplete (React). Needs @slacklineinternational/onsight/components.css loaded.
// Docs: docs/components/autocomplete.md
import { createElement as h, forwardRef, useEffect, useId, useState } from 'react';
import { StatusIcon } from './icons.js';

const cx = (...parts) => parts.filter(Boolean).join(' ');

function highlight(label, query) {
  const at = query ? label.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (at < 0) return label;
  return [label.slice(0, at), h('mark', { key: 'm' }, label.slice(at, at + query.length)), label.slice(at + query.length)];
}

// options: [{ value, label }]. value: the selected option's value. onChange(value, option) fires on pick ('' when the text is cleared).
// For options loaded from a server: pass onInputChange and filter={false}, and set `options` to the results.
export const Autocomplete = forwardRef(function Autocomplete(
  { label, help, error, optional, options, value = '', onChange, onInputChange, filter = true, noResultsText = 'No matches', name, id, className, onKeyDown, onBlur, 'aria-describedby': describedByProp, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const listId = `${fieldId}-list`;
  const labelOf = (v) => options.find((o) => o.value === v)?.label ?? '';
  const [text, setText] = useState(() => labelOf(value));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  // Follow the value when it changes from outside (a form reset, for example).
  useEffect(() => { setText(labelOf(value)); }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const query = text.trim();
  const shown = filter && query && text !== labelOf(value) ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : options;
  const pick = (option) => { setText(option.label); setOpen(false); setActive(-1); onChange?.(option.value, option); };
  const describedBy = cx(describedByProp, help && `${fieldId}-help`, error && `${fieldId}-error`) || undefined;

  return h(
    'div',
    { className: cx('isa-field', className) },
    h('label', { className: 'isa-label', htmlFor: fieldId }, label, optional ? h('span', { className: 'isa-label__optional' }, typeof optional === 'string' ? ` ${optional}` : ' (optional)') : null),
    help ? h('p', { className: 'isa-help', id: `${fieldId}-help` }, help) : null,
    h(
      'div',
      { className: 'isa-autocomplete' },
      h('input', {
        ...rest,
        ref,
        id: fieldId,
        className: 'isa-input',
        type: 'text',
        role: 'combobox',
        autoComplete: 'off',
        'aria-expanded': open && shown.length > 0,
        'aria-controls': listId,
        'aria-autocomplete': 'list',
        'aria-activedescendant': open && active >= 0 && shown[active] ? `${listId}-${active}` : undefined,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : rest['aria-invalid'],
        value: text,
        onChange: (e) => {
          setText(e.target.value);
          setOpen(true);
          setActive(-1);
          onInputChange?.(e.target.value);
          if (value !== '') onChange?.('', null);
        },
        onClick: () => setOpen(true),
        onBlur: (e) => { setOpen(false); setActive(-1); onBlur?.(e); },
        onKeyDown: (e) => {
          onKeyDown?.(e);
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            setOpen(true);
            if (shown.length) setActive((i) => (e.key === 'ArrowDown' ? (i + 1) % shown.length : (i - 1 + shown.length) % shown.length));
          } else if (e.key === 'Enter' && open && shown[active]) { e.preventDefault(); pick(shown[active]); }
          else if (e.key === 'Escape' && open) { e.preventDefault(); setOpen(false); setActive(-1); }
        },
      }),
      name ? h('input', { type: 'hidden', name, value }) : null,
      h(
        'ul',
        { className: 'isa-autocomplete__list', id: listId, role: 'listbox', 'aria-label': typeof label === 'string' ? label : undefined, hidden: !(open && shown.length > 0), onPointerDown: (e) => e.preventDefault() },
        shown.map((o, i) =>
          h('li', { key: o.value, id: `${listId}-${i}`, role: 'option', 'aria-selected': o.value === value, className: cx('isa-autocomplete__option', i === active && 'is-active'), onClick: () => pick(o) }, highlight(o.label, text === labelOf(value) ? '' : query)),
        ),
      ),
      h('p', { className: 'isa-autocomplete__empty', role: 'status', hidden: !(open && query && shown.length === 0) }, noResultsText),
    ),
    error ? h('p', { className: 'isa-error', id: `${fieldId}-error` }, h(StatusIcon, { name: 'danger' }), error) : null,
  );
});
