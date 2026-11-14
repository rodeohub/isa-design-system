# Figma library

File: [ISA Design System](https://www.figma.com/design/3U795EQvIDPLGrEyHRT7Um) in Roberto's Figma team (created 2026-11-14). It can be moved to another team later.

**The repository is the source. Figma is a mirror** for people who design visually. Never change values in Figma first: change `tokens/` or `components/` here, release, then refresh the Figma file.

## What is in it
- **Variables**
  - `Primitives` (50 colors, hidden from pickers)
  - `Color` (104 roles, mode "Light", each an alias of a primitive, with the CSS variable name as code syntax). A dark theme would be a second mode here.
  - `Layout` (spacing, radius, sizes, border widths and icon sizes in px)
- **Text styles:** Heading/display, h1 to h4; Text/body, body-sm, label, button, badge.
- **Effect styles:** Shadow/md, Shadow/lg.
- **Components** (page "Components"), all bound to the variables:
  - Button (variant, size, state), Badge (color, style), Alert (variant), Text field (state), Select, Checkbox, Radio, Tab (style, selected), Dialog.
  - Card, Table, Spinner (size), Tooltip, Avatar (size, shape), Header, Footer, Drawer.
  - Pagination item (state), Pagination, Breadcrumbs, Empty state, Toast (variant), Autocomplete (shown open), Filters, Page title.

The library matches v0.12.1 in light (updated 2026-11-14), including `surface/raised`. **There is no dark mode in Figma:** the Starter plan allows one mode per variable collection ("Limited to 1 modes only"). No plan upgrade is planned (Roberto, 2026-11-14). If designers need dark in Figma later, without upgrading: add a second collection with the dark values and a page of dark component copies. Until then, check dark mode in `dist/preview.html`.

## What is not in it
- Hover, active, focus and loading states (defined in code; see each component doc).
- Phone layouts (the header with menu button, folded filters) and whole pages as ready-made frames.
- Tokens Figma has no variable type for: opacity, easing, duration, stacking order.
- Logos.

## Refreshing after a release
Ask Claude (with the Figma connector) to "update the ISA Figma library to version X". If the connector reaches its daily call limit (Starter plan), Claude can run the same update through the Figma tab in Chrome. It compares the variables and components with the repo and changes only what differs. Names in Figma match the token paths (`action/primary-bg` is `color.action.primary-bg`).
