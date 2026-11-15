# Pagination

## 1. Metadata
- Status: draft (first version, 0.7.0)
- Source: `components/pagination.css`, `react/Pagination.js`
- Origin: extracted from the pagination inside the Slackline Sport Hub table (`src/ui/Table`) and adapted
- Live examples: `components/pagination.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
Moves between pages of a long list or table. Place it below the list, with a line of text above or beside it that says what is shown ("Showing 1 to 10 of 240 athletes").

Not for: lists under about 25 items (show them all), or steps of a process.

## 3. Anatomy
Previous, page numbers (first, last, the current page and its neighbours, gaps shown as "…"), Next. On phones the words "Previous" and "Next" are hidden and the arrows remain.

## 4. Tokens used
`text.default`, `text.muted`, `action.ghost-bg-hover`, `action.disabled-fg`, `selected.fg`, `selected.bg`, `selected.border`, `size.touch-target`, `radius.md`.

## 5. API
HTML: `<nav class="isa-pagination" aria-label="Pagination">` with `<ul class="isa-pagination__list">`; each control is `<button class="isa-pagination__item">` (or `<a href>` when pages have URLs); the current page has `aria-current="page"`; gaps are `<span class="isa-pagination__gap" aria-hidden="true">…</span>`.

React: `import { Pagination } from "@isa/onsight/react"`.

| Prop | Type | Default |
| --- | --- | --- |
| `page` | current page, starting at 1 | required |
| `pageCount` | number of pages | required |
| `onPageChange` | `(page) => void`: renders buttons | |
| `getHref` | `(page) => url`: renders links | |
| `linkAs` | link component | `a` |
| `siblings` | pages shown on each side of the current one | 1 |
| `labels` | texts for translation | English |

Renders nothing when there is only one page. The page size selector ("Show 10, 50, 100") is not part of it: use a Select.

## 6. States
Default, hover, current page (outlined, bold), disabled (Previous on the first page, Next on the last), focus.

## 7. Accessibility
- It is a `<nav>` with a name. Each page control has a full name ("Page 5", "Previous page"), not just a number or an arrow.
- The current page is marked with `aria-current="page"` and by an outline, not color alone.
- Controls are 44px. Use links when the page is part of the URL, so pages can be shared and opened in a new tab.
- After a page change, move focus to the top of the list or announce the new range, so screen reader users know the content changed.

## 8. Example
```jsx
<p>Showing {from} to {to} of {total} athletes</p>
<Table ... rows={pageRows} />
<Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
```

## 9. Related
Table: [table.md](table.md). Changes from the Sport Hub version: a component of its own, no longer inside the table; counts from 1 (TanStack's `pageIndex` starts at 0, so pass `pageIndex + 1`); first and last page are always shown with gaps, replacing the `<<` and `>>` buttons; Previous and Next have words and proper names (were `<` and `>`); 44px controls; the "Show N entries" selector and the "Showing x to y" text are left to the project.
