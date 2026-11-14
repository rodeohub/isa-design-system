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

## Open questions
1. **Category hues:** the blue, teal, orange, yellow, pink and purple values in `tokens/primitive/color.json` were proposed by Claude (all pass AA). Fine as they are unless Roberto wants a different look.
2. **Licence** (a LICENSE file saying what others may do with this public repo). Recommendation: MIT for the code and tokens, with a note that the ISA name and logos are not included. Needs a yes from Roberto (and ideally the ISA board).
3. **Logo SVGs and usage rules** (Roberto will provide; don't ask until then).

## Next steps (from the review, not yet done)
1. SportHub migration: SportHub uses about 815 default Tailwind color classes (`bg-white`, `text-gray-500`...) that this theme removes. Write a class map and ship an optional compatibility file first.
2. Harden the audit: also catch `oklch()`, named colors, Tailwind palette classes and primitive tokens; fewer false positives.
3. Category red and green equal status danger and success; shift them or drop them. SportHub also uses violet.
4. Correct the component inventory: SportHub already has Alert, Table, Avatar, Spinner, Tooltip and Drawer.
5. Tag releases (v0.1.0), add a CHANGELOG, and install projects from a tag, not main.
6. Self-host fonts by default instead of loading from Google (privacy, GDPR).
7. Missing tokens: elevation, z-index, easing, opacity, border width, icon sizes; text-style utilities for Tailwind.
8. Consider strict W3C token format (or a tool like Style Dictionary) and a Tailwind compile test in CI.
9. Shorter class names (`text-muted` instead of `text-text-muted`).
10. A live examples page generated from the code (beyond the color preview).
11. Open questions are for Roberto only; contributors should not be asked every session.
