# Card

## 1. Metadata
- Status: draft (first version, 0.6.0)
- Source: `components/card.css`, `react/Card.js`
- Origin: extracted from the Slackline Sport Hub (`src/ui/Card`) and adapted
- Live examples: `components/card.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
A card groups what belongs to one thing (an event, an athlete, a course) and usually leads to its page. Cards sit in a card grid.

Not for: page layout sections (use plain sections), rows of comparable data (use a Table), or a single call to action (use a Button).

## 3. Anatomy
Optional media (image, 16:9), body with title, optional meta line, free content, and an optional footer for badges or one small button.

## 4. Tokens used
`surface.default`, `surface.muted` (media placeholder), `border.default`, `border.strong` (hover), `text.default`, `text.muted`, `text.link`, `shadow.md`, `shadow.lg`, `radius.lg`, `space.2`, `space.4`, `size.card-min`.

## 5. API
HTML: `<article class="isa-card">` with `isa-card__media`, `isa-card__body`, `isa-card__title`, `isa-card__meta`, `isa-card__footer`.
- Clickable card: put `<a class="isa-card__link" href="...">` inside the title. The link covers the whole card; its text is the title only.
- Modifiers: `isa-card--horizontal` (media left from 640px, stacked on phones), `isa-card--elevated` (shadow instead of border).
- Grid: `<ul class="isa-card-grid">` with one `<li>` per card. It fits as many columns as there is room for (cards at least 280px wide) and one column on phones.

React: `import { Card, CardGrid } from "@slacklineinternational/onsight/react"`.

| Prop | Type | Default |
| --- | --- | --- |
| `title` | text | |
| `titleAs` | `h2` to `h6` | `h3` |
| `href` | makes the card clickable | |
| `linkAs` | link component (router Link) | `a` |
| `image` | `{ src, alt, ... }` | |
| `media` | your own media element instead of `image` | |
| `meta` | small muted line | |
| `footer` | badges or a button | |
| `layout` | `vertical`, `horizontal` | `vertical` |
| `elevated` | boolean | false |

`CardGrid` wraps each child in a list item.

## 6. States
Default; hover and focus for clickable cards (stronger border and shadow, title underlined, focus ring around the whole card).

## 7. Accessibility
- The title is a real heading. Choose the level that fits the page (`titleAs`).
- A clickable card has one link (the title), not a link wrapped around everything, so screen readers announce a short, clear link name.
- Other links or buttons inside a clickable card still work. Keep it to one extra action at most.
- Images need alt text that says what is shown; use `alt=""` only for decoration.
- No movement on hover (the old card lifted up 4px).

## 8. Example
```html
<ul class="isa-card-grid">
  <li><article class="isa-card">
    <div class="isa-card__media"><img src="..." alt="Highliner above the Aare valley" loading="lazy"></div>
    <div class="isa-card__body">
      <h3 class="isa-card__title"><a class="isa-card__link" href="/events/42">Swiss Highline Open</a></h3>
      <p class="isa-card__meta">Bern, Switzerland · 14 to 16 August</p>
      <div class="isa-card__footer"><span class="isa-badge isa-badge--info">Upcoming</span></div>
    </div>
  </article></li>
</ul>
```
```jsx
<CardGrid>
  {events.map((e) => (
    <Card key={e.id} title={e.name} href={`/events/${e.id}`} linkAs={Link} image={{ src: e.photo, alt: e.photoAlt }} meta={e.place}
          footer={<Badge color="info">Upcoming</Badge>} />
  ))}
</CardGrid>
```

## 9. Related
Changes from the Sport Hub version: the link is on the title and stretched over the card (before, the whole card was one link, so its link name was all of its text); `layout="content-only"` is gone (leave out the image); `shadow` (`none`, `subtle`, `elevated`) became a border by default plus `elevated`; no lift on hover; the grid has no `columns` and `gap` props, it fits columns by itself; `next/image` is not built in, pass it through `media`. Sport Hub's EventDetailsCard, FeaturedAthleteCard, FeaturedEventCard and StackedMediaCard stay in the Sport Hub and can be built on this Card.
