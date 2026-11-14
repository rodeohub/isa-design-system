# Theming and dark mode

Dark mode is not built yet (Roberto, 2026-11-14), but the system is ready for it.

## How it works
1. **Primitive tokens** (`tokens/primitive/`): raw values, theme-independent.
2. **Semantic roles** (`tokens/semantic/themes/<theme>.json`): what each value is for. `light.json` is the default and the only theme today.
3. **Projects and components** use roles only.

`dist/tokens.css` puts light roles on `:root` and `[data-theme="light"]`. Adding `tokens/semantic/themes/dark.json` with the same keys makes the build emit `[data-theme="dark"] { ... }` automatically, and `npm run check` tests its contrast too. No component changes needed, as long as nothing uses hard-coded colors or primitives.

## To add dark mode later
- Copy `light.json` to `dark.json`, change values (dark surfaces, light text, adjusted brand shades).
- Decide the switch: follow the system (`prefers-color-scheme`) and/or a user toggle setting `data-theme` on `<html>`.
- Check logos (white versions on dark) and photos.
