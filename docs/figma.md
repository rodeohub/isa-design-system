# Figma library

File: [ISA Design System](https://www.figma.com/design/3U795EQvIDPLGrEyHRT7Um) in Roberto's Figma team (created 2026-11-14). It can be moved to another team later.

**The repository is the source. Figma is a mirror** for people who design visually. Never change values in Figma first: change `tokens/` or `components/` here, release, then refresh the Figma file.

## What is in it
- **Variables**
  - `Primitives` (50 colors, hidden from pickers)
  - `Color` (103 roles, mode "Light", each an alias of a primitive, with the CSS variable name as code syntax). A dark theme would be a second mode here.
  - `Layout` (spacing, radius, sizes, border widths and icon sizes in px)
- **Text styles:** Heading/display, h1 to h4; Text/body, body-sm, label, button, badge.
- **Effect styles:** Shadow/md, Shadow/lg.
- **Components** (page "Components"), all bound to the variables:
  - Button (variant, size, state), Badge (color, style), Alert (variant), Text field (state), Select, Checkbox, Radio, Tab (style, selected), Dialog.
  - Card, Table, Spinner (size), Tooltip, Avatar (size, shape), Header, Footer, Drawer.
  - Pagination item (state), Pagination, Breadcrumbs, Empty state, Toast (variant), Autocomplete (shown open), Filters, Page title.

The library matches v0.11.0 (refreshed 2026-11-14). Not yet in it from v0.12.0: the role `surface.raised` and the dark theme. The update was stopped on 2026-11-14 by the daily limit of Figma connector calls on the Starter plan; retry another day. A second mode ("Dark") in a variable collection may need a paid Figma plan: if adding the mode fails, keep Figma light only and say so here.

## What is not in it
- Hover, active, focus and loading states (defined in code; see each component doc).
- Phone layouts (the header with menu button, folded filters) and whole pages as ready-made frames.
- Tokens Figma has no variable type for: opacity, easing, duration, stacking order.
- Logos.

## Refreshing after a release
Ask Claude (with the Figma connector) to "update the ISA Figma library to version X". It compares the variables and components with the repo and changes only what differs. Names in Figma match the token paths (`action/primary-bg` is `color.action.primary-bg`).
