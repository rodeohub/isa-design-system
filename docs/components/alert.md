# Alert

## 1. Metadata
- Status: draft (first version, 0.4.0)
- Source: `components/alert.css`, `react/Alert.js`
- Origin: extracted from the Slackline Sport Hub (`src/ui/Alert`) and adapted
- Live examples: `components/alert.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
A message block inside the page that tells people about a state: information, success, a warning, or an error. It stays until the situation changes.

| Variant | Use for |
| --- | --- |
| `info` (default) | Neutral information ("Registration opens on 1 March") |
| `success` | Something worked |
| `warning` | Something needs attention soon, nothing is broken yet |
| `danger` | Something failed or blocks the user |

Not for: an error on a single form field (use the field's `error`), short labels (use a status Badge), or messages that disappear by themselves (a toast, not built yet).

## 3. Anatomy
Container, status icon, body with an optional bold title and the message. Links inside are underlined.

## 4. Tokens used
`status.<variant>-fg` / `-bg`, `radius.md`, `space.3`, `space.4`, `font.size.md`.

## 5. API
HTML: `<div class="isa-alert isa-alert--<variant>" role="status">` with an icon `<svg aria-hidden="true">` and `<div class="isa-alert__body">`. Optional title: `<strong class="isa-alert__title">`.

React: `import { Alert } from "@isa/onsight/react"`.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `info`, `success`, `warning`, `danger` | `info` |
| `title` | text | none |
| `icon` | boolean | true |
| `role` | override the ARIA role | `alert` for danger, `status` otherwise |

## 6. States
Static. No dismiss button yet.

## 7. Accessibility
- The icon and color support the text; the text alone must carry the meaning. Start error messages with what happened and say what to do next.
- `role="alert"` interrupts screen reader users, so only `danger` uses it. The others use `role="status"`.
- An alert that is part of the page from the start (not added after an action) does not need a role in plain HTML.
- After a failed form submit, show one danger alert above the form and the detailed errors on the fields.

## 8. Example
```html
<div class="isa-alert isa-alert--danger" role="alert">
  <svg aria-hidden="true" ...></svg>
  <div class="isa-alert__body">
    <strong class="isa-alert__title">The form could not be saved</strong>
    Check the two fields marked below and try again.
  </div>
</div>
```
```jsx
<Alert variant="success" title="Results submitted">The judges will review them within two days.</Alert>
```

## 9. Related
Field errors: [field.md](field.md). Changes from the Sport Hub version: `error` is now `danger`; the default is `info`, not error; each variant has its own icon (success had none); text is left-aligned; the `SM` size (plain error text) is replaced by the field error; ARIA roles added; colors are the AA status pairs.
