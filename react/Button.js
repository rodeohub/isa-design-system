// ISA Design System: Button (React). Needs isa-design-system/components.css loaded.
// Docs: docs/components/button.md
import { createElement, forwardRef } from 'react';

const VARIANTS = ['primary', 'secondary', 'neutral', 'ghost', 'danger', 'danger-secondary'];

export const Button = forwardRef(function Button(
  { as, variant = 'primary', size = 'medium', iconOnly = false, fullWidth = false, loading = false, disabled = false, className, type, onClick, children, ...rest },
  ref,
) {
  const Tag = as ?? (rest.href !== undefined ? 'a' : 'button');
  const isNativeButton = Tag === 'button';
  const inactive = disabled || loading;

  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
    if (!VARIANTS.includes(variant)) console.error(`[isa] Button: unknown variant "${variant}". Use one of: ${VARIANTS.join(', ')}.`);
    if (iconOnly && !rest['aria-label'] && !rest['aria-labelledby']) console.error('[isa] Button: iconOnly buttons need an aria-label.');
  }

  const props = {
    ...rest,
    ref,
    className: [
      'isa-button',
      variant !== 'primary' && `isa-button--${variant}`,
      size === 'small' && 'isa-button--small',
      iconOnly && 'isa-button--icon',
      fullWidth && 'isa-button--full',
      className,
    ].filter(Boolean).join(' '),
  };

  if (isNativeButton) {
    props.type = type ?? 'button';
    // A loading button stays focusable (aria-disabled) so keyboard and screen reader users keep their place.
    if (disabled) props.disabled = true;
  } else if (type) {
    props.type = type;
  }
  if (loading) props['aria-busy'] = true;
  if (inactive && !(isNativeButton && disabled)) {
    props['aria-disabled'] = true;
    props.onClick = (event) => event.preventDefault();
    if (!isNativeButton) delete props.href;
  } else if (onClick) {
    props.onClick = onClick;
  }

  return createElement(Tag, props, children);
});
