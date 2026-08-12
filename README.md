# ashmithmaddala.dev

Personal site of Ashmith Maddala, product security engineer at Vontier.

## Routes

| Path | Page |
|---|---|
| `/` | Intro, spec block, current role, three featured projects |
| `/work` | Four case studies plus the rest of the repos |
| `/work/:slug` | Case study — diagram, architecture, decisions, known limits |
| `/lab` | Three interactive demos of ideas from the work |
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
4. **Motion has to earn it.** Allowed: a one-shot entrance on first view, the
   reading-progress bar on long case studies, hover states, and the stepped
   demos in the lab where the motion *is* the explanation. Not allowed:
   count-ups, tilt, parallax, anything that re-hides on scroll-up, or
   animation applied to a page because it looked bare.
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

- `trustGap` — theriac: what the MCP client shows vs what the model receives
- `biometrics` — Turing Defense: capture to 56 features to classifier, with
  the adversarial training loop
- `attackChain` — TACTIC: isolated events vs the same events correlated
- `attackGraph` — ReconPilot: assets as nodes, `has_vulnerability` as an edge

They are inline SVG, not images, so they inherit the CSS custom properties and
recolour correctly in both themes. Each has a `<title>` for the accessibility
tree, and the surrounding prose always states the same point, so nothing
depends on seeing the picture.

## Stack

React 18, React Router 6, Vite 6, Lucide. No motion library, no CSS framework.
Scroll behaviour is IntersectionObserver and a rAF-throttled scroll listener in
[`useScroll.js`](src/hooks/useScroll.js). Production bundle is ~77 kB of JS
gzipped and ~5.5 kB of CSS.

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

Copy lives in two files. Nothing is hard-coded in JSX.

**[`src/data/profile.js`](src/data/profile.js)** — `PROFILE` (intro, spec
block, about, principles), `EXPERIENCE`, `STACK`, `SOCIALS`, `NAV`.

**[`src/data/projects.js`](src/data/projects.js)** — written from the actual
repositories, not the résumé. `featured: true` gives a project a case-study
page at `/work/:slug`; everything else appears in the "Also built" list
linking straight to GitHub.

Adding a featured project means adding one object with a `slug` (which becomes
the URL) and a `diagram` key matching one in `Diagrams.jsx`.

Case-study fields are optional and render only when present. Where something
isn't known — why a decision was made, what you'd change — the field is absent
rather than invented. Fill it in and it appears.

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
- **Repos have no GitHub descriptions.** All sixteen are blank, so they read
  as unlabelled on your profile page even though the READMEs are strong. One
  line each would fix it.
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
