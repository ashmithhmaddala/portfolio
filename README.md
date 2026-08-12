# ashmithmaddala.dev

Personal site of Ashmith Maddala, product security engineer at Vontier.

## Routes

| Path | Page |
|---|---|
| `/` | Intro, spec block, current role, three featured projects |
| `/work` | Full project index |
| `/work/:slug` | Case study — diagram, architecture, decisions, retrospective |
| `/about` | Long-form background, principles, experience, stack |
| `/contact` | Email and links |
| `*` | Not found |

## Design rules

The system is austere on purpose. If you extend it, hold these:

1. **Near-monochrome.** Ink on paper plus one signal colour (oxide orange),
   used sparingly. There are no gradient tokens in
   [`tokens.css`](src/styles/tokens.css) and there should not be.
2. **Rules, not boxes.** Structure comes from hairlines and alignment. No
   cards, shadows, blur or glass.
3. **Text is the interface.** The largest type is about 3x body size.
4. **Motion is functional.** Hover states and a row tint. No scroll reveals,
   count-ups, tilt or parallax.
5. **No skill percentage bars.** Nobody can defend "Python 92%" in an
   interview and the number tells the reader nothing.
6. **Icons are functional.** Lucide, used for affordances (external link,
   direction, copy state). Never decorative.

## Copy rules

Short declarative sentences. State the thing and stop. No rhetorical
questions, no "not just X but Y", no three-item lists for rhythm, no em-dash
asides. If a sentence was written to sound good, cut it.

## Diagrams

Each case study carries a hand-authored SVG in
[`Diagrams.jsx`](src/components/diagrams/Diagrams.jsx):

- `coldStart` — where the recommender hands off from content-based to
  collaborative filtering
- `authBoundary` — per-view decorators failing open vs a blueprint guard
  failing closed
- `alphaBeta` — a minimax tree with a pruned subtree
- `pipeline` — train/serve path with evaluation held outside the app

They are inline SVG, not images, so they inherit the CSS custom properties and
recolour correctly in both themes. Each has a `<title>` for the accessibility
tree, and the surrounding prose always states the same point, so nothing
depends on seeing the picture.

## Stack

React 18, React Router 6, Vite 6, Lucide. No motion library, no CSS framework.
Production bundle is ~69 kB of JS gzipped and ~3.7 kB of CSS.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Deploying

```bash
npm run deploy
```

Builds to `dist/` and pushes it to the `gh-pages` branch.

Two files in the build matter beyond the app itself:

- **`CNAME`** comes from `public/` and keeps `ashmithmaddala.dev` bound across
  deploys. Don't delete it.
- **`404.html`** is written by a small plugin in
  [`vite.config.js`](vite.config.js) as a byte-identical copy of
  `index.html`. GitHub Pages has no server-side rewrite, so a direct hit on
  `/work/python-chess-engine` would 404 before React loads. Pages serves
  `404.html` for unmatched paths, which boots the app and lets the router read
  the URL. Remove that plugin and every deep link breaks on refresh.

## Editing content

**All copy lives in [`src/data/profile.js`](src/data/profile.js).** Nothing is
hard-coded in JSX.

- `PROFILE` — intro, spec block, about text, principles
- `EXPERIENCE` — roles, newest first
- `PROJECTS` — index entries plus the full case study for each
- `STACK` — grouped, unranked
- `SOCIALS`, `NAV`

Adding a project means adding one object to `PROJECTS`. Give it a `slug`
(which becomes the URL), and set `diagram` to one of the keys in
`Diagrams.jsx` or add a new one.

### Project metrics

Each metric carries an `estimated` flag:

```js
{ value: "40%", label: "engagement lift", estimated: true }
```

`true` renders a visible `est.` qualifier with a tooltip saying the figure is
self-reported rather than independently measured. Set it to `false` only for
something you can demonstrate.

## Outstanding

- **Vontier bullets are placeholders.** `EXPERIENCE[0]` has
  `placeholder: true` and describes the shape of a product security role, not
  anything specific you did. Replace with real work and set the actual start
  month.
- **No security project.** All four predate the role. One would close an
  obvious gap for anyone who reads the job title first.
- **`public/og.jpg` does not exist.** The `og:image` tags in `index.html` are
  commented out until it does.
- **Per-route meta tags.** Titles are set client-side, so crawlers that don't
  execute JS see the `index.html` description on every route. Fine for now;
  worth prerendering if search traffic matters.

## Accessibility

- Every diagram has a `<title>` and is described in the surrounding prose.
- `prefers-reduced-motion` removes the remaining transitions.
- Theme follows the system, is overridable, persists, and resolves before
  first paint so there is no flash.
- Skip link, visible focus rings, and `aria-label` on every icon-only control.
