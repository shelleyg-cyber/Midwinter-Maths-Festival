# Maths Around Our World — Midwinter Maths Festival

An interactive, single-page web prototype for the **Midwinter Maths Festival**. Students take a "journey around the world", exploring real-world maths at four stations and collecting a passport stamp at each one by answering a challenge question.

## The stations

| # | Station | Maths focus | Interactive activity |
|---|---------|-------------|----------------------|
| 1 | Antarctica ❄️ | Rotational symmetry | Draw your own six-fold symmetric snowflake on a canvas |
| 2 | Fields of Europe 🌻 | Fibonacci sequence & the golden angle | Grow a sunflower seed spiral with a slider |
| 3 | Cities of the World 🕰️ | Time zones, angles and division | Live world clocks comparing Melbourne, Tokyo, London and New York |
| 4 | The Alhambra, Spain 🔷 | Tessellations and interior angles | Build tilings from triangles, squares, hexagons — and see why pentagons fail |

A sticky **Maths Passport** bar tracks progress; earning all four stamps completes the journey.

## Running it

No build step or server is required — it's a single self-contained HTML file:

1. Open `index.html` in any modern browser, or
2. Serve the folder, e.g. `python3 -m http.server` and visit `http://localhost:8000`.

## Notes

- Plain HTML/CSS/JavaScript, no dependencies.
- Touch input is supported for the drawing activity (works on tablets/iPads).
- Respects `prefers-reduced-motion` (disables the snowfall and scroll animations).
- Australian English, with Melbourne as the "home" time zone.
