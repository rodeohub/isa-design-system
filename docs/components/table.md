# Table

## 1. Metadata
- Status: draft (first version, 0.6.0)
- Source: `components/table.css`, `react/Table.js`
- Origin: extracted from the Slackline Sport Hub (`src/ui/Table`) and adapted
- Live examples: `components/table.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
Rows of comparable data: rankings, results, lists of events or people.

The system provides the look, the markup and the sort buttons. It does not sort, filter or page the data: the project does that (plain code or a library such as TanStack Table) and passes the resulting rows.

Not for: layout, or a list where each item is a small story (use Cards). Not built yet: pagination and filter bar.

## 3. Anatomy
Scrolling wrapper with a border, caption, header row, body rows. Optional: sort buttons in headers, right-aligned number columns, a row header cell that names each row.

## 4. Tokens used
`table.header-bg`, `table.header-fg`, `table.row-hover-bg`, `table.border`, `text.default`, `text.link`, `surface.default`, `radius.lg`, `space.2` to `space.4`, `z.sticky`.

## 5. API
HTML:
- `<div class="isa-table-wrap" role="region" aria-labelledby="caption-id" tabindex="0">` around `<table class="isa-table">` with a `<caption id="caption-id">`.
- Header cells `<th scope="col">`; the cell naming the row `<th scope="row">`.
- Numbers: class `isa-table__num` on the header and the cells (right-aligned, equal-width digits).
- Sortable column: `<th aria-sort="ascending|descending|none">` containing `<button class="isa-table__sort">Label <svg ...></button>`.
- Modifiers on the table: `isa-table--compact`, `isa-table--sticky-first`.

React: `import { Table } from "isa-design-system/react"`.

| Prop | Type |
| --- | --- |
| `columns` | `{ key, header, align?, sortable?, rowHeader?, render? }[]` |
| `rows` | data objects, already sorted and paged |
| `caption` | names the table (required, or `aria-label`) |
| `captionHidden` | keep the caption for screen readers only |
| `sort`, `onSortChange` | `{ key, direction }`; clicking a sortable header calls `onSortChange` with the next state |
| `rowKey` | `(row, index) => key` |
| `compact`, `stickyFirst` | booleans |

## 6. States
Row hover. Sorted column (dark label, full arrow, arrow turned for descending). Focus on sort buttons and on the scrolling wrapper.

## 7. Accessibility
- Every table has a caption (or label) that says what it shows.
- Use real `<th>` cells with `scope`, so screen readers announce the column and row for each value.
- On phones the table scrolls sideways inside its wrapper. The wrapper is focusable so keyboard users can scroll it. Use `isa-table--sticky-first` when the first column names the row.
- Sort state is on the `<th>` (`aria-sort`), the control is a button with the column name.
- Do not hide columns on phones without another way to reach the data.
- Rows are not clickable as a whole: put a link on the cell that names the row.

## 8. Example
```jsx
<Table caption="Freestyle Highline ranking, women" sort={sort} onSortChange={setSort} rowKey={(r) => r.id}
  columns={[
    { key: "rank", header: "Rank", align: "right", sortable: true },
    { key: "name", header: "Athlete", rowHeader: true, render: (r) => <a href={`/athletes/${r.id}`}>{r.name}</a> },
    { key: "country", header: "Country" },
    { key: "points", header: "Points", align: "right", sortable: true },
  ]}
  rows={sortedRows} />
```
For HTML markup see `components/table.examples.html`.

## 9. Related
Changes from the Sport Hub version: the Sport Hub Table is a full data grid built on TanStack Table (sorting, pagination, filters inside the component); the system Table is presentation only, and the Sport Hub would keep TanStack for the logic and render through this component or its classes. Also new: caption, row headers, `aria-sort` on headers with real buttons, a focusable scroll region, a sticky first column, tabular numbers. Pagination, `TableFilters` and `TableFilterFields` stay in the Sport Hub for now.
