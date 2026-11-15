# Empty state

## 1. Metadata
- Status: draft (first version, 0.8.0)
- Source: `components/empty.css`, `react/EmptyState.js`
- Origin: new in the design system (the Slackline Sport Hub shows plain text or nothing)
- Live examples: `components/empty.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
What people see where a list, table or search result has nothing to show. It says what is empty, why, and what to do next.

Not for: errors (use an Alert), loading (use a Spinner), or a whole page that was not found.

## 3. Anatomy
Optional icon, title, one or two sentences, and at most two actions. By default it has a dashed frame; `isa-empty--plain` removes the frame for use inside a card or the table area.

## 4. Tokens used
`text.default`, `text.muted`, `surface.subtle`, `border.strong`, `radius.lg`, `size.empty-max`, `font.size.2xl`.

## 5. API
HTML: `<div class="isa-empty">` with an optional `<svg aria-hidden="true">`, a heading with `isa-empty__title`, `<p class="isa-empty__text">` and `<div class="isa-empty__actions">` holding buttons.

React: `import { EmptyState } from "@isa/onsight/react"`.

| Prop | Type | Default |
| --- | --- | --- |
| `title` | text | required |
| `titleAs` | `h2` to `h6`: pick the level that fits the page outline | `h3` |
| `children` | the explaining text | |
| `icon` | decorative svg | |
| `actions` | one Button, optionally a second | |
| `plain` | no frame | `false` |

## 6. States
None of its own. The buttons inside have theirs.

## 7. Accessibility
- The title is a real heading. Choose its level so the page outline stays in order.
- The icon is decoration: `aria-hidden="true"`.
- When a list becomes empty after a filter or search, the change must be announced: put the list area in an `aria-live="polite"` region or move focus to the empty state's title.
- Do not use an empty table with only a header row: replace the table with the empty state.

## 8. Example
Wording: say what is missing in plain words ("No events yet"), then the next step. For a search, name what the person can change.
```jsx
<EmptyState title="No athletes match your filters" actions={<Button variant="neutral" onClick={clear}>Clear filters</Button>}>
  Try removing a filter or checking the spelling.
</EmptyState>
```

## 9. Related
Alert: [alert.md](alert.md). Spinner: [spinner.md](spinner.md). Table: [table.md](table.md).
