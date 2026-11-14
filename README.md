# ISA Design System

Design tokens, guidelines and (soon) components for projects of the [International Slackline Association](https://slacklineinternational.org): web apps such as the Slackline Sport Hub, websites and future tools. It is written for people and for AI coding agents (Claude Code and others).

- **Agents:** start with [AGENTS.md](AGENTS.md).
- **People:** start with [DECISIONS.md](DECISIONS.md), then [docs/](docs/).
- **Preview:** open `dist/preview.html` in a browser to see every color role.

## What is in here
- `tokens/`: the source of truth (W3C Design Tokens format). Primitive values (official ISA palette, type, spacing) and semantic roles (text, surface, border, action, status, category).
- `dist/`: generated CSS variables, a Tailwind v4 theme, resolved JSON and a preview page.
- `docs/`: how and when to use each foundation and component.
- `scripts/`: build, contrast check (WCAG AA) and an audit that finds hard-coded colors in a project.

## Commands
```
npm run build   # tokens/ -> dist/
npm run check   # build + fail if any promised color pair is below WCAG AA
node scripts/audit.mjs ../some-project/src   # find hard-coded colors in a project
```
No dependencies; Node 18+.

## Status
Version 0.1: foundations only. Components will be extracted from the Slackline Sport Hub as they prove themselves. Maintainers: Roberto de Oliveira, with Can Sahin and Muhammad Martinez.
