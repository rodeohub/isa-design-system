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
| 2026-11-14 | Destructive buttons use red 600 (4.84:1 with white text); text links and primary buttons use green 700 (7.52:1). Green 600 is not enough for normal text (3.96:1). | Claude, calculated |

## Open questions
1. **Category palette:** the blue, teal, orange, yellow, pink and purple values in `tokens/primitive/color.json` are proposals (all pass AA). Approve or adjust. Also: which category goes with which discipline (see `docs/foundations/color.md`).
2. **Transfer to the ISA GitHub organization:** who does it (Can is an org member) and when.
3. **Licence** for the repo (e.g. MIT for code, plus a note that ISA logos and name are not covered).
4. **Green between 600 and 700:** the official scale jumps from 3.96:1 to 7.52:1. A lighter accessible green (about 4.6:1) for buttons would need a new shade. Keep as is, or add one?
5. **Logo SVGs and usage rules** (Roberto will provide; don't ask until then).
