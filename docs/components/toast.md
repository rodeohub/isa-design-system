# Toast

## 1. Metadata
- Status: draft (first version, 0.8.0)
- Source: `components/toast.css`, `behavior/isa.js` (`showToast`), `react/Toast.js`
- Origin: new in the design system (the Slackline Sport Hub has none)
- Live examples: `components/toast.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
A short message that appears over the page to confirm something that just happened ("Results saved") and leaves by itself.

Not for: anything the person must read or act on (use an Alert in the page or a Dialog), form errors (show them at the field), or long text. A toast never holds the only copy of important information.

## 3. Anatomy
Status icon, optional bold title, message, close button. Toasts stack at the bottom of the screen: full width on phones, bottom right from 640px.

## 4. Tokens used
`status.<info|success|warning|danger>.bg` and `.fg`, `shadow.lg`, `radius.md`, `z.toast`, `size.toast-max`, `size.control-sm`, `size.touch-target`.

## 5. API
Plain HTML, with `dist/isa.js` loaded:
- From a script: `import { showToast } from "@isa/onsight/isa.js"; showToast("Results saved.", { variant: "success" })`.
- Without a script: `<button data-isa-toast="Results saved." data-isa-toast-variant="success">` shows it on click (`data-isa-toast-title` adds a title).

React: wrap the app once in `<ToastProvider>`, then `const toast = useToast(); toast("Results saved.", { variant: "success" })`.

| Option | Type | Default |
| --- | --- | --- |
| `variant` | `info`, `success`, `warning`, `danger` | `info` |
| `title` | bold first line | |
| `duration` | milliseconds until it leaves; 0 = stays | 6000; `danger` stays |
| `closeLabel`, `regionLabel` | texts for translation (props of `ToastProvider` in React) | `Close`, `Notifications` |

Both return a function that removes the toast. In plain HTML the message is inserted as text, never as HTML.

## 6. States
Shown, paused (pointer over it or focus inside: the timer stops), closed. Close button: hover, focus.

## 7. Accessibility
- The toasts live in one region with `aria-live="polite"`, so screen readers read each message when it appears without moving focus. Errors use `role="alert"` and are read at once.
- Errors stay until closed. Other toasts stay at least 6 seconds and pause on hover and focus (WCAG 2.2.1 Timing Adjustable). Longer messages need a longer `duration`.
- No links or buttons inside besides close: the toast may be gone before a keyboard user reaches it. If an action is needed (Undo), also offer it in the page.
- Meaning comes from the icon and the words, not color alone. Text on each status background is pre-checked for AA.

## 8. Example
```jsx
const toast = useToast();
async function save() {
  try { await api.save(data); toast('Results saved.', { variant: 'success' }); }
  catch { toast('Check your connection and try again.', { variant: 'danger', title: 'Could not save' }); }
}
```

## 9. Related
Alert (message that stays in the page): [alert.md](alert.md). Dialog (needs an answer): [dialog.md](dialog.md).
