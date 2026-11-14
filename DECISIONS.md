# Decisions and open questions

This repo is the final word on brand values (Roberto, 2026-11-14). The vault note "ISA Brand Guidelines" keeps a copy; Roberto tells it when to update.

Agents working with Roberto: raise the open questions with him at the start of a session until they are answered. Other contributors don't need to be asked.

## Decisions
| Date | Decision | By |
| --- | --- | --- |
| 2026-11-14 | Approach: brand tokens are the source; the Slackline Sport Hub is the springboard and first project, not the standard. The system may improve on it and differ from it. | Roberto |
| 2026-11-14 | Scope: many future ISA projects (web apps, websites, phone use). | Roberto |
| 2026-11-14 | Official colors: ISA Red `#E84026`, ISA Green `#009F9A`, ISA Gray `#454546`, with 50 to 900 scales. Projects (incl. SportHub) will be updated to match. | Roberto |
| 2026-11-14 | Accessibility: WCAG 2.2 AA minimum, even where that changes existing choices. | Roberto |
| 2026-11-14 | Fonts: Barlow Condensed (headings) + Barlow (body, UI). No Aller (at most for social media graphics). | Roberto |
| 2026-11-14 | Latin script only; no Persian, Chinese, Japanese or Cyrillic content needed. | Roberto |
| 2026-11-14 | Category colors (badges for disciplines, contest levels, roles) are a separate, documented palette, reusable across projects. | Roberto |
| 2026-11-14 | Dark mode: not now, but the architecture must allow it. | Roberto |
| 2026-11-14 | Logos are SVG files Roberto provides; logo usage rules come later. Main logo: ISA. | Roberto |
| 2026-11-14 | Ignore slacklineinternational.org (may be outdated) for decisions. | Roberto |
| 2026-11-14 | Repo lives on GitHub, public, created as rodeohub/isa-design-system and to be transferred to the International-Slackline-Association organization. Collaborators: Can Sahin (Can-Sahin), Muhammad Martinez (mmrtnz). | Roberto |
| 2026-11-14 | Three token layers (primitive, semantic, component); projects use semantic roles only. Themes are separate semantic files. | Claude, from the decisions above |
| 2026-11-14 | Category colors are a ready-to-use set of pairs. Which category gets which color is up to each project (e.g. SportHub), not the system. | Roberto |
| 2026-11-14 | Sean moves the repo to the International-Slackline-Association organization. Collaborator invites sent to Can-Sahin and mmrtnz. | Roberto |
| 2026-11-14 | Green 600 changed from `#008F8B` to `#00827E` so white text passes AA (4.67:1). Green 500 (official) unchanged. Primary buttons use green 600; links and secondary-button text stay green 700 because they also sit on light gray (600 is 4.32:1 there). Destructive buttons use red 600 (4.84:1). The vault note still shows the old 600 until Roberto says to update it. | Roberto (600 change), Claude (role mapping) |
| 2026-11-14 | Independent review (Fable 5.2) done. Fixed right away: Tailwind breakpoints, focus ring on dark surfaces (`border.focus-inverse`), audit shipped to projects (`npx isa-audit`), WCAG wording (44px is a house rule, AA is 24px), link underline rule. Other findings are listed below as next steps. | Claude |
| 2026-11-14 | SportHub changes are out of scope for now; migrating SportHub would be a separate project. | Roberto |
| 2026-11-14 | Badge colors: new red and green distinct from status colors; violet added. Claude also added `brand` (ISA green) for ISA-specific badges. | Roberto, Claude |
| 2026-11-14 | Fonts self-hosted (files in the repo), no Google Fonts requests. | Roberto |
| 2026-11-14 | Versions numbered with semantic versioning, CHANGELOG.md, git tags. First tags: v0.1.0, v0.2.0. | Roberto |
| 2026-11-14 | Licence: MIT, like most popular design systems (e.g. GitHub Primer, GOV.UK Frontend, Radix; IBM Carbon and Atlassian use Apache 2.0). ISA name and logos excluded; fonts under SIL OFL. The other ISA repo checked (SportHub) has no licence file. | Roberto (asked for this), Claude (choice) |

## Open questions
1. **Logo SVGs and usage rules** (Roberto will provide; don't ask until then).
2. **SportHub components in the system:** SportHub has no licence file, so its developers (Can Sahin, Muhammad Martinez, Jonas Umlauft and others) should agree before code is copied over. Then extract one at a time, starting with Button and Badge.

## Next steps (from the review, not yet done)
1. Correct the component inventory: SportHub already has Alert, Avatar, Badge, Button, Card, Drawer, Modal, Spinner, Tab, Table, Tooltip and more.
2. Missing tokens: elevation, z-index, easing, opacity, border width, icon sizes; text-style utilities for Tailwind.
3. Consider strict W3C token format (or a tool like Style Dictionary) and a Tailwind compile test in CI.
4. Shorter Tailwind class names (`text-muted` instead of `text-text-muted`).
5. A live examples page generated from the code (beyond the color preview).
6. If SportHub migrates later (separate project): a class map from default Tailwind colors to roles.
