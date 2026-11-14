# Button

## 1. Metadata
- Status: draft (first version, 0.3.0)
- Source: `components/button.css`, `react/Button.js` (types in `react/index.d.ts`)
- Origin: extracted from the Slackline Sport Hub (`src/ui/Button`) and adapted
- Live examples: `components/button.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
Use a button for an action: save, register, open a dialog, delete. Use a plain link for navigation inside text.

| Variant | Use for | Limit |
| --- | --- | --- |
| `primary` | The main action of a view or section | One per area |
| `secondary` | Other important actions next to a primary | |
| `neutral` | Low-emphasis actions (Cancel, Back, filters) | |
| `ghost` | Toolbar and icon actions, least emphasis | Light surfaces only |
| `danger` | Destructive actions (delete, withdraw) | Ask for confirmation first |
| `danger-secondary` | A destructive action that is not the main one | |

Do not use a button as a tab, a badge or a link inside a paragraph. Do not put two primary buttons side by side.

## 3. Anatomy
Container, label, optional icon (before or after the label), optional spinner (loading).

## 4. Tokens used
`action.primary-*`, `action.secondary-*`, `action.neutral-*`, `action.ghost-*`, `action.danger-*`, `action.danger-secondary-*`, `action.disabled-*`, `border.focus` / `border.focus-inverse`, `size.touch-target`, `size.control-sm`, `radius.md`, `space.*`, `font.family.body`.

## 5. API
HTML: class `isa-button` plus modifiers.

| Modifier | Effect |
| --- | --- |
| (none) | primary, medium |
| `isa-button--secondary`, `--neutral`, `--ghost`, `--danger`, `--danger-secondary` | variant |
| `isa-button--small` | 36px high, still 44px tappable |
| `isa-button--icon` | square, icon only (needs `aria-label`) |
| `isa-button--full` | full width |

React: `import { Button } from "isa-design-system/react"`.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `primary`, `secondary`, `neutral`, `ghost`, `danger`, `danger-secondary` | `primary` |
| `size` | `medium`, `small` | `medium` |
| `iconOnly` | boolean | false |
| `fullWidth` | boolean | false |
| `loading` | boolean | false |
| `disabled` | boolean | false |
| `href` | string: renders an `<a>` | |
| `as` | element or component, e.g. a router `Link` | `button` |
| `type` | `button`, `submit`, `reset` | `button` |

All other props go to the element. `loading` and disabled links attach a click handler, so use those inside client components.

## 6. States
- Default, hover, active: per variant.
- Focus: 2px ring, 2px offset. Inside `data-isa-surface="brand"` or `"inverse"` the ring is white.
- Disabled: gray, `not-allowed` cursor. Prefer explaining why an action is unavailable over disabling it.
- Loading: `aria-busy="true"` shows a spinner and keeps the variant color. Also set `aria-disabled="true"` and change the label ("Saving…").

## 7. Accessibility
- Always a real `<button>` or `<a href>`. A link that looks like a button stays a link (no `role="button"`).
- Icon-only buttons need `aria-label`; icons inside labelled buttons get `aria-hidden="true"`.
- Minimum tappable size 44px, also for small buttons.
- Labels say what happens ("Register for this event"), not "Click here". Labels may wrap on narrow screens.
- A loading button stays focusable so keyboard users keep their place.

## 8. Example
```html
<button type="button" class="isa-button">Save</button>
<button type="button" class="isa-button isa-button--danger">Withdraw</button>
<a class="isa-button isa-button--secondary" href="/events">All events</a>
<button type="button" class="isa-button isa-button--ghost isa-button--icon" aria-label="Close">
  <svg aria-hidden="true" ...></svg>
</button>
<button type="button" class="isa-button" aria-busy="true" aria-disabled="true">Saving…</button>
```
```jsx
<Button onClick={save}>Save</Button>
<Button variant="danger" loading={busy}>{busy ? "Withdrawing…" : "Withdraw"}</Button>
<Button as={Link} href="/events" variant="secondary">All events</Button>
```

## 9. Related
Changes from the Sport Hub version: `default` is now `neutral`; `destructive` is `danger`; the `icon` variant is `ghost` + icon only; the `tab` variant moved out (it belongs to Tabs); links no longer get `role="button"`; colors follow the AA roles (primary is green 600, danger is red 600); 44px minimum size; visible focus ring; loading state added.
