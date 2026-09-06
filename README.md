# BlueOak — Know Your Funding

This repository contains a Next.js + TypeScript site for BLUEOAK Ventures: a lightweight marketing site and a "Know Your Funding" interactive assessment tool used to provide founders with an indicative funding-readiness score.

## Purpose
- Marketing site for BLUEOAK Ventures with an interactive funding assessment flow.
- Illustrative scoring model (demo only) that can be replaced with a formal methodology in `lib/fundingScore.ts`.

## Tech stack
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS (utility-first styling)
- Sharp (image processing used by `tools/generate-images.js`)

## Get started (development)

Prerequisites
- Node.js 18+ (LTS) and npm. Use `nvm`/`fnm` if you manage multiple Node versions.
- Platform build tools may be required for native dependencies (e.g. `libvips` for `sharp`). On macOS, install `brew install vips` if you see `sharp` build errors.

1) Install dependencies

```bash
npm install
```

If `npm install` fails with cache / permission issues, use a temporary cache:

```bash
npm_config_cache=/tmp/npm-cache npm install
```

2) Generate responsive decorative artwork (required)

Yes — this project uses an image generation step. The funding section renders decorative artwork from `public/decoration` using a manifest created by the script. When you add or change the high-resolution artwork, run:

```bash
npm run generate:images
```

What this does:
- Runs `tools/generate-images.js` which uses `sharp` to create multiple PNG/WebP sizes and a tiny LQIP placeholder.
- Writes variants into `public/decoration/` and updates `public/decoration/image-manifest.json` which the components read at runtime.

3) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Stopping and troubleshooting the dev server

- Graceful stop: press Ctrl+C in the terminal where `next dev` is running.
- If a server is "bouncing" (port already in use) or you can't find the process, check and kill the listener:

```bash
# find the process listening on port 3000
lsof -i :3000
# kill it (replace <PID> with the process id)
kill <PID>

# or more bluntly (kills any running next dev processes)
pkill -f "next dev" || pkill -f "npm run dev"
```

- If you prefer another port:

```bash
# run dev server on port 4000
PORT=4000 npm run dev
```

Other common issues
- `sharp` installation/build errors: install `libvips` on your system (`brew install vips` on macOS) or use a CI image that includes it.
- npm cache permission errors: run `sudo chown -R $(id -u):$(id -g) ~/.npm` to fix ownership, or use the temporary cache above.


## Repository layout
- `app/` — Next.js App Router pages and global styles (`globals.css`)
- `components/` — Reusable React components (hero, navbar, funding flow, cards, map, footer)
- `data/` — Static fixtures (hero cards, services, editorial items, startup cities)
- `lib/` — Business logic (funding score calculation)
- `public/decoration/` — Generated responsive artwork and `image-manifest.json`
- `tools/generate-images.js` — Utility to produce image sizes and LQIP placeholders using `sharp`

## Configurations

- `next.config.js` — Next.js configuration (image settings, redirects, rewrites, basePath if used).
- `tailwind.config.ts` — Tailwind theme, plugins and content paths.
- `postcss.config.js` — PostCSS + Autoprefixer configuration used by Tailwind.
- `tsconfig.json` — TypeScript compiler options and path aliases.
- `vercel.json` — (optional) deployment settings when deploying to Vercel.

If you need to change image delivery or add a CDN, update `next.config.js` and the `public/decoration` pipeline accordingly.

### Legal content (editable)

The Privacy Policy and Terms are stored as plain Markdown under `public/legal/`:

- `public/legal/privacy.md`
- `public/legal/terms.md`

Edit these files directly to update copy, effective date, or review date — no code change required. The site reads these files at runtime and displays them in the footer modal.

## Funding section details
- UI: `components/FundingScore.tsx` renders the section; `components/FundingScoreForm.tsx` implements the multi-step form.
- Desktop behavior: translucent form card sits above a full-bleed decorative image. The decorative artwork is responsive with portrait/landscape variants.
- Mobile behavior: single-question-per-page flow to keep the card compact while allowing the artwork to partially overlap the card bottom.
- Image pipeline: replace the source high-res images in `public/decoration` (filenames below) and re-run `npm run generate:images`.

### Decorative images
Replace these high-resolution sources in `public/decoration/` and then regenerate:
- `know-your-funding-element-highRes.png`
- `know-your-funding-element-highResLandscape.png`

## Scripts
- `npm run dev` — start Next.js dev server
- `npm run build` — build production site
- `npm run start` — start production server
- `npm run generate:images` — generate responsive artwork variants and `image-manifest.json`

## Dependency auditing and security
- Use `npm audit` to surface known vulnerabilities.
- This repo has a dev-time image pipeline using `sharp`; some native dependencies may require platform-specific build tools.

## Troubleshooting
- If `npm install` fails due to cache permission issues, try:

```bash
npm_config_cache=/tmp/npm-cache npm install
```

If you see permission errors referencing `/Users/<you>/.npm`, run:

```bash
sudo chown -R $(id -u):$(id -g) ~/.npm
```

## Contributing
- Open a branch, keep changes focused, and open a PR with a short description.

## Authors
- Shreya Joshi
- Chinmay Joshi

