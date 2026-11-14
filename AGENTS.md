# AGENTS.md: ISA Design System

You are working with the design system of the International Slackline Association (ISA). Read this file first. It is short on purpose: open the linked doc for the area you are about to change, not all of them.

## Rules (always)
1. **Use semantic tokens only.** Colors come from `--isa-color-<role>` (or the Tailwind classes built from them, e.g. `bg-action-primary-bg`, `text-text-muted`). Never write hex, rgb or hsl values, and never use primitive tokens (`--isa-color-green-700`) in a project. If no role fits, stop and propose a new role in this repo instead of inventing a value.
2. **WCAG 2.2 AA minimum.** Normal text 4.5:1, large text (24px+ or 18.66px+ bold) and UI parts 3:1, visible focus ring on everything interactive (`border.focus`, or `border.focus-inverse` on dark and brand surfaces), links in text underlined. House rule, stricter than AA: touch targets at least 44px. The roles are pre-checked; mixing roles that are not listed in `tokens/contrast-pairs.json` is not.
3. **Fonts:** Barlow Condensed for headings 20px and up, Barlow for everything else. Body text at least 16px on phones.
4. **Mobile first.** Every screen must work at 360px wide. Many ISA users are on phones.
5. **Native HTML first:** real `<button>`, `<a href>`, `<label>` + `<input>`. No clickable divs.
6. **Reuse before you create.** Check `docs/components/` for an existing component or pattern. Use the `isa-*` classes (or the React components) for buttons, badges, alerts and form fields instead of styling your own. New patterns need a human decision; note them in your PR.
7. **Brand red and green 500 are for logos, large display text and decoration**, not small text or small buttons on white.
8. **Dark mode is not built yet,** but never hard-code light colors: using roles keeps it possible.
9. **Before you say you are done** in a project: run `npx isa-audit <your src folder>` (zero hard-coded colors) and check your UI at 360px.

## Where things are
| Need | File |
| --- | --- |
| Why things are the way they are, open questions | `DECISIONS.md` |
| Color roles, brand colors, category and status colors | `docs/foundations/color.md` |
| Fonts and text styles | `docs/foundations/typography.md` |
| Spacing, radius, breakpoints, layout | `docs/foundations/layout.md` |
| Accessibility rules | `docs/foundations/accessibility.md` |
| Themes and dark mode architecture | `docs/foundations/theming.md` |
| Components: Button, Badge, Alert, form fields (list, how to add more) | `docs/components/README.md` |
| Component styles and live examples | `components/*.css`, `components/*.examples.html` |
| React components | `react/` (`import { Button, Badge, Alert, TextField, ... } from "isa-design-system/react"`) |
| What differs from the Slackline Sport Hub (for its developers) | `docs/sporthub-differences.md` |
| Token sources (edit these) | `tokens/` |
| Built outputs (never edit by hand) | `dist/tokens.css`, `dist/tailwind.css`, `dist/tokens.json`, `dist/fonts.css`, `dist/components.css`, `dist/preview.html` |

## Using it in a project
- Tailwind v4: `@import "isa-design-system/fonts.css"; @import "isa-design-system/tailwind.css"; @import "isa-design-system/components.css" layer(components);`
- Plain CSS: import `dist/fonts.css`, `dist/tokens.css` and `dist/components.css`, then use `var(--isa-color-text-default)` etc.
- Install a tagged version: `npm install github:rodeohub/isa-design-system#v0.4.0` (repo will move to the ISA GitHub organization). Check `CHANGELOG.md` before upgrading.

## Changing the system (in this repo)
1. Edit `tokens/` (DTCG JSON) or `components/`, and the matching doc in `docs/`.
2. Add any new color pairing to `tokens/contrast-pairs.json`.
3. Run `npm run check` (builds `dist/`, fails below AA, audits `components/`) and look at `dist/preview.html`. Commit `dist/` with the change.
4. Record decisions in `DECISIONS.md`. Brand-value changes need Roberto's OK.
5. Releases: bump `version` in package.json (semantic versioning, see `CHANGELOG.md`), add a CHANGELOG entry, then tag `vX.Y.Z` and push the tag.
6. Writing style for docs: plain, concise, no em dashes.
