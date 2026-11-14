# Where the Sport Hub differs from the design system

For the Sport Hub developers. Compared: design system v0.4.0 and Sport Hub `sport-hub/` at commit `24bc7b7` (2026-11-12). Contrast numbers are calculated (WCAG 2.x), minimum for normal text is 4.5:1, for borders and large text 3:1.

Nothing here has been changed in the Sport Hub. Updating it is a separate project that has not been decided (Roberto, 2026-11-14). This list is so you know what an update would involve. The Sport Hub was the starting point for the system, thank you for that work.

## Summary
| Area | Size of change | Why |
| --- | --- | --- |
| Colors | Large | New palette values, role names instead of palette names, about 1,000 places |
| Fonts | Medium | Barlow Condensed and Barlow replace Metropolis and Inter |
| Button | Small to medium | Renamed variants, 44px height, new colors |
| Badge | Medium | New color pairs, wrappers keep their mapping |
| Alert | Small | Renamed variant, new markup |
| Form fields | Medium to large | No Formik inside, bigger inputs, new error and help layout |
| Accessibility | Medium | Contrast, focus rings, touch targets |
| Not yet in the system | None for now | Tabs, Modal, Table, Card, Drawer, Tooltip and others |

## 1. Colors
**Brand values.** The official colors are ISA Red `#E84026`, ISA Green `#009F9A`, ISA Gray `#454546`. In the Sport Hub these sit at `green-600` and `red-600`; in the system they are `green.500` and `red.500`, and the scales around them are different values.

| Sport Hub | Design system |
| --- | --- |
| `--color-primary` `#009F9A` | brand green 500 `#009F9A` (logos, large text, decoration only) |
| `--color-green-50…950` (own scale) | ISA green scale 50 to 900; 600 is `#00827E`, 700 is `#005F5C` |
| `--color-red-50…950` (own scale) | ISA red scale 50 to 900; 600 is `#D13A22` |
| `--color-neutral-50…950` | ISA gray scale 50 to 900 (500 is `#454546`) |
| `--color-<hue>-100` / `-600` for badges | `category.<name>-bg` / `-fg` pairs |

**Roles, not palette names.** Projects use roles such as `--isa-color-text-default`, `--isa-color-action-primary-bg`, `--isa-color-border-strong`. Palette variables and raw values are not used directly. This is what makes dark mode possible later.

**How much.** Running `npx isa-audit src` on the Sport Hub reports 1,015 places: 813 default Tailwind color classes (`bg-white`, `text-gray-500`...), 157 hex values, 20 `rgb()`/`rgba()` values and 25 named colors. On top of that, about 180 uses of `var(--color-...)` would need a role instead.

**Tailwind.** The system's Tailwind theme removes the default color palette on purpose, so classes like `text-gray-500` stop working once it is imported. A migration would need a class map (old class to role) and probably a temporary compatibility file. Neither exists yet.

## 2. Fonts
| | Sport Hub | Design system |
| --- | --- | --- |
| Headings | Metropolis | Barlow Condensed (20px and up) |
| Body and UI | Inter | Barlow |
| Loading | `.otf` files in `/public/fonts` | `.woff2` files shipped in the package (`fonts.css`), no Google requests |

Barlow Condensed is narrower than Metropolis, so headings and navigation will take less width. The system uses a fixed type scale (see `docs/foundations/typography.md`); the Sport Hub uses fluid `clamp()` sizes. Side note: the Sport Hub declares `font-weight: semi-bold` for Metropolis SemiBold, which is not a valid value (should be `600`).

## 3. Layout tokens
| | Sport Hub | Design system |
| --- | --- | --- |
| Breakpoints | xs 20rem, sm 40rem, md 48rem, lg 64rem, xl 80rem | the same (taken from the Sport Hub) |
| Spacing | 5 fluid steps (`--space-xs…xl`, `clamp()`) | fixed 4px grid, `space.1` (4px) to `space.24` (96px) |
| Radius | mixed (4px, 6px, 8px) | `sm` 4px, `md` 8px, `lg` 12px |

## 4. Button
| Sport Hub | Design system | Note |
| --- | --- | --- |
| `primary` | `primary` | green 600 `#00827E` with white (4.67:1). Now: `#009F9A` with white, 3.27:1 |
| `secondary` | `secondary` | text green 700. Now: `#009F9A` text, 3.27:1 |
| `default` | `neutral` | dark gray text. Now: `neutral-400` text, 2.05:1 |
| `ghost` | `ghost` | dark gray text, gray hover. Now: `neutral-400` text, 2.05:1 |
| `destructive` | `danger` | red 600 `#D13A22` (4.84:1). Now: `red-500` `#F9543A`, 3.3:1 |
| `destructive-secondary` | `danger-secondary` | text red 700 |
| `icon` | `ghost` + `iconOnly` | needs `aria-label`; 44px square (now about 32px) |
| `tab` | not in Button | will be part of Tabs |

Other changes:
- Height 44px (`small`: 36px visible, 44px tappable). Now about 40px and 32px.
- `as="link"` + `href` becomes just `href` (or `as={Link}`), and the link no longer gets `role="button"`.
- Disabled uses its own gray instead of 60% opacity.
- New: `loading`, `fullWidth`, a visible focus ring.
- Labels may wrap on narrow screens (now `white-space: nowrap`).

## 5. Badge
- `<span>` instead of `<div>`; color names are lower case (`color="blue"`, was `"BLUE"`).
- All color pairs changed to pass AA. Current Sport Hub pairs for comparison: blue 4.54, green 4.17, orange 4.06, pink 4.05, purple 3.68, red 3.36, yellow 3.08, teal 2.92, violet 2.73 (text is 12px, so 4.5:1 applies).
- The category red and green are no longer the ISA red and green, so a badge is not read as an error or success. New `brand` color (ISA green) for things like "ISA verified".
- New `outline` variant replaces the bordered styles (contest size, organizer, ISA verified). Solid filled badges (athlete: white on red, judge: white on green) are not in the system; they would become a soft or outline badge unless Roberto wants solid ones added.
- `Discipline`, `ContestSize`, `Role`, `Gender`, `AgeCategory` and `Country` stay in the Sport Hub and keep their own category-to-color mapping. They would render the system Badge. The system does not decide which discipline gets which color.
- New status colors (`success`, `danger`, `warning`, `info`) for badges like "Cancelled".

## 6. Alert
- `variant="error"` becomes `variant="danger"`; the default is `info` (was error).
- Every variant has its own icon (success had none). Text is left-aligned (was centered) and 16px (was 14px).
- `size="SM"` (plain bold error text) is gone: field errors come from the form field's `error` prop.
- `role="alert"` for danger and `role="status"` for the others are set automatically.
- Colors are the AA status pairs. Now: error text 3.73:1.
- Optional `title` prop.

## 7. Form fields
- **No Formik inside.** The system has `TextField`, `TextArea`, `SelectField`, `Checkbox`, `Radio`, `Fieldset` with plain props (`label`, `help`, `error`, `optional`, plus everything a native input takes). The Sport Hub's `Formik*` components would become thin wrappers that pass `field` props and `meta.error` to them.
- Inputs are 44px high (now 32px) and always 16px text (now 16px only below 768px).
- Input border is gray 400 (4.11:1). Now `neutral-300`, 1.35:1, which is hard to see.
- Focus shows the standard ring. Now the outline is removed and replaced by a green border.
- Hover makes the border darker gray, no longer brand green.
- Errors: 14px semibold with an icon, linked with `aria-describedby`, and the input gets `aria-invalid`. Now 12px `#E84026` text (4.04:1) and color only.
- Help text sits above the control. Optional fields get "(optional)".
- Placeholder color passes AA (now `#8784A7`, 3.57:1).
- Checkbox and radio: native controls in ISA green with a 44px tappable row.
- Select: native `<select>` inside a `<span class="isa-select">`; the arrow is drawn in the text color instead of an inline SVG image.
- Not in the system yet: `Autocomplete`, `FormikAutocomplete`, `UserAutocomplete`, `LinkFieldArray`, number field with steppers, and the domain dropdowns (discipline, gender, contest size). They stay as they are.

## 8. Accessibility rules that affect all screens
- WCAG 2.2 AA is the minimum. Body text `neutral-700` (6.48:1) and headings `neutral-600` (4.95:1) pass today; the items listed above do not.
- Every interactive element needs a visible focus ring. The Sport Hub has 3 `outline: none` rules and no `:focus-visible` styles.
- Touch targets at least 44px (house rule, stricter than AA's 24px).
- Links inside text are underlined.
- Screens must work at 320 to 360px wide.

## 9. Sport Hub components not in the system yet
Tab, Modal, Table, Card, Drawer, Tooltip, Spinner, Avatar, Navigation, Footer, PageLayout. Until they are extracted, nothing changes for them. Planned next: Tabs and Modal.

Likely to stay Sport Hub specific: CountryFlag, EventDetailsCard, FeaturedAthleteCard, FeaturedEventCard, StackedMediaCard, ProfileMediaLinks, LabelValuePair, SortableList, UserForm, UserMenu, Icons.

## If a migration is decided later, a sensible order
1. Install a tagged version and load `fonts.css` and `tokens.css` only (no Tailwind theme yet). Nothing breaks; the roles become available.
2. Switch fonts.
3. Replace Button, Badge, Alert and form fields with the system components, one at a time.
4. Replace colors file by file, using `npx isa-audit` to track what is left.
5. Import the Tailwind theme last, when no default color classes remain.
