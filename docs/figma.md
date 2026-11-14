# Figma library

File: [ISA Design System](https://www.figma.com/design/3U795EQvIDPLGrEyHRT7Um) in Roberto's Figma team (created 2026-11-14, from v0.5.0). It can be moved to another team later.

**The repository is the source. Figma is a mirror** for people who design visually. Never change values in Figma first: change `tokens/` or `components/` here, release, then refresh the Figma file.

## What is in it
- **Variables**
  - `Primitives` (50 colors, hidden from pickers)
  - `Color` (94 roles, mode "Light", each an alias of a primitive, with the CSS variable name as code syntax). A dark theme would be a second mode here.
  - `Layout` (spacing, radius, sizes in px)
- **Text styles:** Heading/display, h1 to h4; Text/body, body-sm, label, button, badge.
- **Effect styles:** Shadow/md, Shadow/lg.
- **Components** (page "Components"), all bound to the variables: Button (variant, size, state), Badge (color, style), Alert (variant), Text field (state), Select, Checkbox, Radio, Tab (style, selected), Dialog.

The library is at v0.5.0 and will be refreshed at the end of the project (Roberto, 2026-11-14): the components added in v0.6.0 to v0.8.0 are not in it yet.

## What is not in it
- Hover, active, focus and loading states (defined in code; see each component doc).
- Tab rows and page layouts as ready-made frames.
- Logos.

## Refreshing after a release
Ask Claude (with the Figma connector) to "update the ISA Figma library to version X". It compares the variables and components with the repo and changes only what differs. Names in Figma match the token paths (`action/primary-bg` is `color.action.primary-bg`).
