# Header, navigation and footer

## 1. Metadata
- Status: draft (first version, 0.7.0)
- Source: `components/navigation.css`, `react/Navigation.js`
- Origin: extracted from the Slackline Sport Hub (`src/ui/Navigation`, `src/ui/Footer`) and adapted
- Live examples: `components/navigation.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
The frame of every page: a skip link, the header bar with the main navigation, and the footer.

| Part | Use |
| --- | --- |
| Skip link | First element in `<body>`; lets keyboard users jump to the content |
| Header | Brand on the left, main navigation, optional actions (sign in, user menu) |
| Nav list | The links; also usable on its own for section navigation |
| Footer | Secondary links, small print, optional logo. Green like the header, with white text; use a white (inverse) logo |

Keep the main navigation to about 5 to 7 items. On screens below 768px the links move into a Drawer behind a menu button.

## 3. Anatomy
Header: brand link, navigation list (from 768px), actions, menu button (below 768px). The current page is marked with a darker background, bold text and an underline.

## 4. Tokens used
`surface.brand`, `surface.brand-strong`, `text.inverse`, `border.focus-inverse` (header and footer); `text.default`, `surface.muted`, `selected.fg`, `selected.bg` (nav on light surfaces).

## 5. API
HTML: see `components/navigation.examples.html`.
- `<a class="isa-skip-link" href="#main">Skip to content</a>` and `<main id="main">`.
- `<header class="isa-header" data-isa-surface="brand">` with `isa-header__brand`, `<nav class="isa-header__nav" aria-label="Main">` holding `<ul class="isa-nav">`, `isa-header__actions`, and `<button class="isa-header__menu-button" aria-label="Menu" data-isa-dialog-open="menu-id">` that opens an `isa-drawer` containing the same links as `<ul class="isa-nav isa-nav--vertical">`.
- Links: `<a class="isa-nav__link" href="..." aria-current="page">` on the current page.
- Icon buttons in the header (theme switch, search): `<button class="isa-header__button" aria-label="...">` inside `isa-header__actions`.
- `<footer class="isa-footer">` with `<ul class="isa-footer__links">` and `<p class="isa-footer__note">`.

React: `import { Header, Nav, Footer, SkipLink } from "@isa/onsight/react"` (client components).

| Component | Props |
| --- | --- |
| `Header` | `brand`, `brandHref`, `brandLabel`, `items` (`{ href, label, current }[]`), `linkAs`, `actions`, `navLabel`, `menuLabel`, `closeLabel` |
| `Nav` | `items`, `linkAs`, `vertical`, `aria-label` |
| `Footer` | `links` (`{ href, label }[]`), `linkAs`, `note`, children (logo or extra content) |
| `SkipLink` | `href` (default `#main`), children |

The project decides which item is `current` (for example from the router's path). `Header` renders the phone menu itself.

## 6. States
Links: default, hover, current page, focus. Menu: closed, open (Drawer).

## 7. Accessibility
- Every `<nav>` has a name (`aria-label`: "Main", "Footer"). The same links appear in the bar and in the drawer, but only one of them is visible at a time.
- The current page has `aria-current="page"` and is shown by more than color (bold and underline).
- The switch between bar and menu is done in CSS, so it also works before scripts load and does not flicker.
- The menu button has a name ("Menu"). The drawer closes when a link is followed, and returns focus to the menu button when closed.
- If the brand is an image, give the brand link a name with `brandLabel` ("Sport Hub home").
- Focus rings are white inside the header (`data-isa-surface="brand"`).

## 8. Example
```jsx
<SkipLink />
<Header brand={<Logo />} brandLabel="Sport Hub home" linkAs={Link}
        items={[{ href: "/", label: "Home" }, { href: "/rankings", label: "Rankings", current: path === "/rankings" }]}
        actions={<UserMenu />} />
<main id="main">...</main>
<Footer linkAs={Link} links={[{ href: "/faq", label: "Frequently asked questions" }]} note="International Slackline Association" />
```

## 9. Related
Drawer: [drawer.md](drawer.md). Changes from the Sport Hub version: the navigation items and the logo are props, not hard-coded; bar or menu is chosen by CSS at 768px instead of a script media query at 640px (no disabled placeholder button while loading); the menu icon is an SVG, not the character "☰"; the menu button says "Menu" and no longer points at a `mobile-menu` id that does not exist; the header color is green 700 (the old `#009F9A` gives white text only 3.27:1); the current page is also bold and underlined; the menu drawer has a title and a real focus trap; the footer takes its links as props, its links are underlined, and the logo needs real alt text (was "logo"); new skip link. Sport Hub's UserMenu stays in the Sport Hub and goes into `actions`.
