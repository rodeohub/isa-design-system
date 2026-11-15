# Avatar

## 1. Metadata
- Status: draft (first version, 0.7.0)
- Source: `components/avatar.css`, `react/Avatar.js`
- Origin: extracted from the Slackline Sport Hub (`src/ui/Avatar`) and adapted
- Live examples: `components/avatar.examples.html` (rendered in `dist/preview.html`)

## 2. Overview
The picture of a person or organization. Without a photo it shows initials.

| Size | Pixels | Use |
| --- | --- | --- |
| `small` | 32 | lists, next to a name, the user menu |
| `medium` (default) | 48 | cards, comments |
| `large` | 80 | profile summaries |
| `xlarge` | 120 | profile pages |

Round for people, `square` for clubs and organizations. For another size set `--isa-avatar-size` on the element.

## 3. Anatomy
A circle (or rounded square) with an image, or with one or two initials on a gray background.

## 4. Tokens used
`surface.muted`, `text.default`, `size.avatar-sm/md/lg/xl`, `radius.full`, `radius.lg`.

## 5. API
HTML: `<span class="isa-avatar"><img src="..." alt="Name"></span>`, or with initials `<span class="isa-avatar" role="img" aria-label="Name">LE</span>`. Modifiers: `isa-avatar--small`, `--large`, `--xlarge`, `--square`.

React: `import { Avatar } from "@slacklineinternational/onsight/react"`.

| Prop | Type | Default |
| --- | --- | --- |
| `name` | used for initials and as the text alternative | |
| `src` | photo URL | none (initials) |
| `alt` | text alternative if different from `name` | `name` |
| `size` | `small`, `medium`, `large`, `xlarge` | `medium` |
| `square` | boolean | false |
| `decorative` | true when the name is shown right next to it | false |
| `imgProps` | extra props for the `<img>` | |

Initials are the first letters of the first and last word of the name.

## 6. States
None.

## 7. Accessibility
- The avatar has the person's name as its text alternative.
- When the name is written next to the avatar, mark the avatar decorative (`alt=""` or `aria-hidden="true"`) so the name is not read twice.
- An avatar is not a button. To make it open a profile or a menu, put it inside a link or button that has its own name.

## 8. Example
```jsx
<Avatar name="Lena Example" src={user.photo} size="large" />
<span><Avatar name="Lena Example" size="small" decorative /> Lena Example</span>
```

## 9. Related
Changes from the Sport Hub version: sizes are 32, 48, 80 and 120px (were 80, 120 and 200px; set `--isa-avatar-size` for 200px); `image` is `src`; `defaultLabel` is replaced by `name`, and the initials are worked out from it; `isSquare` is `square` and also applies without a photo; `next/image` is not built in; new `decorative`.
