# Logos

Official ISA logos as SVG, provided by Roberto on 2026-11-14. Use these files as they are: do not redraw, recolor, stretch or rebuild a logo.

**Not covered by the MIT License** of this repository (see LICENSE, Exclusions). They may only be used with the permission of the International Slackline Association.

## Files
| Folder | Logo | Shape (width x height) | Variants |
| --- | --- | --- | --- |
| `isa-default/` | ISA: mark with the full name below. The main logo. | 568 x 441 | color, black, grey, white |
| `isa-wide/` | ISA: mark with the full name beside it. For wide, low spaces such as headers. | 1158 x 208 | color, black, grey, white |
| `isa-minimal/` | ISA: the mark alone. For small sizes, icons and avatars. | 568 x 208 | color, black, grey, white |
| `education/` | ISA Education (Education Commission). | 568 x 328 | color, black, grey, white |
| `safety/` | ISA Safety (Safety Commission). | 568 x 328 | color, black, grey, white |
| `certifications/` | Certification marks: `instructor`, `judge`, `rigger`. | 284 x 43 | filled or outline, each in color, black, white |

File names: `<logo>-<variant>.svg`, e.g. `isa-wide-white.svg`, `rigger-outline-color.svg`.

## Which variant
| Background | Variant |
| --- | --- |
| White and light surfaces (`surface.default`, `subtle`, `muted`) | color; or black or grey for one-color use |
| Green header and footer (`surface.brand`), dark mode, photos | white |
| Dark mode page (`surface.default` in dark) | white |

The color variants use ISA Red `#E84026`, ISA Green `#009F9A` and ISA Gray `#454546`. Brand red and green on a dark or green background do not have enough contrast: use white there.

## In a page
```html
<a class="isa-header__brand" href="/"><img src=".../isa-wide-white.svg" alt="International Slackline Association, home"></a>
```
- Give the image real alt text (the name, and "home" when it links there). A logo next to the same name in text is decoration: `alt=""`.
- Keep the proportions: set the height, leave the width to `auto`.
- Keep clear space around the logo of about the height of the red "I" block. Minimum sizes and exact clear space are not defined yet (open point in `DECISIONS.md`).

## Note
`education/isa-education-color.svg` was corrected in this repository on 2026-11-14 to the official colors (the provided file had `#0DA69D`, `#EF4D34` and `#FEFEFE`). The Figma source of the logos still needs the same fix, or the next export brings the old colors back.

PNG exports (1x, 2x, 4x) exist outside the repo; ask Roberto if a project cannot use SVG.
