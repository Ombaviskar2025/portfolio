# OM BAVISKAR — THE SERIES

A streaming-inspired personal portfolio. Every section is an episode, every project is an "Original".
Fictional platform look; not affiliated with any streaming service.

**Stack:** React 18, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion 11.

## Run it

Requires Node.js 18+.

```
npm install
npm run dev
```

Production build: `npm run build` (output in `dist/`, deployable to Vercel, Netlify or GitHub Pages).

## Edit your content

Everything lives in **`src/data/portfolio.ts`**. Search for `TODO` to find things to fill in:

- `profile.linkedin` — your exact LinkedIn URL
- `projects[].live` / `projects[].repo` — add live and GitHub links (buttons appear automatically)

## Add your photo and resume

- Photo: put a background-removed PNG at `public/assets/portrait.png`. Until then a clean "OB" monogram shows.
- Resume: replace `public/assets/Om_Baviskar_Resume.pdf`.

## Features

- Opening sequence (Enter / Esc skips), "Who's watching?" profile picker that reorders sections
- ▶ Play Intro highlight reel (Space pause, ← → navigate, Esc close)
- Originals with shared-element project overlay, My Journey as seasons/episodes, Top 10 skills row
- Respects `prefers-reduced-motion`
