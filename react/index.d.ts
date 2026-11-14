import type * as React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'neutral' | 'ghost' | 'danger' | 'danger-secondary';
export type ButtonSize = 'medium' | 'small';

export interface ButtonOwnProps {
  /** Visual emphasis. One primary per view area. Default: primary. */
  variant?: ButtonVariant;
  /** small looks 36px high but keeps a 44px tappable area. Default: medium (44px). */
  size?: ButtonSize;
  /** Square button holding only an icon. Requires aria-label. */
  iconOnly?: boolean;
  /** Stretch to the container width (useful on phones). */
  fullWidth?: boolean;
  /** Shows a spinner, sets aria-busy, blocks clicks, keeps focus. Also change the label, e.g. "Saving…". */
  loading?: boolean;
  disabled?: boolean;
  /** Element or component to render, e.g. a router Link. Default: "a" when href is set, otherwise "button". */
  as?: React.ElementType;
  href?: string;
}
export type ButtonProps = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    [prop: string]: unknown;
  };
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>>;

export type BadgeCategoryColor = 'neutral' | 'brand' | 'red' | 'green' | 'blue' | 'teal' | 'orange' | 'yellow' | 'pink' | 'violet' | 'purple';
export type BadgeStatusColor = 'success' | 'danger' | 'warning' | 'info';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Category color (which category gets which color is the project's choice) or a status color. Default: neutral. */
  color?: BadgeCategoryColor | BadgeStatusColor;
  /** soft = tinted background (default). outline = border only, for light surfaces. */
  variant?: 'soft' | 'outline';
}
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
