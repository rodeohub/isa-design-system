# Onsight: the ISA Design System

"Onsight" is the name of the design system of the International Slackline Association (to onsight a line is to walk it clean on the first try). The repository, the npm package (`isa-design-system`) and the CSS names (`isa-`, `--isa-`) keep their names.

Design tokens, guidelines and (soon) components for projects of the [International Slackline Association](https://slacklineinternational.org): web apps such as the Slackline Sport Hub, websites and future tools. It is written for people and for AI coding agents (Claude Code and others).

- **Agents:** start with [AGENTS.md](AGENTS.md).
- **People:** start with [DECISIONS.md](DECISIONS.md), then [docs/](docs/).
- **Preview:** <https://rodeohub.github.io/isa-design-system/> shows all decisions and every component on one page (the same file as `dist/preview.html`).

## What is in here
- `tokens/`: the source of truth (close to the W3C Design Tokens format, simplified). Primitive values (official ISA palette, type, spacing) and semantic roles (text, surface, border, action, status, category).
- `dist/`: generated CSS variables, a Tailwind v4 theme, resolved JSON and a preview page.
- `components/`, `react/`: component styles (plain CSS), live examples and React wrappers.
- `docs/`: how and when to use each foundation and component.
- `scripts/`: build, contrast check (WCAG AA) and `isa-audit`, which finds colors in a project that bypass the system.
- `fonts/`: Barlow and Barlow Condensed, self-hosted.
- Licence: MIT, except the ISA name and logos (see LICENSE).

## Commands
```
npm run build   # tokens/ -> dist/
npm run check   # build + fail if any promised color pair is below WCAG AA
node scripts/audit.mjs ../some-project/src   # find hard-coded colors in a project
```
No dependencies; Node 18+.

## Status
Version 0.7: foundations plus 14 component families (see `docs/components/README.md`). More are extracted from the Slackline Sport Hub one at a time. Maintainers: Roberto de Oliveira, with Can Sahin and Muhammad Martinez.
