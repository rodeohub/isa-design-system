# Dialog

## 1. Metadata
- Status: draft (first version, 0.5.0)
- Source: `components/dialog.css`, `react/Dialog.js`, `behavior/isa.js` (plain HTML)
- Origin: extracted from the Slackline Sport Hub (`src/ui/Modal`) and adapted
- Live examples: `components/dialog.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
A window on top of the page that needs an answer before the user continues: confirm a destructive action, or a short form.

Use it sparingly. Not for: long forms or anything with several steps (use a page), information that does not need a decision (use an Alert), or content the user needs to compare with the page behind.

## 3. Anatomy
Dimmed backdrop, panel with a header (title and close button), body (scrolls if long), and an optional footer with the actions.

## 4. Tokens used
`surface.default`, `text.default`, `overlay.backdrop`, `shadow.lg`, `radius.lg`, `size.dialog-max`, `space.*`, plus the Button tokens.

## 5. API
HTML: a native `<dialog class="isa-dialog" id="..." aria-labelledby="title-id">` containing `isa-dialog__header` (with `<h2 class="isa-dialog__title">` and a close button), `isa-dialog__body`, and optionally `isa-dialog__footer`.
- Load `dist/isa.js` once. Open with `<button data-isa-dialog-open="dialog-id">`; close with `data-isa-dialog-close` on any button inside.
- Or call `dialog.showModal()` and `dialog.close()` yourself. Always `showModal()`, never the `open` attribute, otherwise there is no focus trap.

React: `import { Dialog } from "onsight/react"` (a client component).

| Prop | Type | Default |
| --- | --- | --- |
| `open` | boolean | required |
| `onClose` | called on Escape, the close button and a click on the backdrop | required |
| `title` | heading text | required |
| `actions` | footer buttons | none |
| `closeLabel` | label of the close button (for translations) | `Close` |

The content is only rendered while the dialog is open.

## 6. States
Closed, open. On phones (below 640px) the footer buttons are full width, main action on top.

## 7. Accessibility
- The native `<dialog>` keeps focus inside, closes on Escape, makes the page behind inert and returns focus to the button that opened it.
- The title names the dialog (`aria-labelledby`). Write it as the question or task ("Withdraw from Swiss Highline Open?").
- Focus starts on the first focusable element. In a form dialog put `autofocus` on the first field. In a confirmation, the safe choice should come first in the footer.
- Button order in the markup: secondary first, main action last. Label buttons with what they do ("Withdraw", "Keep my place"), not "Yes" and "No".
- Destructive confirmations use the `danger` button and say what will happen and whether it can be undone.
- Do not open a dialog from a dialog.

## 8. Example
```html
<button type="button" class="isa-button isa-button--danger-secondary" data-isa-dialog-open="withdraw">Withdraw from event</button>

<dialog class="isa-dialog" id="withdraw" aria-labelledby="withdraw-title">
  <div class="isa-dialog__header">
    <h2 class="isa-dialog__title" id="withdraw-title">Withdraw from Swiss Highline Open?</h2>
    <button type="button" class="isa-button isa-button--ghost isa-button--icon" aria-label="Close" data-isa-dialog-close>
      <svg aria-hidden="true" ...></svg>
    </button>
  </div>
  <div class="isa-dialog__body"><p>Your place goes to the next athlete on the waiting list. You cannot undo this.</p></div>
  <div class="isa-dialog__footer">
    <button type="button" class="isa-button isa-button--neutral" data-isa-dialog-close>Keep my place</button>
    <button type="button" class="isa-button isa-button--danger">Withdraw</button>
  </div>
</dialog>
```
```jsx
<Dialog open={open} onClose={() => setOpen(false)} title="Edit profile"
        actions={<><Button variant="neutral" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save</Button></>}>
  <TextField label="Display name" autoFocus />
</Dialog>
```

## 9. Related
Changes from the Sport Hub version: `Modal` is now `Dialog` and `isOpen` is `open`; built on the native `<dialog>`, which adds a real focus trap, focus return and an inert background (the old version had `role="dialog"` but focus could leave it, and Escape only worked while focus was inside); `showDefaultActions`, `onSave` and `formRef` are gone, pass your own buttons in `actions`; Cancel is a `neutral` button; the title uses Barlow Condensed at 24px (was 18px Metropolis); body text is 16px (was 14px); the close button is 44px with a "Close" label; the title id is unique per dialog (was always `modal-title`); the page behind no longer scrolls; full-width buttons on phones.
