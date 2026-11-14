# Accessibility

Minimum: WCAG 2.2 AA (Roberto, 2026-11-14). `npm run check` proves the color roles; you are responsible for using them as paired in `tokens/contrast-pairs.json`.

- Contrast: text 4.5:1; large text (24px+, or 18.66px+ bold) and UI parts (input borders, icons with meaning, focus rings) 3:1.
- Never color alone: errors get text and an icon; categories get a label.
- Focus: every interactive element shows a 2px ring with 2px offset on `:focus-visible`: `border.focus` on light surfaces, `border.focus-inverse` on brand and dark surfaces (mark the area with `data-isa-surface="brand"` or `"inverse"` and the components switch by themselves). Never remove outlines without a replacement. Sticky headers must not hide the focused element.
- Links in running text are underlined (color alone is not enough).
- Keyboard: everything works with Tab, Enter, Space and Escape. Modals trap focus and return it on close.
- Forms: every input has a visible `<label>`; help and error text linked with `aria-describedby`; errors say how to fix.
- Touch targets: AA requires 24px; our house rule is 44px. Text resizable to 200% and layouts usable at 320px wide without horizontal scrolling.
- Images: meaningful `alt`; decorative images `alt=""`. Icon-only buttons need `aria-label`.
- Motion: honour `prefers-reduced-motion`.
- Language: set `lang` on `<html>` (and on passages in another language).
