# Components

None are part of the system yet. They will be extracted from the Slackline Sport Hub (`slacklinesport.org/demo`) one at a time, reviewed against these foundations, and documented here. Only document components that exist in code.

## Inventory from SportHub (to review and extract)
| Component | SportHub variants | Notes for extraction |
| --- | --- | --- |
| Button | Primary, Secondary, Default, Destructive, Destructive Secondary, Ghost | Map to `action.*` roles; primary green 700, destructive red 600; 44px height |
| Badge | Contest size, discipline, age category, role, gender, color | Use `category.*` pairs; uppercase 12px |
| Tabs | Primary, large, secondary | Keyboard arrows, `aria-selected` |
| Modal | One | Focus trap, Escape, return focus |
| Form fields | Select, autocomplete, checkbox, checkbox group, level | Visible labels, 16px inputs, `border.strong` |
| Header, footer, navigation | | Phone menu |
| Cards | Event, athlete | |

Missing in SportHub, likely needed: alert/inline message, toast, table (responsive), pagination, empty state, loading/skeleton, radio, text area, date picker, breadcrumbs, avatar.

## Template for each component doc (`docs/components/<name>.md`)
1. Metadata: name, status (draft, stable, deprecated), source file
2. Overview: when to use, when not to (and what to use instead)
3. Anatomy: parts
4. Tokens used
5. Props / API
6. States: default, hover, active, focus, disabled, loading, error
7. Accessibility: keyboard, ARIA, focus
8. Example code
9. Related: uses / used by
