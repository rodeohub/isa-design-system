# Tabs

## 1. Metadata
- Status: draft (first version, 0.5.0)
- Source: `components/tabs.css`, `react/Tabs.js`, `behavior/isa.js` (plain HTML)
- Origin: extracted from the Slackline Sport Hub (`src/ui/Tab`) and adapted
- Live examples: `components/tabs.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
Tabs switch between views of related content in the same place, without leaving the page.

| Style | Use for |
| --- | --- |
| underline (default) | Sections of a page (Rankings, Events, Athletes) |
| underline, large | The top-level sections of a whole area |
| pill | A filter or switch inside a section (Women, Men, All) |
| links (`<nav>`) | Tabs that go to different pages (URLs) |

Not for: steps that must be done in order (use a stepper, not built yet), more than about 6 items (use a select or a menu), or actions (use buttons).

## 3. Anatomy
Tab list (scrolls sideways on narrow screens), tabs, one panel per tab. The selected tab has a green underline or a green pill outline, and green text.

## 4. Tokens used
`selected.fg`, `selected.bg`, `selected.border`, `text.muted`, `text.default`, `surface.muted`, `border.default`, `action.disabled-fg`, `border.focus`, `size.touch-target`.

## 5. API
HTML:
- `<div class="isa-tabs" role="tablist" aria-label="...">` with `<button class="isa-tab" role="tab" aria-controls="panel-id" aria-selected="true|false">`
- `<div class="isa-tabpanel" role="tabpanel" id="panel-id" aria-labelledby="tab-id" tabindex="0" hidden>`
- Modifiers on the list: `isa-tabs--pill`, `isa-tabs--large`
- Load `dist/isa.js` once: it handles clicks, arrow keys and showing the right panel, and fires an `isa:tabchange` event.
- Page navigation: `<nav class="isa-tabs" aria-label="...">` with `<a class="isa-tab" href="..." aria-current="page">`. No script needed.

React: `import { Tabs } from "isa-design-system/react"` (a client component).

| Prop | Type | Default |
| --- | --- | --- |
| `tabs` | `{ id, label, disabled?, content? }[]` | required |
| `value` / `defaultValue` | selected tab id (controlled / uncontrolled) | first enabled tab |
| `onChange` | `(id) => void` | |
| `variant` | `underline`, `pill` | `underline` |
| `size` | `medium`, `large` | `medium` |
| `aria-label` | name of the tab list | required |

If no tab has `content`, only the tab row is rendered and you show the content yourself.

## 6. States
Default, hover, selected, focus (ring drawn inside the tab), disabled.

## 7. Accessibility
- Keyboard: Tab moves into the list (to the selected tab) and out to the panel; Left and Right arrows move between tabs and select them; Home and End jump to the first and last.
- The tab list needs a name (`aria-label`).
- Selection is shown by an underline or outline plus color, never color alone.
- If tabs change the URL or load a new page, use the links form with `aria-current="page"`, not `role="tab"`.
- On phones the row scrolls sideways; keep labels short (one or two words).

## 8. Example
```html
<div class="isa-tabs" role="tablist" aria-label="Sport Hub sections">
  <button type="button" class="isa-tab" role="tab" id="t-rank" aria-controls="p-rank" aria-selected="true">Rankings</button>
  <button type="button" class="isa-tab" role="tab" id="t-events" aria-controls="p-events">Events</button>
</div>
<div class="isa-tabpanel" role="tabpanel" id="p-rank" aria-labelledby="t-rank" tabindex="0">...</div>
<div class="isa-tabpanel" role="tabpanel" id="p-events" aria-labelledby="t-events" tabindex="0" hidden>...</div>
```
```jsx
<Tabs aria-label="Category" variant="pill" value={category} onChange={setCategory}
      tabs={[{ id: "women", label: "Women" }, { id: "men", label: "Men" }]} />
```

## 9. Related
Changes from the Sport Hub version: `TabGroup` is now `Tabs`; variant `primary` is `underline`, `secondary` is `pill`, `large` is `size="large"`; tabs are no longer a Button variant; full ARIA (`role="tab"`, `aria-selected`, panels) and arrow keys were added (before only the list had a role); 44px tap height; selected color is green 700 (the old brand green was 3.27:1 on white); unselected text is dark gray (was `neutral-500`, 3.28:1); panels can be passed as `content`.
