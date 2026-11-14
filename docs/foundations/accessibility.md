# Accessibility

Minimum: WCAG 2.2 AA (Roberto, 2026-11-14). `npm run check` proves the color roles; you are responsible for using them as paired in `tokens/contrast-pairs.json`.

- Contrast: text 4.5:1; large text (24px+, or 18.66px+ bold) and UI parts (input borders, icons with meaning, focus rings) 3:1.
- Never color alone: errors get text and an icon; categories get a label.
- Focus: every interactive element shows `border.focus` as a 2px ring with 2px offset (`:focus-visible`). Never remove outlines without a replacement.
- Keyboard: everything works with Tab, Enter, Space and Escape. Modals trap focus and return it on close.
- Forms: every input has a visible `<label>`; help and error text linked with `aria-describedby`; errors say how to fix.
- Touch targets 44px; text resizable to 200% without loss.
- Images: meaningful `alt`; decorative images `alt=""`. Icon-only buttons need `aria-label`.
- Motion: honour `prefers-reduced-motion`.
- Language: set `lang` on `<html>` (and on passages in another language).
