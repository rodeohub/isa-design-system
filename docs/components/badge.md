# Badge

## 1. Metadata
- Status: draft (first version, 0.3.0)
- Source: `components/badge.css`, `react/Badge.js` (types in `react/index.d.ts`)
- Origin: extracted from the Slackline Sport Hub (`src/ui/Badge/Badge.tsx`) and adapted
- Live examples: `components/badge.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
A short label that sorts or marks content: a discipline, a contest level, a role, a status. Not interactive. For something clickable use a button; for a removable filter a chip (not built yet).

Which category gets which color is each project's choice. Keep one mapping per project in one place (for example a `disciplineColor` map) so the same category always has the same color.

## 3. Anatomy
Container, label (uppercase, 12px bold), optional icon before the label.

## 4. Tokens used
`category.<name>-fg` / `-bg` (neutral, brand, red, green, blue, teal, orange, yellow, pink, violet, purple), `status.<name>-fg` / `-bg` (success, danger, warning, info), `radius.sm`, `space.1`, `space.2`, `font.size.xs`.

## 5. API
HTML: `<span class="isa-badge isa-badge--<color>">`. Add `isa-badge--outline` for the border-only style.

React: `import { Badge } from "onsight/react"`.

| Prop | Type | Default |
| --- | --- | --- |
| `color` | a category or status name (see Tokens) | `neutral` |
| `variant` | `soft`, `outline` | `soft` |

## 6. States
None. A badge is static.

## 7. Accessibility
- Never color alone: the text names the category or status. Two categories must not differ only by color.
- Write labels in normal case in the HTML ("Speed Highline"); CSS makes them uppercase, so screen readers read words, not letters.
- `outline` is checked for AA on `surface.default`, `surface.subtle` and `surface.muted` only.
- Category red and green are different from the error and success colors on purpose. For a status use the status colors.
- Icons are decorative (`aria-hidden="true"`).

## 8. Example
```html
<span class="isa-badge isa-badge--blue">Speed Highline</span>
<span class="isa-badge isa-badge--danger">Cancelled</span>
<span class="isa-badge isa-badge--brand isa-badge--outline">ISA verified</span>
```
```jsx
<Badge color="blue">Speed Highline</Badge>
<Badge color="brand" variant="outline">ISA verified</Badge>
```

## 9. Related
The Sport Hub wrappers (Discipline, ContestSize, Role, Gender, AgeCategory, Country) stay in the Sport Hub: they hold its own category-to-color mapping and should render this Badge. Changes from the Sport Hub version: `<span>` instead of `<div>`; lower-case color names; AA color pairs; `outline` variant replaces the bordered role and contest-size styles; solid filled badges were dropped.
