# Breadcrumbs

## 1. Metadata
- Status: draft (first version, 0.8.0)
- Source: `components/breadcrumbs.css`, `react/Breadcrumbs.js`
- Origin: new in the design system (the Slackline Sport Hub has none)
- Live examples: `components/breadcrumbs.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
Shows where a page sits in the site ("Home > Competitions > Results") and lets people go back up. Place it at the top of `<main>`, above the page title.

Not for: sites with only one or two levels, steps of a process, or the browsing history.

## 3. Anatomy
A row of links from the top level down, separated by small arrows. The last item is the current page: bold, not a link. Long trails wrap to a second line.

## 4. Tokens used
`text.default`, `text.muted`, `text.link`, `text.link-hover`, `border.focus`, `size.touch-target`, `font.size.sm`.

## 5. API
HTML: `<nav class="isa-breadcrumbs" aria-label="Breadcrumb">` with an `<ol>`; each item is `<li><a href>`; the last is `<li><span aria-current="page">`. The separators are drawn by CSS: do not type ">" or "/".

React: `import { Breadcrumbs } from "onsight/react"`.

| Prop | Type | Default |
| --- | --- | --- |
| `items` | `[{ href, label }]`, top level first; the last one is the current page | required |
| `linkAs` | link component (e.g. Next `Link`) | `a` |
| `aria-label` | name of the landmark, for translation | `Breadcrumb` |

## 6. States
Link: default, hover, focus. Current page: no states.

## 7. Accessibility
- It is a `<nav>` with a name and an ordered list, so screen readers announce "Breadcrumb, list, 4 items".
- The current page has `aria-current="page"`.
- Links are underlined and 44px tall.
- On phones the trail wraps. Do not hide the middle levels.

## 8. Example
```jsx
<Breadcrumbs items={[
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Competitions' },
  { label: 'Results' },
]} />
```

## 9. Related
Navigation (header, current page): [navigation.md](navigation.md). Tabs as links for sections of one page: [tabs.md](tabs.md).
