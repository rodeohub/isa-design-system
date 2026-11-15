# Page layout

## 1. Metadata
- Status: draft (first version, 0.9.0)
- Source: `components/page.css`, `react/Page.js`
- Origin: extracted from the Slackline Sport Hub (`src/ui/PageLayout`) and adapted
- Live examples: `components/page.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
The frame every page shares: skip link, header, one main area with a fixed maximum width, footer at the bottom of the screen even on short pages. Inside the main area: the page title, an optional wide picture, then the sections.

## 3. Anatomy
- `isa-page`: wraps header, main and footer; fills the screen height.
- `isa-main`: the `<main>`; centered, at most 1280px wide, 16px side padding on phones and 32px from 768px, 32px between sections. `isa-main--narrow` (720px) for articles and forms.
- `isa-container`: the same width and padding without the main role, for full-width bands.
- `isa-page-title`: the `<h1>` and an optional lead paragraph.
- `isa-hero`: a wide picture with an optional caption below it.

## 4. Tokens used
`surface.default`, `surface.muted`, `text.default`, `text.muted`, `size.content-max`, `size.content-narrow`, `size.hero-min`, `size.hero-max`, `space.4` to `space.12`, `radius.lg`, `font.size.4xl` and `5xl`.

## 5. API
HTML:
```html
<body>
  <a class="isa-skip-link" href="#main">Skip to content</a>
  <div class="isa-page">
    <header class="isa-header">...</header>
    <main id="main" class="isa-main">
      <div class="isa-page-title"><h1>Title</h1><p>Lead text.</p></div>
      <figure class="isa-hero"><img src="..." alt="..."><figcaption>Caption</figcaption></figure>
      <section>...</section>
    </main>
    <footer class="isa-footer">...</footer>
  </div>
</body>
```

React: `import { Page, Main, Container, PageTitle, Hero } from "onsight/react"`.

| Component | Props |
| --- | --- |
| `Page` | children |
| `Main` | `narrow`; `id` (default `main`) |
| `Container` | `narrow`, `as` |
| `PageTitle` | `title`; children = lead text |
| `Hero` | `src`, `alt`, `caption`, `contain` (show the whole picture, no cropping), `imgAs` (e.g. Next `Image`), `imgProps` |

## 6. States
None.

## 7. Accessibility
- One `<main id="main">` and one `<h1>` per page; the skip link is the first thing in `<body>`.
- Text is never placed on top of a photo: contrast cannot be guaranteed there. Title above, caption below.
- `alt` describes the picture, or is empty (`alt=""`) when it is decoration.
- Works from 360px wide. Lead text stays at a readable line length.

## 8. Example
```jsx
<SkipLink />
<Page>
  <Header ... />
  <Main>
    <PageTitle title="Swiss Highline Open">Three days of freestyle and speed highline.</PageTitle>
    <Hero src="/sho.jpg" alt="Athlete on a highline above the valley" caption="Photo: ..." />
    <section>...</section>
  </Main>
  <Footer ... />
</Page>
```

## 9. Related
Header, footer and skip link: [navigation.md](navigation.md). Breadcrumbs go at the top of main: [breadcrumbs.md](breadcrumbs.md). Layout tokens: [../foundations/layout.md](../foundations/layout.md). Changes from the Sport Hub version: it includes the `<main>` and the content width (the Sport Hub sets these in its root layout); sections no longer need `p-4 sm:p-0`; the title is not overlaid on the picture on phones (it was white 24px text with an 8px description on the photo); the blurred background copy of the picture is dropped (`contain` shows a plain background); split into `Main`, `PageTitle` and `Hero`.
