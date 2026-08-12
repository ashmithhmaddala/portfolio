# ashmithmaddala.dev

Personal site of Ashmith Maddala, product security engineer at Vontier.

One page, one column, no router. Deployed to GitHub Pages behind a custom
domain.

## Design rules

The site is deliberately austere. If you extend it, hold these:

1. **Near-monochrome.** Ink on paper plus one signal colour (oxide orange),
   used sparingly. There are no gradient tokens in
   [`tokens.css`](src/styles/tokens.css) on purpose. A component wanting a
   gradient is a component that is wrong.
2. **Rules, not boxes.** Structure comes from hairlines and alignment. No
   cards, no shadows, no blur, no glass.
3. **Text is the interface.** The largest type on the page is about 3x the
   body size. Nothing shouts.
4. **Motion is functional.** The only animation is the project row expanding.
   No scroll reveals, no count-ups, no tilt, no parallax.
5. **No skill percentage bars.** Nobody can defend "Python 92%" in an
   interview and the number tells the reader nothing.

## Copy rules

Short declarative sentences. State the thing and stop. No rhetorical
questions, no "not just X but Y", no three-item lists for rhythm, no em-dash
asides. If a sentence was written to sound good, cut it.

## Stack

React 18 and Vite 6. That is the entire dependency list — no motion library,
no icon library, no CSS framework. The accordion is `grid-template-rows`
`0fr → 1fr`; the icons are typographic characters.

Production bundle: ~53 kB of JS gzipped (almost all of it React) and ~2.9 kB
of CSS.

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

Builds to `dist/` and pushes it to the `gh-pages` branch. `public/CNAME` is
copied into the build and is what keeps `ashmithmaddala.dev` bound across
deploys. Don't delete it.

## Editing content

**All copy lives in [`src/data/profile.js`](src/data/profile.js).** Nothing is
hard-coded in JSX.

- `PROFILE` — intro paragraphs, the spec block, the about text
- `EXPERIENCE` — roles, newest first
- `PROJECTS` — index rows plus the notes that expand under each
- `STACK` — grouped, unranked
- `SOCIALS`, `SECTIONS`

### Project metrics

Each metric carries an `estimated` flag:

```js
{ value: "40%", label: "engagement lift", estimated: true }
```

`true` renders a visible `est.` qualifier with a tooltip saying the figure is
self-reported rather than independently measured. Set it to `false` only for
something you can actually demonstrate.

## Outstanding

- **Vontier bullets are placeholders.** `EXPERIENCE[0]` has
  `placeholder: true` and describes the shape of a product security role, not
  anything specific you did. Replace with real work and set the actual start
  month.
- **No security project.** Every project predates the role. One would close an
  obvious gap for anyone reading the job title first.
- **`public/og.jpg` does not exist.** The `og:image` tags in `index.html` are
  commented out until it does.

## Accessibility

- Collapsed project panels are removed from the tab order and the
  accessibility tree via `visibility: hidden`, not just clipped.
- `prefers-reduced-motion` removes the one remaining transition.
- Theme follows the system, is overridable, persists, and is resolved before
  first paint so there is no flash.
