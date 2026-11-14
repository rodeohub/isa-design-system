# Spinner

## 1. Metadata
- Status: draft (first version, 0.6.0)
- Source: `components/spinner.css`, `react/Spinner.js`
- Origin: extracted from the Slackline Sport Hub (`src/ui/Spinner`) and adapted
- Live examples: `components/spinner.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
Shows that something is loading when the wait is longer than about a second and the length is unknown.

| Situation | Use |
| --- | --- |
| A whole section or page is loading | `isa-loading`: spinner with visible text ("Loading rankings…") |
| A small area or inline | the spinner alone, with a screen reader label |
| A button is working | the Button `loading` state, not this component |

Not for: waits under a second (show nothing), or known progress (a progress bar, not built yet).

## 3. Anatomy
A ring with a brand-green arc. Sizes: small 16px, medium 24px, large 40px.

## 4. Tokens used
`spinner.fg` (brand green), `spinner.track`, `size.spinner-sm/md/lg`, `text.muted` (loading text).

## 5. API
HTML: `<span class="isa-spinner" role="status"><span class="isa-visually-hidden">Loading</span></span>`. Modifiers: `isa-spinner--small`, `isa-spinner--large`, `isa-spinner--inherit` (uses the text color, for colored or dark backgrounds).
With text: `<div class="isa-loading" role="status"><span class="isa-spinner" aria-hidden="true"></span> Loading rankings…</div>`.

React: `<Spinner size="small|medium|large" label="Loading" inherit />`.

## 6. States
Always animating. With "reduce motion" switched on it turns slowly instead of stopping, because a still ring would not say anything.

## 7. Accessibility
- `role="status"` with a text label, so screen readers announce it. Translate the label with the rest of the interface.
- Say what is loading when you can ("Loading rankings"), not just "Loading".
- Mark the area that is loading with `aria-busy="true"` while it updates.

## 8. Example
```jsx
{loading ? <Spinner label="Loading rankings" /> : <Table ... />}
```

## 9. Related
Changes from the Sport Hub version: the `color` prop (`primary`, `white`, `neutral`) is replaced by the default brand green and `inherit`; a gray track ring was added; sizes are 16, 24 and 40px (were 16, 20 and 24px); the label can be changed and translated (was fixed to "Loading"); new `isa-loading` block with visible text.
