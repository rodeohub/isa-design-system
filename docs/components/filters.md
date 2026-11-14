# Filters

## 1. Metadata
- Status: draft (first version, 0.9.0)
- Source: `components/filters.css`, `behavior/isa.js` (`initFilters`), `react/Filters.js`
- Origin: extracted from the Slackline Sport Hub (`src/ui/Table/TableFilters.tsx`) and adapted
- Live examples: `components/filters.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
The row of search and filter fields above a table or list. On phones the fields are folded behind a "Filters" button to keep the list in view.

It is layout only: it holds ordinary form fields and does not filter anything itself. The project owns the filter values and passes the filtered rows to the Table.

## 3. Anatomy
A "Filters" button (phones only), the fields in a row that wraps (stacked on phones), and a Reset button at the end. Below it, a line that says how many results are shown.

## 4. Tokens used
`space.4`, `size.filter-min`, `size.filter-max`, and the tokens of the fields and buttons inside.

## 5. API
HTML: `<div class="isa-filters">` with `<button class="isa-button isa-button--neutral isa-filters__toggle" aria-expanded="false" aria-controls="ID">` and `<div class="isa-filters__fields" id="ID" role="group" aria-label="Filter athletes">` holding `isa-field` blocks and a ghost Reset button. `dist/isa.js` makes the toggle work.

React: `import { Filters } from "isa-design-system/react"`.

| Prop | Type | Default |
| --- | --- | --- |
| `label` | name of the group for screen readers | required |
| `children` | the fields: `TextField`, `SelectField`, `Autocomplete` | |
| `onReset` | shows the Reset button and is called by it | |
| `activeCount` | number of filters in use, shown on the phone button: "Filters (2)" | 0 |
| `toggleLabel`, `resetLabel` | texts for translation | `Filters`, `Reset` |
| `defaultOpen` | open on phones from the start | `false` |

## 6. States
Phones: closed, open. From 640px: always open.

## 7. Accessibility
- Every filter is a normal field with a visible label; a placeholder is not a label.
- The toggle has `aria-expanded` and `aria-controls`; the fields are a named group.
- Results update as filters change, so announce the outcome: keep a line such as "Showing 24 of 240 athletes" in an element with `role="status"`. When nothing matches, show an Empty state with a "Clear filters" action.
- A date range is two date fields ("From", "To"), each with its own label.

## 8. Example
```jsx
<Filters label="Filter athletes" onReset={reset} activeCount={count}>
  <TextField label="Name" type="search" value={name} onChange={(e) => setName(e.target.value)} />
  <SelectField label="Discipline" value={discipline} onChange={(e) => setDiscipline(e.target.value)}>...</SelectField>
</Filters>
<p role="status">Showing {rows.length} of {total} athletes</p>
<Table columns={columns} rows={rows} />
```

## 9. Related
Table: [table.md](table.md). Empty state: [empty.md](empty.md). Autocomplete: [autocomplete.md](autocomplete.md). Changes from the Sport Hub version: not tied to TanStack Table (the Sport Hub maps its columns to fields itself); the phone and desktop layouts switch in CSS, without a media query in JavaScript; the Reset button is a ghost button; the phone button shows the number of active filters. Not included yet: the multi-select dropdown with checkboxes (use a Fieldset of checkboxes until it is decided).
