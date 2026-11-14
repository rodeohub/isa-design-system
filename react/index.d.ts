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

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Default: info. danger is announced immediately (role="alert"); the others politely (role="status"). */
  variant?: 'info' | 'success' | 'warning' | 'danger';
  /** Optional bold first line. */
  title?: React.ReactNode;
  /** Show the built-in status icon. Default: true. */
  icon?: boolean;
}
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;

export interface FieldOwnProps {
  /** Visible label. Required: placeholders are not labels. */
  label: React.ReactNode;
  /** Hint shown between label and control. */
  help?: React.ReactNode;
  /** Error message. Sets aria-invalid and links the message to the control. Say how to fix the problem. */
  error?: React.ReactNode;
  /** Marks the field as optional: true shows "(optional)", a string shows that text (for translations). */
  optional?: boolean | string;
}
export type TextFieldProps = FieldOwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof FieldOwnProps>;
export declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;
export type TextAreaProps = FieldOwnProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof FieldOwnProps>;
export declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<HTMLTextAreaElement>>;
export type SelectFieldProps = FieldOwnProps & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof FieldOwnProps>;
export declare const SelectField: React.ForwardRefExoticComponent<SelectFieldProps & React.RefAttributes<HTMLSelectElement>>;

export interface CheckProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible label (or pass children). */
  label?: React.ReactNode;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckProps & React.RefAttributes<HTMLInputElement>>;
export declare const Radio: React.ForwardRefExoticComponent<CheckProps & React.RefAttributes<HTMLInputElement>>;

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** The question the group answers. */
  legend: React.ReactNode;
  help?: React.ReactNode;
  error?: React.ReactNode;
  optional?: boolean | string;
}
export declare const Fieldset: React.ForwardRefExoticComponent<FieldsetProps & React.RefAttributes<HTMLFieldSetElement>>;

export interface TabItem {
  id: string;
  label: React.ReactNode;
  disabled?: boolean;
  /** Panel content. Leave out on all tabs to render only the tab row and show content yourself. */
  content?: React.ReactNode;
}
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabItem[];
  /** Selected tab id (controlled). */
  value?: string;
  /** Initially selected tab id (uncontrolled). Default: the first enabled tab. */
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** underline (default) for page sections, pill for filters and switches. */
  variant?: 'underline' | 'pill';
  size?: 'medium' | 'large';
  /** Class for each panel. */
  panelClassName?: string;
  /** Required: names the tab list for screen readers. */
  'aria-label'?: string;
}
export declare function Tabs(props: TabsProps): React.ReactElement;

export interface DialogProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'onClose'> {
  open: boolean;
  /** Called on Escape, the close button and a click on the dimmed area. Set open to false in it. */
  onClose: () => void;
  /** Heading of the dialog. Required. */
  title: React.ReactNode;
  /** Buttons for the footer: secondary first, main action last. */
  actions?: React.ReactNode;
  /** Label of the close button, for translations. Default: "Close". */
  closeLabel?: string;
}
export declare function Dialog(props: DialogProps): React.ReactElement;

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  /** Heading level of the title. Pick the level that fits the page outline. Default: h3. */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Makes the whole card clickable through a link on the title. */
  href?: string;
  /** Link component for href, e.g. a router Link. Default: "a". */
  linkAs?: React.ElementType;
  /** Image for the media area. alt is required ("" only if purely decorative). */
  image?: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };
  /** Your own media element instead of image (e.g. a framework image component). */
  media?: React.ReactNode;
  /** Small muted line under the title (place, date). */
  meta?: React.ReactNode;
  /** Badges or a button at the bottom. */
  footer?: React.ReactNode;
  /** horizontal puts the media on the left from 640px up. Default: vertical. */
  layout?: 'vertical' | 'horizontal';
  /** Shadow instead of a border. */
  elevated?: boolean;
  /** Wrapper element. Default: article. */
  as?: React.ElementType;
}
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLElement>>;
export declare function CardGrid(props: React.HTMLAttributes<HTMLUListElement>): React.ReactElement;

export interface TableColumn<Row = any> {
  key: string;
  header: React.ReactNode;
  /** right for numbers. */
  align?: 'left' | 'right';
  sortable?: boolean;
  /** Marks the cell that names the row (rendered as a row header). */
  rowHeader?: boolean;
  render?: (row: Row, index: number) => React.ReactNode;
}
export interface TableSort { key: string; direction: 'ascending' | 'descending'; }
export interface TableProps<Row = any> {
  columns: TableColumn<Row>[];
  /** Rows already sorted, filtered and paged by the project. */
  rows: Row[];
  /** Names the table. Required unless aria-label is given. */
  caption?: React.ReactNode;
  /** Keep the caption for screen readers only. */
  captionHidden?: boolean;
  sort?: TableSort;
  onSortChange?: (sort: TableSort) => void;
  rowKey?: (row: Row, index: number) => React.Key;
  compact?: boolean;
  /** Keep the first column visible while scrolling sideways. */
  stickyFirst?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}
export declare function Table<Row = any>(props: TableProps<Row>): React.ReactElement;

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'large';
  /** Text for screen readers. Default: "Loading". */
  label?: string;
  /** Use the surrounding text color (for colored or dark backgrounds). */
  inherit?: boolean;
}
export declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLSpanElement>>;

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** Short plain text. No links or buttons inside. */
  content: React.ReactNode;
  /** The trigger: one button or link. Leave out for an info icon button. */
  children?: React.ReactElement;
  /** Accessible name of the info icon button. Default: "More information". */
  label?: string;
  placement?: 'top' | 'bottom';
  /** Use start or end near the screen edges. */
  align?: 'center' | 'start' | 'end';
}
export declare function Tooltip(props: TooltipProps): React.ReactElement;
