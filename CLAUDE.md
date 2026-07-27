# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — run oxlint

No test suite exists in this repo.

## Architecture

Single-page React marketing site (React 19 + Vite) selling an NFC/QR "MoreReviews" review card, deployed on Netlify.

- `src/App.jsx` — entire page as one component (hero, features, how-it-works, stat band, CTA). Uses GSAP + ScrollTrigger for scroll-driven reveal/parallax animations and an animated `Counter` component for stat numbers.
- `src/main.jsx` — React root mount.
- `netlify/functions/review-redirect.mjs` — Netlify Function that serves `/g/:id` (id `1`–`20`). Looks up `id` in a `destinations` map; if a Google review URL is set for that id, 302-redirects to it, otherwise returns 204 with `no-store`/`noindex` headers. This is how each physical NFC/QR card is pointed at a specific business's Google review link — **populate `destinations[id]` with real URLs before a card goes live**.
- `netlify.toml` — defines explicit `/g/1` through `/g/20` redirects to the function (plus a `/g/*` catch-all splat), and sets `no-store`/`noindex` headers on all `/g/*` responses so redirect links aren't cached or indexed.
- Build output (`publish = "dist"`) and functions dir (`netlify/functions`) are wired for Netlify's build.

When adding a new card/id beyond 20, add both the `destinations` entry in `review-redirect.mjs` and a corresponding `[[redirects]]` block in `netlify.toml`.
