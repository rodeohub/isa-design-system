# Tooltip

## 1. Metadata
- Status: draft (first version, 0.6.0)
- Source: `components/tooltip.css`, `react/Tooltip.js`, `behavior/isa.js` (Escape and screen-edge fitting for plain HTML)
- Origin: extracted from the Slackline Sport Hub (`src/ui/Tooltip`) and adapted
- Live examples: `components/tooltip.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
A short hint that appears when someone points at or focuses a control. Typical use: an info button next to a label.

Use it rarely. Anything people need in order to complete a task belongs in visible text (help text under a label), because tooltips are hard to discover on phones. Not for: errors, long text, or anything with links or buttons inside.

## 3. Anatomy
Wrapper, trigger (a button or link), dark bubble with one or two short sentences.

## 4. Tokens used
`tooltip.bg`, `tooltip.fg`, `shadow.md`, `radius.sm`, `size.tooltip-max`, `z.tooltip`, `space.2`, `space.3`.

## 5. API
HTML: `<span class="isa-tooltip">` containing the trigger with `aria-describedby="tip-id"` and `<span class="isa-tooltip__content" role="tooltip" id="tip-id">`. Modifiers: `isa-tooltip--bottom`, `isa-tooltip--start`, `isa-tooltip--end`. Showing on hover and focus is pure CSS; `dist/isa.js` adds closing with Escape and keeps the bubble inside the screen.

React: `import { Tooltip } from "@slacklineinternational/onsight/react"` (a client component).

| Prop | Type | Default |
| --- | --- | --- |
| `content` | short text | required |
| `children` | the trigger: one button or link | an info icon button |
| `label` | name of the info icon button | `More information` |
| `placement` | `top`, `bottom` | `top` |
| `align` | `center`, `start`, `end` | `center` |

## 6. States
Hidden; shown on hover and on keyboard focus; closed with Escape until the pointer or focus leaves.

## 7. Accessibility
- The trigger must be focusable (a button or link), so keyboard and touch users can open the tooltip. On touch screens a tap on the info button shows it.
- The tooltip text is linked with `aria-describedby`, so screen readers read it after the control's name. The info button needs its own name that says what the hint is about ("About contest size").
- It stays open while the pointer is over the trigger or the bubble, and closes with Escape (WCAG 1.4.13).
- Each tooltip has its own id.

## 8. Example
```jsx
<Tooltip content="The size sets how many ranking points an event gives." label="About contest size" align="start" />
<Tooltip content="Downloads the ranking as a CSV file." placement="bottom"><Button variant="neutral">Export</Button></Tooltip>
```

## 9. Related
Changes from the Sport Hub version: `position` (`top`, `bottom`, `left`, `right`) became `placement` (`top`, `bottom`) plus `align`; left and right are gone (they do not fit on phones); any button or link can be the trigger, not only the info icon; unique ids (was always `id="tooltip"`); closes with Escape; the pointer can move onto the bubble; the info button is 36px with a 44px tap area and a real name (it had no accessible name); the bubble is nudged sideways to stay on screen instead of flipping.
