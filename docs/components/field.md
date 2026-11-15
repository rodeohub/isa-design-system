# Form fields

## 1. Metadata
- Status: draft (first version, 0.4.0)
- Source: `components/field.css`, `react/Field.js`
- Origin: extracted from the Slackline Sport Hub (`src/ui/Form`) and adapted
- Live examples: `components/field.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
The parts of a form: label, help text, error text, text input, text area, select, checkbox, radio, and a fieldset that groups checkboxes or radios.

| Need | Use |
| --- | --- |
| Short free text, email, number, date, URL | Text input with the right `type` |
| Long free text | Text area |
| One choice from 5 or more options | Select |
| One choice from 2 to 4 options | Radios in a fieldset |
| Several choices | Checkboxes in a fieldset |
| A single yes/no (consent) | One checkbox |

Not built yet: autocomplete, date picker, file upload, toggle switch. Use native inputs with `isa-input` until they exist.

## 3. Anatomy
Field: label, optional help text, control, optional error text, in that order. Help sits above the control so it is read first and stays visible above a phone keyboard.

## 4. Tokens used
`field.*` (bg, fg, placeholder, border, border-hover, border-invalid, accent, disabled and read-only), `text.default`, `text.muted`, `text.danger`, `border.focus`, `size.touch-target`, `radius.md`, `space.*`.

## 5. API
HTML classes:

| Class | On |
| --- | --- |
| `isa-field` | wrapper `<div>` around one field |
| `isa-label` | `<label>` or `<legend>`; add `<span class="isa-label__optional">(optional)</span>` when optional |
| `isa-help`, `isa-error` | `<p>` with an `id`, linked by `aria-describedby` |
| `isa-input` | `<input>` and `<textarea>` |
| `isa-select` | `<span>` wrapped around a native `<select>` |
| `isa-check` | `<label>` wrapped around a checkbox or radio and its text |
| `isa-fieldset` | `<fieldset>` with a `<legend class="isa-label">` |

React: `import { TextField, TextArea, SelectField, Checkbox, Radio, Fieldset } from "onsight/react"`.

| Component | Own props | Renders |
| --- | --- | --- |
| `TextField`, `TextArea`, `SelectField` | `label` (required), `help`, `error`, `optional` | the whole field, ids and ARIA wired up |
| `Checkbox`, `Radio` | `label` or children | `isa-check` row |
| `Fieldset` | `legend` (required), `help`, `error`, `optional` | group |

All other props go to the native control (`value`, `onChange`, `name`, `required`, `autoComplete`...), so they work with any form library. `optional` accepts a string for translated text.

## 6. States
Default, hover (darker border), focus (ring), invalid (`aria-invalid="true"`: thicker red border plus the error text), disabled, read-only. Checked controls use the ISA green.

## 7. Accessibility
- Every control has a visible label. A placeholder is a hint, never the label.
- Mark the minority: if most fields are required, mark the optional ones with "(optional)" and set `required` on the others. No asterisks without explanation.
- Errors: text with an icon, linked to the control, saying how to fix it ("Enter a full email address, like name@example.org"). Never color alone. Validate when the user leaves the field or submits, not on every key press.
- Inputs are 16px text and at least 44px high; checkbox and radio rows are tappable across their whole width.
- Set `autocomplete` and the right `type` and `inputmode` so phones show the right keyboard and can fill in known data.
- Group related checkboxes or radios in a fieldset with a legend that asks the question.
- One column on phones. Labels above controls, not beside them.

## 8. Example
```html
<div class="isa-field">
  <label class="isa-label" for="email">Email</label>
  <input class="isa-input" id="email" type="email" autocomplete="email"
         aria-invalid="true" aria-describedby="email-error">
  <p class="isa-error" id="email-error"><svg aria-hidden="true" ...></svg> Enter a full email address, like name@example.org.</p>
</div>

<fieldset class="isa-fieldset">
  <legend class="isa-label">Category</legend>
  <label class="isa-check"><input type="radio" name="category" value="women"> <span>Women</span></label>
  <label class="isa-check"><input type="radio" name="category" value="men"> <span>Men</span></label>
</fieldset>
```
```jsx
<TextField label="Email" type="email" autoComplete="email" error={errors.email} {...register("email")} />
<SelectField label="Country" name="country"><option>Switzerland</option></SelectField>
<Fieldset legend="Disciplines">
  <Checkbox name="d" value="freestyle" label="Freestyle Highline" />
  <Checkbox name="d" value="speed" label="Speed Highline" />
</Fieldset>
```

## 9. Related
Buttons at the end of a form: primary submit first, neutral Cancel second ([button.md](button.md)). A failed submit also shows a danger [Alert](alert.md) above the form.

Changes from the Sport Hub version: not tied to Formik (plain props, any form library); inputs 44px high (were 32px) and always 16px text; focus ring instead of a green border; hover no longer turns the border brand green; error text is 14px with an icon and linked by `aria-describedby` (was 12px, color only); help text above the control; native checkbox and radio in ISA green; the select arrow follows the text color. Sport Hub's domain dropdowns (discipline, gender, contest size), the autocomplete and the link list stay in the Sport Hub for now.
