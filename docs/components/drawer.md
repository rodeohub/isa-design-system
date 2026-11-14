# Drawer

## 1. Metadata
- Status: draft (first version, 0.7.0)
- Source: `components/drawer.css`, `react/Drawer.js`, `behavior/isa.js` (plain HTML)
- Origin: extracted from the Slackline Sport Hub (`src/ui/Drawer`) and adapted
- Live examples: `components/drawer.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
A panel that slides in from the side over the page. Used for the navigation menu on phones and for secondary tasks such as filters.

Not for: confirmations or short forms that need an answer (use a Dialog), or content that should stay visible next to the page (use the page layout).

## 3. Anatomy
Dimmed backdrop; panel with a header (title and close button) and a scrolling body. 320px wide, never wider than the screen minus 48px so the page stays visible behind it.

## 4. Tokens used
`surface.default`, `text.default`, `border.default`, `overlay.backdrop`, `shadow.lg`, `size.drawer-max`, `space.*`.

## 5. API
HTML: a native `<dialog class="isa-drawer" id="..." aria-labelledby="title-id">` with `isa-drawer__header` (an `<h2 class="isa-drawer__title">` and a close button) and `isa-drawer__body`. `isa-drawer--start` opens on the left. Open and close exactly like a Dialog: `data-isa-dialog-open="id"`, `data-isa-dialog-close`, or `showModal()` and `close()`.

React: `import { Drawer } from "isa-design-system/react"` (a client component).

| Prop | Type | Default |
| --- | --- | --- |
| `open` | boolean | required |
| `onClose` | called on Escape, the close button and a click on the backdrop | required |
| `title` | heading text | required |
| `side` | `end` (right), `start` (left) | `end` |
| `closeLabel` | label of the close button | `Close` |

## 6. States
Closed, open.

## 7. Accessibility
Same as Dialog: focus stays inside, Escape closes, the page behind is inert and does not scroll, focus returns to the opener. The title names the drawer. Close the drawer when a navigation link inside it is followed.

## 8. Example
```jsx
<Drawer open={open} onClose={() => setOpen(false)} title="Filters">
  <Fieldset legend="Disciplines">...</Fieldset>
</Drawer>
```

## 9. Related
The Header uses a Drawer for the phone menu ([navigation.md](navigation.md)). Changes from the Sport Hub version: built on the native `<dialog>` (the old one had no focus trap, no dialog role and no name); `isOpen` is `open`; `position` (`left`, `right`, `top`, `bottom`) became `side` (`start`, `end`), top and bottom are gone; default side is right (was left); a header with title and close button is built in.
