# Maths Around Our World — 2026 Midwinter Maths Festival

A desktop-first web experience for teachers to drive in class (projector / interactive whiteboard): a clickable
watercolour world map linking to eight regional destination pages, each with a short video, a "Did you know?"
fact, and differentiated Lower/Upper Primary maths challenges with hint and reveal-answer toggles.

Implemented from the Claude Design handoff bundle (*Maths Around Our World — Prototype.html* and the companion
build spec), with the design decisions locked in during the design sessions:

- **Journey rail** destination layout — sticky info rail (title, fact, illustration) at left, media + challenges at right
- **Merriweather** for headings and body
- **Rise-and-fade** route transitions (reduced-motion safe)
- **Ticket-style** buttons and rough-stamp heading banners, "earthy atlas" palette

## The eight destinations

| # | Destination | Maths focus |
|---|-------------|-------------|
| 1 | Australia | Kaurna numbers, animal tracks, symmetry & rotation |
| 2 | America | Metric → imperial measurement |
| 3 | South Asia | Rangoli patterns & lines of symmetry |
| 4 | Southeast Asia | Bánh Chưng recipe scaling (doubling) |
| 5 | East & Central Africa | The Ishango Bone prime-number mystery |
| 6 | Southern Africa | Mbira rhythm & clapping patterns |
| 7 | Middle East & North Africa | Urdu / Persian-Arabic numerals mystery message |
| 8 | Europe | Königsberg bridges — the puzzle that created graph theory |

## Running

```bash
npm install
npm run dev      # development — http://localhost:3000
npm run build    # production build (all 8 destination pages statically generated)
npm start        # serve the production build
```

## Deploying to GitHub Pages

The site is configured to publish to GitHub Pages via `.github/workflows/nextjs.yml`,
which builds a static export (`out/`) on every push to the working branch.

Because a project Pages site is served from a sub-folder
(`https://<user>.github.io/Midwinter-Maths-Festival/`), `next.config.mjs` sets a
`basePath` of `/Midwinter-Maths-Festival` in production, and all image paths are
prefixed accordingly. GitHub Pages paths are case-sensitive, so this must match the
repository name exactly. If the repository is ever renamed, update that value (or set
`NEXT_PUBLIC_BASE_PATH`).

One-time setup: in the repository's **Settings → Pages**, set **Source** to
**GitHub Actions**.

## Deploying to Vercel

Vercel serves from a root domain, so no base path is wanted there. The build
auto-detects Vercel (it sets `VERCEL=1` during the build) and uses an empty base
path automatically — no environment variables or config changes are needed.

Import the repository in Vercel and deploy with the defaults: Vercel detects
Next.js, runs `next build`, and serves the static export (`output: 'export'`).
If you ever need to force the base path explicitly, set `NEXT_PUBLIC_BASE_PATH`
(use `""` for a root domain).

## Project structure

```
app/
├── layout.tsx                  Merriweather via next/font, metadata
├── globals.css                 design tokens + full stylesheet from the design handoff
├── template.tsx                rise-and-fade route transition (re-runs per navigation)
├── page.tsx                    landing — clickable world map
└── destinations/[slug]/page.tsx  Journey-rail destination template (SSG ×8)
components/
├── MapButtons.tsx              map pills + visited stamps (sessionStorage)
├── ChallengeCard.tsx           hint/reveal toggles, passport stamp, handprint option grid
├── VideoSlot.tsx               YouTube embed or labelled placeholder
└── SectionLabel.tsx
lib/destinations.tsx            all 8 destinations — single source of truth for content
public/assets/                  map artwork + activity images from the planning document
```

## Outstanding assets (flagged in-app on each affected page)

- **Europe video** embeds from Google Drive — sharing must stay "Anyone with the link → Viewer" or it
  won't play in class (re-hosting on YouTube unlisted is more reliable).
- **Australia**: four distinct handprint images (Kuma / Purlaityi / Marnkutyi / Yarapurla) — the current
  image is the placeholder repeated.
- **South Asia**: confirm the rangoli design matching the "6 rotations / 12 lines" answer.
- **Map pin artwork**: the landing-page pins are wired to use teardrop marker images
  (`public/assets/pins/pin-<slug>.png`, transparent PNGs) — see the README in that folder for the
  filename-to-destination mapping. Any pin whose file is missing falls back to the original
  parchment-ticket pill, so the map keeps working until all eight are uploaded.
- **Title-banner artwork**: all eight destinations are wired for a sepia engraving behind the title,
  but the image files still need to be uploaded to `public/assets/banners/` — see the README in that
  folder for the exact filenames. Pages show a plain parchment banner until their file is added.
