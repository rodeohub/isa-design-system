# Logos

Official ISA logos as SVG, provided by Roberto on 2026-11-14. Use these files as they are: do not redraw, recolor, stretch or rebuild a logo.

**Not covered by the MIT License** of this repository (see LICENSE, Exclusions). They may only be used with the permission of the International Slackline Association.

## Still missing
More may follow (for example ISA Nature). Add each in the same set as the others: SVG in color, black, grey and white, one folder per logo, then list it in the table below.

## Files
| Folder | Logo | Shape (width x height) | Variants |
| --- | --- | --- | --- |
| `isa-default/` | ISA: mark with the full name below. The main logo. | 568 x 441 | color, black, grey, white |
| `isa-wide/` | ISA: mark with the full name beside it. For wide, low spaces such as headers. | 1158 x 208 | color, black, grey, white |
| `isa-minimal/` | ISA: the mark alone. For small sizes, icons and avatars. | 568 x 208 | color, black, grey, white |
| `education/` | ISA Education (Education Commission). | 567 x 328 | color, black, grey, white |
| `safety/` | ISA Safety (Safety Commission). | 567 x 328 | color, black, grey, white |
| `sport/` | ISA Sport (Sport Commission). | 567 x 328 | color, black, grey, white |
| `access/` | ISA Access (Nature and Access Commission). | 567 x 328 | color, black, grey, white |
| `certifications/` | Certification marks: `instructor`, `judge`, `rigger`. | 284 x 43 | filled or outline, each in color, black, white |

File names: `<logo>-<variant>.svg`, e.g. `isa-wide-white.svg`, `rigger-outline-color.svg`.

## Which variant
| Background | Variant |
| --- | --- |
| White and light surfaces (`surface.default`, `subtle`, `muted`) | color; or black or grey for one-color use |
| Green header and footer (`surface.brand`), dark mode, photos | white |
| Dark mode page (`surface.default` in dark) | white |

The color variants use ISA Red `#E84026`, ISA Green `#009F9A` and ISA Gray `#454546`. Brand red and green on a dark or green background do not have enough contrast: use white there.

## Rules
Based on the ISA CD Manual (Thomas Buckingham, Nina Mappes; logo design by Andreas Erschen), section 2, with the screen sizes and clear space defined here (Claude, 2026-11-14, on Roberto's request).

**From the CD Manual**
- The logos are protected by copyright. Use in connection with the activities of the ISA and its commissions is free. Members and partners need permission.
- No changes or adaptations. Resize only in proportion.
- Use the color version. Black, grey or white only where color is not possible.
- Avoid pictures and colored backgrounds behind a logo: the background must not change how the logo looks.
- Leave enough space to the edge and to other objects.
- In print, no logo is smaller than 16mm high.

**Minimum size on screens**
| Logo | Minimum height |
| --- | --- |
| `isa-default` | 64px |
| `isa-wide` | 32px |
| `isa-minimal` | 24px (16px as a favicon or app icon) |
| `education`, `safety`, `sport`, `access` | 48px |
| `certifications` | 24px |

Below these sizes the words stop being readable: switch to `isa-minimal`.

**Clear space**
Keep free space on all four sides of at least half the height of the ISA mark (the red and green shape) in that logo. That is about the width of the red "I". No text, pictures, edges or other logos inside it. For the certification marks: half the height of the mark.

**Which shape**
- `isa-default`: the main logo, where there is room (covers, about pages, footers, print).
- `isa-wide`: headers and other wide, low places.
- `isa-minimal`: small sizes, icons, avatars, favicons. Not as the only ISA logo on a document for people outside the ISA.

**Do not**
- recolor, redraw, outline, add shadows or other effects
- stretch, squeeze, rotate or crop
- put the color version on green, red, dark or busy backgrounds (use white there, on a calm area)
- combine a logo with other graphics into a new mark
- use a logo as a button label or inside a sentence

## In a page
```html
<a class="isa-header__brand" href="/"><img src=".../isa-wide-white.svg" alt="International Slackline Association, home"></a>
```
- Give the image real alt text (the name, and "home" when it links there). A logo next to the same name in text is decoration: `alt=""`.
- Keep the proportions: set the height, leave the width to `auto`.
- Follow the minimum sizes and clear space under Rules.

## Source
The logos are components in the Figma file "ISA RIGGER CERT ADS" (page Components: sets "ISA Logos" and "ISA CERTIFICATIONS LOGOS"). The Education color logo was corrected to the official colors there and here on 2026-11-14. Roberto redrew the four commission logos (Education, Safety, Sport, Access) on 2026-11-15 so they share one artwork and one size.

PNG exports (1x, 2x, 4x) exist outside the repo; ask Roberto if a project cannot use SVG.
