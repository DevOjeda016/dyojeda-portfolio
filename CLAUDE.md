# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm (`packageManager` in `package.json`).

- `pnpm dev` — dev server at http://localhost:3000
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm lint` — ESLint (flat config in `eslint.config.mjs`, `eslint-config-next`)

There is no test runner configured.

## Next.js version caveat

@AGENTS.md

This Next.js (16.x, React 19) has breaking changes versus common training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code. Examples already in use: global `LayoutProps<"/[lang]">` / `PageProps<"/[lang]">` helpers, `proxy.ts` (formerly middleware), and `cacheComponents: true` in `next.config.ts`. `.mcp.json` registers `next-devtools-mcp` (talks to the dev server's `/_next/mcp`); the `next-dev-loop` skill verifies runtime behavior and needs the `agent-browser` CLI.

## Architecture

Single-page bilingual portfolio on the Next.js App Router.

- **i18n:** every route lives under `app/[lang]/` (`es`, `en`); `app/[lang]/layout.tsx` is the root layout. `proxy.ts` redirects locale-less paths using `Accept-Language`. All copy lives in `app/[lang]/dictionaries/{es,en}.ts` (`en` is typed against `es`); shared links in `app/[lang]/dictionaries.ts`. Entries marked "Reemplazar"/"Replace" are placeholders for real content.
- **Theme:** light/dark via the `.dark` class on `<html>`, set before paint by an inline script in the root layout (saved choice in `localStorage`, else system preference); `components/site/theme-toggle.tsx` flips it.
- **Design source of truth:** `DESIGN.md` (visual rules) and `PRODUCT.md` (product facts); `.impeccable/surfaces/` holds the home's direction contract.
- **Motion:** GSAP (`lib/gsap.ts` registers plugins once; import gsap from there). `components/site/page-motion.tsx` owns the page choreography through data attributes (`data-hero-name`, `data-hero-fade`, `data-reveal`, `data-row`, `data-magnetic`); `dot-portrait.tsx` and `dot-field.tsx` are canvas components. The terminal typing stays CSS (`.type-line` in `app/globals.css`). The layout script adds `.motion` to `<html>` when motion is allowed; everything is skipped under `prefers-reduced-motion`. Hero portrait photo: `public/retrato.{jpg,png,webp}` (falls back to "dy.").

- **Path alias:** `@/*` maps to the repo root (e.g. `@/components/ui/button`, `@/lib/utils`).
- **UI kit:** shadcn/ui configured via `components.json` with style `base-rhea` on **Base UI** (`@base-ui/react`), not Radix. Components live in `components/ui/`; add more with the `shadcn` CLI/skill rather than hand-writing them. Icons are `lucide-react`; variants use `class-variance-authority`.
- **Styling:** Tailwind v4, CSS-first — there is no `tailwind.config`. Theme tokens (CSS variables, `@theme inline` mapping, `dark` custom variant via the `.dark` class) all live in `app/globals.css`, which also imports `tw-animate-css` and `shadcn/tailwind.css`.
- **Fonts:** `app/[lang]/layout.tsx` loads Montserrat (bound to `--font-sans`) and Geist Mono via `next/font/google` and applies the variables on `<html>`.
- **`cn` helper:** `lib/utils.ts` re-exports `cn` from the `cn` npm package (not the usual clsx + tailwind-merge pair).

## Agent tooling in the repo

`.agents/skills/` (impeccable, shadcn, design-taste-frontend, next-dev-loop, and the official GSAP skills: gsap-core, gsap-react, gsap-scrolltrigger, gsap-timeline, gsap-plugins, gsap-performance) holds the project skills, symlinked into `.claude/skills/` and tracked in `skills-lock.json`. These folders are excluded from ESLint. `.codex/hooks.json` runs the impeccable hook after edits and on stop, if its script is present.
