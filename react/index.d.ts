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

export interface DrawerProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'onClose'> {
  open: boolean;
  /** Called on Escape, the close button and a click on the dimmed area. */
  onClose: () => void;
  /** Heading of the drawer. Required. */
  title: React.ReactNode;
  /** end = right (default), start = left. */
  side?: 'start' | 'end';
  closeLabel?: string;
}
export declare function Drawer(props: DrawerProps): React.ReactElement;

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Person or organization. Used for the initials and as the text alternative. */
  name?: string;
  /** Photo. Without it the initials are shown. */
  src?: string;
  /** Text alternative, if it should differ from name. */
  alt?: string;
  /** 32, 48 (default), 80 and 120px. */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** For clubs and organizations. */
  square?: boolean;
  /** Set when the name is shown right next to the avatar, so it is not read twice. */
  decorative?: boolean;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;

export interface NavItem { href: string; label: React.ReactNode; current?: boolean; }
export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
  linkAs?: React.ElementType;
  vertical?: boolean;
  onItemClick?: () => void;
  /** Required: names the navigation, e.g. "Main". */
  'aria-label'?: string;
}
export declare function Nav(props: NavProps): React.ReactElement;
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo or product name. */
  brand: React.ReactNode;
  brandHref?: string;
  /** Accessible name of the brand link when the brand is an image, e.g. "Sport Hub home". */
  brandLabel?: string;
  /** Main navigation. Mark the current page with current: true. */
  items?: NavItem[];
  linkAs?: React.ElementType;
  /** Extra controls on the right (user menu, sign in). */
  actions?: React.ReactNode;
  navLabel?: string;
  menuLabel?: string;
  closeLabel?: string;
}
export declare function Header(props: HeaderProps): React.ReactElement;
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  links?: { href: string; label: React.ReactNode }[];
  linkAs?: React.ElementType;
  navLabel?: string;
  /** Small print at the bottom. */
  note?: React.ReactNode;
}
export declare function Footer(props: FooterProps): React.ReactElement;
export declare function SkipLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement;

export interface PaginationLabels { nav: string; previous: string; next: string; previousPage: string; nextPage: string; page: (n: number) => string; }
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current page, starting at 1. */
  page: number;
  pageCount: number;
  /** Buttons: called with the new page. */
  onPageChange?: (page: number) => void;
  /** Links: return the URL of a page. Use when each page has its own URL. */
  getHref?: (page: number) => string;
  linkAs?: React.ElementType;
  /** Pages shown on each side of the current one. Default: 1. */
  siblings?: number;
  /** Texts, for translations. */
  labels?: Partial<PaginationLabels>;
}
export declare function Pagination(props: PaginationProps): React.ReactElement | null;
export declare function pageList(page: number, pageCount: number, siblings?: number): (number | null)[];

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** From the top level down. The last item is the current page and is not a link. */
  items: { href?: string; label: React.ReactNode }[];
  linkAs?: React.ElementType;
}
export declare function Breadcrumbs(props: BreadcrumbsProps): React.ReactElement;

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** What is empty, in plain words: "No events yet". */
  title: React.ReactNode;
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Optional decorative icon (an svg with aria-hidden). */
  icon?: React.ReactNode;
  /** One main action, optionally a second. */
  actions?: React.ReactNode;
  /** No border and background, for use inside a card or table area. */
  plain?: boolean;
}
export declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;

export interface ToastOptions {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  /** Milliseconds before it leaves. Default 6000; danger stays until closed. 0 = stay. */
  duration?: number;
}
export declare function ToastProvider(props: { children?: React.ReactNode; regionLabel?: string; closeLabel?: string }): React.ReactElement;
/** Returns show(message, options), which returns a function that removes the toast. */
export declare function useToast(): (message: React.ReactNode, options?: ToastOptions) => () => void;

export interface AutocompleteOption { value: string; label: string }
export interface AutocompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type' | 'role'> {
  label: React.ReactNode;
  help?: React.ReactNode;
  error?: React.ReactNode;
  optional?: boolean | string;
  options: AutocompleteOption[];
  /** The selected option's value ('' for none). */
  value?: string;
  /** Called when an option is picked, and with ('', null) when the text is changed after a pick. */
  onChange?: (value: string, option: AutocompleteOption | null) => void;
  /** Called on every keystroke: use it to load options from a server, with filter={false}. */
  onInputChange?: (text: string) => void;
  /** Filter options by the typed text. Default true. */
  filter?: boolean;
  noResultsText?: React.ReactNode;
  /** Adds a hidden input with the value, for plain form posts. */
  name?: string;
}
export declare const Autocomplete: React.ForwardRefExoticComponent<AutocompleteProps & React.RefAttributes<HTMLInputElement>>;

export interface FiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Name of the group for screen readers: "Filter athletes". */
  label: string;
  /** Shows a Reset button that calls this. */
  onReset?: () => void;
  /** Number of filters in use, shown on the phone toggle: "Filters (2)". */
  activeCount?: number;
  toggleLabel?: string;
  resetLabel?: string;
  /** Open on phones from the start. */
  defaultOpen?: boolean;
}
export declare function Filters(props: FiltersProps): React.ReactElement;

export declare function Page(props: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
export interface MainProps extends React.HTMLAttributes<HTMLElement> { /** Text width (720px) for articles and forms. */ narrow?: boolean }
export declare const Main: React.ForwardRefExoticComponent<MainProps & React.RefAttributes<HTMLElement>>;
export declare function Container(props: React.HTMLAttributes<HTMLElement> & { narrow?: boolean; as?: React.ElementType }): React.ReactElement;
export declare function PageTitle(props: Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & { title: React.ReactNode }): React.ReactElement;
export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  /** Describe the picture, or "" when it is decoration. */
  alt: string;
  caption?: React.ReactNode;
  /** Show the whole picture instead of cropping it to fill. */
  contain?: boolean;
  imgAs?: React.ElementType;
  imgProps?: Record<string, unknown>;
}
export declare function Hero(props: HeroProps): React.ReactElement;

/** [dark, setDark]. Sets data-theme on <html> and remembers the choice. */
export declare function useTheme(): [boolean, (dark: boolean) => void];
export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Name of the switch, for translation. Default "Dark mode". */
  label?: string;
  /** Show the label next to the icon. Default false (icon only, label for screen readers). */
  showLabel?: boolean;
}
export declare function ThemeToggle(props: ThemeToggleProps): React.ReactElement;
