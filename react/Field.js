// Onsight: form fields (React). Needs @slacklineinternational/onsight/components.css loaded.
// Docs: docs/components/field.md
// Plain controlled or uncontrolled inputs: works with any form library (spread its field props).
import { createElement as h, forwardRef, useId } from 'react';
import { StatusIcon } from './icons.js';

const cx = (...parts) => parts.filter(Boolean).join(' ');

function labelContent(label, optional) {
  return [label, optional ? h('span', { key: 'o', className: 'isa-label__optional' }, typeof optional === 'string' ? ` ${optional}` : ' (optional)') : null];
}
function messages(id, help, error) {
  return {
    helpEl: help ? h('p', { className: 'isa-help', id: `${id}-help` }, help) : null,
    errorEl: error ? h('p', { className: 'isa-error', id: `${id}-error` }, h(StatusIcon, { name: 'danger' }), error) : null,
    describedBy: cx(help && `${id}-help`, error && `${id}-error`) || undefined,
  };
}

function makeField(displayName, renderControl) {
  const Component = forwardRef(function Field({ label, help, error, optional, id, className, 'aria-describedby': describedByProp, ...rest }, ref) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const { helpEl, errorEl, describedBy } = messages(fieldId, help, error);
    const controlProps = {
      ...rest,
      ref,
      id: fieldId,
      'aria-describedby': cx(describedByProp, describedBy) || undefined,
      'aria-invalid': error ? true : rest['aria-invalid'],
    };
    return h(
      'div',
      { className: cx('isa-field', className) },
      h('label', { className: 'isa-label', htmlFor: fieldId }, labelContent(label, optional)),
      helpEl,
      renderControl(controlProps),
      errorEl,
    );
  });
  Component.displayName = displayName;
  return Component;
}

export const TextField = makeField('TextField', ({ type = 'text', ...p }) => h('input', { ...p, type, className: 'isa-input' }));
export const TextArea = makeField('TextArea', ({ rows = 3, ...p }) => h('textarea', { ...p, rows, className: 'isa-input' }));
export const SelectField = makeField('SelectField', ({ children, ...p }) => h('span', { className: 'isa-select' }, h('select', p, children)));

function makeCheck(displayName, type) {
  const Component = forwardRef(function Check({ label, className, children, ...rest }, ref) {
    return h('label', { className: cx('isa-check', className) }, h('input', { ...rest, ref, type }), h('span', null, label ?? children));
  });
  Component.displayName = displayName;
  return Component;
}
export const Checkbox = makeCheck('Checkbox', 'checkbox');
export const Radio = makeCheck('Radio', 'radio');

export const Fieldset = forwardRef(function Fieldset({ legend, help, error, optional, id, className, children, ...rest }, ref) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const { helpEl, errorEl, describedBy } = messages(fieldId, help, error);
  return h(
    'fieldset',
    { ...rest, ref, id: fieldId, className: cx('isa-fieldset', className), 'aria-describedby': describedBy },
    h('legend', { className: 'isa-label' }, labelContent(legend, optional)),
    helpEl,
    children,
    errorEl,
  );
});
