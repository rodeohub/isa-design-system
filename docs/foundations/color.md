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

Pairs: `category.<name>-fg` on `category.<name>-bg`, names: neutral, green, red, blue, teal, orange, yellow, pink, purple. All pass AA.

Current SportHub use (proposal, to confirm):
| Category | Color |
| --- | --- |
| Speed Highline | blue |
| Speedline Short | green |
| Freestyle Highline | orange |
| Trickline | red |
| Rigging | purple |
| Roles, age, neutral info | neutral |

Rules: badge text is uppercase, `text-style.badge`, at least 12px; never rely on the color alone (the label always names the category).
