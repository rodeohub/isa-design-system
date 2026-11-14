# Typography

Fonts (Roberto, 2026-11-14): **Barlow Condensed** for headings, **Barlow** for body and UI. Both free (SIL Open Font License). The font files ship inside this package (`dist/fonts/`, Latin and Latin Extended) and load from the project's own server via `dist/fonts.css`. No requests go to Google, which avoids the privacy (GDPR) issue of loading fonts from Google's servers. Licence: `dist/fonts/OFL.txt`.

| Style | Font | Size | Weight | Line height |
| --- | --- | --- | --- | --- |
| display | Barlow Condensed | 64px | 700 | 1.1 |
| h1 | Barlow Condensed | 48px | 700 | 1.1 |
| h2 | Barlow Condensed | 36px | 700 | 1.25 |
| h3 | Barlow Condensed | 24px | 600 | 1.25 |
| h4 | Barlow Condensed | 20px | 600 | 1.25 |
| body | Barlow | 16px | 400 | 1.6 |
| body-sm | Barlow | 14px | 400 | 1.5 |
| label | Barlow | 14px | 600 | 1.5 |
| button | Barlow | 16px | 600 | 1.25 |
| badge | Barlow | 12px | 700, uppercase | 1.25 |

Rules:
- Barlow Condensed only at 20px and up. Condensed text is hard to read small and in long paragraphs.
- Body text 16px minimum on phones; form inputs 16px (smaller makes iOS zoom in).
- On phones, step headings down one level (h1 at 36px, h2 at 30px).
- Line length for reading: 45 to 75 characters.
- Use real heading order (h1, h2, h3); style is separate from level if needed.

## Tailwind classes
Each text style is one class: `type-display`, `type-h1`, `type-h2`, `type-h3`, `type-h4`, `type-body`, `type-body-sm`, `type-label`, `type-button`, `type-badge`. Prefer them over combining `font-heading text-5xl font-bold`. Add the color separately (`text-default`, `text-muted`).
