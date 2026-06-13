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

- **America video** — still to be supplied. Add the YouTube ID to the destination's `video` field in
  `lib/destinations.tsx`.
- **Europe video** embeds from Google Drive — sharing must stay "Anyone with the link → Viewer" or it
  won't play in class (re-hosting on YouTube unlisted is more reliable).
- **Australia**: four distinct handprint images (Kuma / Purlaityi / Marnkutyi / Yarapurla) — the current
  image is the placeholder repeated.
- **Southern Africa**: mbira audio clip (~47 s).
- **South Asia**: confirm the rangoli design matching the "6 rotations / 12 lines" answer.
- **Title-banner artwork**: five sepia engravings (Australia, America, South Asia, Middle East/North
  Africa, Europe) are wired up but the image files still need to be added — see
  `public/assets/banners/README.md` for the exact filenames. Southeast Asia, East/Central Africa and
  Southern Africa have no artwork yet and fall back to the plain title block with an illustration
  placeholder.
