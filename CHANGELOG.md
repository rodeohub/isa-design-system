# Changelog

Versions follow semantic versioning: MAJOR for changes that can break projects (a role renamed or removed), MINOR for new roles, tokens or docs, PATCH for fixes. Projects install a tagged version, e.g. `npm install github:rodeohub/isa-design-system#v0.3.0`, and upgrade on purpose.

## 0.3.0 (2026-11-14)
- First components, extracted from the Slackline Sport Hub and adapted: **Button** and **Badge**. Plain CSS in `dist/components.css` (classes `isa-button`, `isa-badge`) and React wrappers in `isa-design-system/react`.
- New button roles: neutral, ghost, danger-secondary, and active states. New token `size.control-sm`.
- `dist/preview.html` now shows live component examples.
- 60 more contrast pairs checked (button states, badges on light surfaces).
- `npm run check` also audits `components/`; `npm run test:react` checks the React output.

## 0.2.0 (2026-11-14)
- Green 600 changed to `#00827E` (AA with white text). Primary buttons use green 600; links stay green 700.
- Badge (category) colors: new red and green, different from the ISA red and green used for errors and success; added violet; added `brand` (ISA green) for ISA-specific badges.
- Focus ring for dark and brand surfaces: `border.focus-inverse`.
- Fonts are self-hosted: files ship in `dist/fonts/`, no requests to Google.
- `isa-audit` (run with `npx isa-audit <folder>`) now also finds Tailwind palette classes, named colors, modern color functions and primitive tokens, and ignores comments.
- Tailwind breakpoints fixed (they did not work in 0.1.0).
- LICENSE added: MIT, excluding the ISA name and logos; fonts under the SIL Open Font License.
- Accessibility wording corrected (AA vs house rules).

## 0.1.0 (2026-11-14)
- First version: official ISA palette, Barlow Condensed and Barlow, semantic color roles, contrast check, audit script, docs and agent instructions.
