# Color

Source: `tokens/primitive/color.json` (values), `tokens/semantic/themes/light.json` (roles). Preview: `dist/preview.html`.

## Rule
Use roles, not palette values. `var(--isa-color-text-default)`, not `var(--isa-color-gray-700)` and never `#29292A`.

## Roles
| Role | Use for | Not for |
| --- | --- | --- |
| `text.default` | Body text, headings | |
| `text.muted` | Help text, captions, metadata | Anything on brand or dark surfaces |
| `text.link`, `text.link-hover` | Links | Buttons |
| `text.danger` | Error messages next to fields | Large alert backgrounds (use `status.*`) |
| `text.inverse` | Text on `surface.brand`, `surface.inverse`, primary and danger buttons | Light surfaces |
| `surface.default / subtle / muted` | Page, sections, cards, table stripes | |
| `surface.brand` | Header bars, hero bands with inverse text | Large decorative fills behind dark text |
| `border.default` | Dividers, card outlines | Input borders (too light) |
| `border.strong` | Input borders, outlines that must be seen | |
| `border.focus` | Focus ring (2px, 2px offset) | |
| `action.primary-*` | The main action in a view (one per area) | Several equal actions |
| `action.secondary-*` | Other actions | |
| `action.danger-*` | Destructive actions (delete, withdraw); confirm first | |
| `brand.red / green / gray` | Logos, large display text (24px+), illustrations, decoration | Small text, small buttons, icons that carry meaning |

## Status colors
`status.success / danger / warning / info`, each a `-fg` + `-bg` pair, for alerts, toasts and inline messages. Always pair color with an icon or text ("Error: ..."), never color alone.

## Category colors
For badges and tags that sort content (disciplines, contest levels, roles). Separate from brand and status: a red category badge does not mean "error".

Pairs: `category.<name>-fg` on `category.<name>-bg`, names: neutral, brand (ISA green, for ISA-specific badges such as "ISA verified"), red, green, blue, teal, orange, yellow, pink, violet, purple. All pass AA. The category red and green are deliberately different from the ISA red and green used for errors and success.

Which category gets which color is decided per project (for SportHub, in the SportHub code), not here.

Rules: badge text is uppercase, `text-style.badge`, at least 12px; never rely on the color alone (the label always names the category).

## Tailwind class names
Every role is a color in Tailwind under its full name: `bg-action-primary-bg`, `text-status-danger-fg`. Text, surface and border roles also have short forms: `text-muted` (= `text.muted`), `bg-subtle` (= `surface.subtle`), `border-strong` (= `border.strong`). The default Tailwind palette (`bg-red-500`) is removed on purpose.

## Raised surfaces and themes
`surface.raised` is for things that float above the page: dialogs, drawers, menus, elevated cards. In light it equals `surface.default`; in dark it is one step lighter, because shadows hardly show. All roles have a light and a dark value: see [theming.md](theming.md).
