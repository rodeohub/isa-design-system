# Decisions and open questions

This repo is the final word on brand values (Roberto, 2026-11-14). The vault note "ISA Brand Guidelines" keeps a copy; Roberto tells it when to update.

Agents: raise the open questions with Roberto at the start of a session until they are answered.

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
| 2026-11-14 | Destructive buttons use red 600 (4.84:1 with white text); text links and primary buttons use green 700 (7.52:1). Green 600 is not enough for normal text (3.96:1). | Claude, calculated |

## Open questions
1. **Category hues:** the blue, teal, orange, yellow, pink and purple values in `tokens/primitive/color.json` were proposed by Claude (all pass AA). Fine as they are unless Roberto wants a different look.
2. **Licence** (a LICENSE file saying what others may do with this public repo). Recommendation: MIT for the code and tokens, with a note that the ISA name and logos are not included. Needs a yes from Roberto (and ideally the ISA board).
3. **Lighter primary button green:** primary buttons are green 700 (dark) because green 600 is slightly too light for white text (3.96:1, needs 4.5:1). Option: add one extra shade between them (about 4.6:1) so buttons look closer to the brand green. Default if nobody decides: keep green 700.
4. **Logo SVGs and usage rules** (Roberto will provide; don't ask until then).
