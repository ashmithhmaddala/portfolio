# ashmithmaddala.dev

Personal site of Ashmith Maddala — product security engineer at Vontier.

Single-page React app, no router. Deployed to GitHub Pages behind a custom
domain.

## Stack

| | |
|---|---|
| Build | Vite 6 |
| UI | React 18 |
| Motion | Framer Motion |
| Icons | lucide-react |
| Host | GitHub Pages (`gh-pages` branch) |

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build locally
```

## Deploying

```bash
npm run deploy
```

That builds to `dist/` and pushes it to the `gh-pages` branch.
`public/CNAME` is copied into the build, which is what keeps
`ashmithmaddala.dev` bound across deploys — don't delete it.

## Editing content

**All copy lives in [`src/data/profile.js`](src/data/profile.js).** Components
read from it; nothing is hard-coded in JSX. To change what the site says, that
is the only file you need.

Structure:

- `PROFILE` — name, role, hero tagline, rotating phrases, long-form bio
- `EXPERIENCE` — roles, newest first
- `PROJECTS` — cards plus the `caseStudy` behind each one
- `SKILLS` — grouped, `level` drives the meter width
- `SOCIALS`, `NAV`, `STATS`, `INTERESTS`

### On project metrics

Each project metric carries an `estimated` flag:

```js
{ value: "40%", label: "engagement lift", estimated: true }
```

`true` renders a visible `est.` marker with a tooltip explaining the number is
self-reported rather than independently measured. When you can back a figure
with a real measurement, set it to `false` and the marker disappears. Don't
present an unmeasured number as fact — it's the first thing an interviewer
pulls on.

## Known follow-ups

- `public/og.jpg` — 1200×630 social share card doesn't exist yet. The
  `og:image` tags in `index.html` are commented out until it does.
- The Vontier entry in `EXPERIENCE` has `placeholder: true` and generic scope
  bullets. Replace them with real accomplishments.

## Accessibility & motion

- Every animation respects `prefers-reduced-motion`; the tilt and typewriter
  disable entirely rather than degrade.
- The card tilt is off for coarse pointers.
- Theme follows the system by default, overridable and persisted, painted
  before first frame to avoid a flash.
