# Share image (Open Graph card)

`public/og-default.png` (1200×630) is the default `og:image` / `twitter:image` for every page
(see `src/layouts/BaseLayout.astro`). It is a static file. Nothing generates it during the build.

Its design lives here:

- `og-default.html` + `glitch-common.css` — the card template (print-proof style: name, crop marks, blue misregistration, grain)
- `render.mjs` — screenshots the template with headless Chrome and compresses it with sharp

## Re-rendering (manual)

Requirements: Google Chrome or Chromium, plus the **Inter** and **IBM Plex Mono** fonts installed locally
(the template uses local fonts).

```sh
npm install --no-save playwright-core   # not a project dependency on purpose
node scripts/og/render.mjs              # writes public/og-default.png
# CHROME=/path/to/chrome node scripts/og/render.mjs   # if Chrome isn't at /usr/bin/google-chrome
```

Commit the updated `public/og-default.png` afterwards.
