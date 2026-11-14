# Theming and dark mode

The system has two themes: light (default) and dark (added in v0.12.0, Roberto 2026-11-14). Components need no changes for dark mode, because they only use roles.

## How it works
1. **Primitive tokens** (`tokens/primitive/`): raw values, the same in every theme.
2. **Semantic roles** (`tokens/semantic/themes/light.json`, `dark.json`): what each value is for. Both files have the same keys.
3. **Projects and components** use roles only. A hard-coded color or a primitive token will be wrong in one of the themes: `npx isa-audit` finds them.

`npm run check` tests every pair in `tokens/contrast-pairs.json` in both themes (WCAG AA).

## Switching
The theme is set by `data-theme` on `<html>`:

| Value | Result |
| --- | --- |
| none or `light` | Light. |
| `dark` | Dark. |
| `system` | Follows the device setting, until the person uses the switch. |

A project that supports dark mode starts with `<html data-theme="system">` and offers a switch. The choice is remembered in the browser (`localStorage`, key `isa-theme`). Projects that have not been checked in dark mode leave `data-theme` out and stay light.

**The switch** is a toggle button:
```html
<button type="button" class="isa-header__button" data-isa-theme-toggle aria-pressed="false" aria-label="Dark mode">
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M12 7l5 -2M12 12h9M12 17l5 2"/></svg>
</button>
```
`dist/isa.js` makes it work and keeps `aria-pressed` right. In the header use the class `isa-header__button`; elsewhere a normal button (`isa-button isa-button--neutral`) with the words "Dark mode". From a script: `import { setTheme, isDark } from "isa-design-system/isa.js"`.

React: `<ThemeToggle />` (as a header action: `<Header actions={<ThemeToggle className="isa-header__button" />} />`), or `const [dark, setDark] = useTheme()`.

**No flash on load:** put this as the first script in `<head>`, so a saved choice applies before the page is drawn:
```html
<script>try{var t=localStorage.getItem('isa-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
```

## What changes in dark
- Surfaces are dark gray (`gray.900`, `800`, `700`), text is light.
- Links, outlines and focus rings use lighter greens and reds (`green.300`, `green.400`, `red.300`).
- Primary and danger buttons keep their colors (white text on green 600 and red 600).
- Status and category colors are the light pairs swapped: light text on the dark hue.
- Shadows hardly show on dark. Things that float (dialogs, drawers, menus, elevated cards) use `surface.raised`, one step lighter than the page.
- Header and footer are deep green (green 900) with white text (Roberto, 2026-11-14).

## For projects
- Pictures and logos: use a white or light logo on dark and brand surfaces. Check photos and illustrations with transparent backgrounds in both themes.
- Do not use `opacity` or `filter` to "darken" things; use roles.
- Tailwind: the role classes (`bg-subtle`, `text-muted`) follow the theme by themselves. A `dark:` variant is not needed.

## Adding another theme
Add `tokens/semantic/themes/<name>.json` with the same keys. The build emits `[data-theme="<name>"]` and the contrast check covers it.
