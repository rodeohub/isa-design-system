# Autocomplete

## 1. Metadata
- Status: draft (first version, 0.9.0)
- Source: `components/autocomplete.css`, `behavior/isa.js` (`initAutocompletes`), `react/Autocomplete.js`
- Origin: extracted from the Slackline Sport Hub (`src/ui/Form/Autocomplete.tsx`) and adapted
- Live examples: `components/autocomplete.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
A text field that suggests matching options while the person types, for picking one item from a long list (a country, an athlete, a club).

Not for: fewer than about 8 options (use a Select or radios), free text with no fixed list (use a text field), or picking several items.

## 3. Anatomy
A form field (label, optional help and error text, input) with a suggestion list that opens under the input. The typed part of each suggestion is bold and underlined. When nothing matches, a "No matches" line shows in place of the list.

## 4. Tokens used
The `field.*` roles of the input, plus `surface.default`, `border.strong`, `text.default`, `text.muted`, `selected.bg`, `selected.border`, `shadow.md`, `z.dropdown`, `size.dropdown-max`, `size.touch-target`.

## 5. API
HTML (needs `dist/isa.js`): inside an `isa-field`, `<div class="isa-autocomplete" data-isa-autocomplete>` holding
- `<input class="isa-input" role="combobox" aria-expanded="false" aria-controls="LIST-ID" aria-autocomplete="list" autocomplete="off">`,
- optionally `<input type="hidden" name="...">`, which receives the picked value,
- `<ul class="isa-autocomplete__list" id="LIST-ID" role="listbox" aria-label="..." hidden>` with `<li class="isa-autocomplete__option" role="option" data-value="...">`,
- `<p class="isa-autocomplete__empty" role="status" hidden>No matches</p>`.

Picking an option fires `isa:select` on the wrapper with `detail: { value, label }`.

React: `import { Autocomplete } from "@slacklineinternational/onsight/react"`. It renders the whole field.

| Prop | Type | Default |
| --- | --- | --- |
| `label` | text | required |
| `options` | `[{ value, label }]` | required |
| `value` | value of the picked option, `''` for none | `''` |
| `onChange` | `(value, option) => void`; called with `('', null)` when the text is edited after a pick | |
| `onInputChange` | `(text) => void`, for loading options from a server | |
| `filter` | filter `options` by the typed text; set `false` when the server filters | `true` |
| `help`, `error`, `optional` | as in the other form fields | |
| `noResultsText` | text for translation | `No matches` |
| `name` | adds a hidden input with the value | |

Other props go to the input (`placeholder`, `disabled`, `required`).

## 6. States
Closed, open, option active (arrow keys or pointer: tinted with a bar on the left), option picked (bold when the list reopens), no matches, plus the input states (focus, invalid, disabled).

## 7. Accessibility
- Follows the ARIA combobox pattern: focus stays in the input; Arrow down and up move through the suggestions; Enter picks; Escape closes; Tab moves on.
- The list opens on typing, click or arrow keys, not on focus alone, so tabbing through a form does not open lists.
- Options are 44px tall. The active option is marked by a bar and background, not color alone.
- The field needs a visible label. The "No matches" line is a status message that screen readers announce.
- The value is only set by picking an option. If the person types and leaves, the value stays empty: validate and show an error on the field.

## 8. Example
```jsx
<Autocomplete label="Country" options={countries} value={country} onChange={setCountry} error={errors.country} />
```

## 9. Related
Form fields: [field.md](field.md). Filters: [filters.md](filters.md). Changes from the Sport Hub version: full keyboard support and ARIA roles (the list was mouse and Tab only); it is a complete field with label and error; the list no longer opens on focus; the match is bold and underlined, not a yellow highlight; a "No matches" message; one component covers the Formik and user variants (pass the form library's value and change handler, or `onInputChange` for server search).
