# Layout

- **Spacing:** 4px grid. Tokens `space.1` (4px) to `space.24` (96px). Use only these.
- **Radius:** `sm` 4px (badges), `md` 8px (buttons, inputs), `lg` 12px (cards), `xl` 16px, `full` (pills, avatars).
- **Breakpoints (min-width):** xs 320px, sm 640px, md 768px, lg 1024px, xl 1280px. Design for 360px first.
- **Touch targets:** `size.touch-target` (44px) minimum height and width for anything tappable, with at least 8px between targets.
- **Content width:** `size.content-max` (1280px), centered, with `space.4` side padding on phones and `space.8` from md. Use the page layout classes (`isa-main`, `isa-container`; `docs/components/page.md`). `size.content-narrow` (720px) for text pages and forms.
- **Motion:** `duration.fast/normal/slow`; respect `prefers-reduced-motion`.

## Borders, icons, opacity, easing
- **Border width:** `border-width.thin` (1px) for borders and dividers, `border-width.thick` (2px) for emphasis.
- **Icons:** inside text and buttons 1.25em, so they follow the text. Standing alone: `icon.sm` (16px), `icon.md` (20px), `icon.lg` (24px), `icon.xl` (40px). A tappable icon still needs a 44px target.
- **Opacity:** `opacity.muted` for decoration only. Never fade text or controls to show a state: use the muted and disabled color roles, which are contrast checked.
- **Movement:** `duration.*` with `easing.standard`. Respect `prefers-reduced-motion`.
