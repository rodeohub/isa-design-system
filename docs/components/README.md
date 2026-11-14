# Components

Components are extracted from the Slackline Sport Hub one at a time (with its developers' consent, Roberto 2026-11-14), adapted to these foundations, and documented here. Only components that exist in code are documented.

Each component ships as plain CSS (`dist/components.css`, classes `isa-*`, works in any stack) plus an optional React wrapper (`isa-design-system/react`). Plain HTML pages load `dist/isa.js` for the two interactive ones (Tabs, Dialog). Live examples: `dist/preview.html`, sources in `components/*.examples.html`.

## Available
| Component | Doc | Status |
| --- | --- | --- |
| Button | [button.md](button.md) | draft |
| Badge | [badge.md](badge.md) | draft |
| Alert | [alert.md](alert.md) | draft |
| Tabs | [tabs.md](tabs.md) | draft |
| Dialog (modal) | [dialog.md](dialog.md) | draft |
| Form fields (text input, text area, select, checkbox, radio, fieldset) | [field.md](field.md) | draft |

## To extract from the Sport Hub (`sport-hub/src/ui`)
Suggested order: Card, Autocomplete, Table, Spinner, Tooltip, Drawer, Avatar, Navigation and Footer, PageLayout.

Sport Hub specific, likely to stay there: CountryFlag, EventDetailsCard, FeaturedAthleteCard, FeaturedEventCard, StackedMediaCard, ProfileMediaLinks, LabelValuePair, SortableList, UserForm, UserMenu, Icons.

Not in the Sport Hub yet, likely needed: toast, pagination, empty state, skeleton, breadcrumbs, date picker.

## How to extract a component
1. Read the Sport Hub source and list its variants and states.
2. Write `components/<name>.css` using semantic tokens only (add roles and contrast pairs if needed).
3. Add `components/<name>.examples.html`, a React wrapper in `react/`, types, and a case in `scripts/test-react.mjs`.
4. Write `docs/components/<name>.md` from the template below, including what changed from the Sport Hub version.
5. Run `npm run check`, look at `dist/preview.html` at 360px and desktop width, tab through it.

## Template for each component doc
1. Metadata: name, status (draft, stable, deprecated), source file
2. Overview: when to use, when not to (and what to use instead)
3. Anatomy: parts
4. Tokens used
5. API (classes and props)
6. States: default, hover, active, focus, disabled, loading, error
7. Accessibility: keyboard, ARIA, focus
8. Example code
9. Related, and changes from the source
