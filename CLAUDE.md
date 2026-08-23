# Jorge Herrera's Mario-Themed Personal Blog

A static-first personal blog built with Astro 7 and styled with a Super Mario Bros theme using modern CSS techniques.

## Project Overview

- **Static-only Astro site** - Never add React, Vue, or other frameworks
- **Minimal JavaScript** - Ship the least JS possible; the only client script is the QuestionBlock click handler
- **Personal website** - Optimized for latest browsers only, no backwards compatibility needed
- **Modern CSS bleeding-edge** - Use cutting-edge CSS features regardless of adoption
- **Tech stack**: Astro 7 (Rust compiler, Sätteri markdown), Tailwind CSS v4, TypeScript, Markdown

## Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally |
| `npm run check` | Type-check with `astro check` (strictest tsconfig) |
| `npm run astro` | Run Astro CLI commands |
| `npm run sync-blog` | Sync posts from the Obsidian vault (`OBSIDIAN_BLOG_PATH` in `.env.local`) |
| `npm run commit-new-blog-posts` | Commit and push untracked blog posts |

## Astro 7 Configuration Notes

- Config lives in `astro.config.ts` (TypeScript).
- **Markdown pipeline is Sätteri** (Astro 7's native Rust processor), not remark/rehype.
  Obsidian-style `[[wiki links]]` are enabled via `features: { wikilinks: true }`, and
  `src/lib/wikilink-resolver.ts` (a Sätteri mdast plugin) rewrites their hrefs to
  `/blog/<slug>/` using `github-slugger` — the same slugger the glob loader uses for
  entry IDs, so wikilink targets always match routes.
- **`trailingSlash: 'always'`** is pinned. Every internal href must end with `/`
  (e.g. `/blog/`, `/blog/${post.id}/`, `/tags/${tag}/`).
- **`compressHTML` uses the v7 `'jsx'` default** — whitespace between elements on
  separate lines is stripped. Use flex/grid `gap-*` for inline groupings (the existing
  pattern) rather than relying on literal whitespace between elements.
- **Fonts come from Astro's fonts API** (top-level `fonts` config, local provider):
  subsetted woff2 files in `src/assets/fonts/`, rendered by `<Font ... preload />` in
  `BaseHead.astro`. There are no `@font-face` rules in CSS and no fonts in `public/`.
- The Rust compiler errors on unclosed non-void HTML tags — close everything.

## Modern CSS & Tailwind v4 Guidelines

### Core Principles
- **CSS-first configuration**: all design tokens live in the `@theme` block of `src/styles/global.css`. There is no `tailwind.config.js`
- **Prefer utility classes** over custom CSS classes whenever possible
- **Use @utility directive** if a reusable component pattern genuinely can't be expressed with utilities
- **Use @apply directive** when grouping utilities is necessary (see the `@layer components` block for `body` and headings)
- **Never create custom CSS classes** if achievable with Tailwind utilities
- **Embrace modern CSS**: Container Queries, `:has()`, `@layer`, CSS nesting, `oklch()` colors, etc.
- **No browser fallbacks** - Use latest CSS features without polyfills or vendor prefixes

## Code Style & Conventions

### File Structure
- **Components**: Pure Astro components (`.astro` files only) in `src/components/`
- **Blog posts**: Markdown files in `src/content/blog/` (`.md` only, no MDX)
- **Layouts**: `src/layouts/BlogPost.astro` (the only layout)
- **Utilities**: TypeScript utilities in `src/utils/` (`blog.ts`, `tags.ts`, `dateUtils.ts`)
- **Markdown plugins**: `src/lib/` (Sätteri mdast/hast plugins)

### Naming Conventions
- **Blog posts**: filenames are the post title verbatim (spaces and punctuation allowed); the glob loader slugifies them into entry IDs
- **Components**: `PascalCase.astro`
- **Utilities**: `camelCase.ts`
- **Imports**: no explicit `.ts` extensions in import specifiers
- **Gaming terminology**: Use Mario/gaming terms consistently (levels, power-ups, warp bays, etc.)

### TypeScript Guidelines
- **`astro/tsconfigs/strictest`** — code must pass `npm run check` with 0 errors (unused locals, `exactOptionalPropertyTypes`, unchecked index access all enforced)
- **Type imports**: Use `import type` for type-only imports
- **Content collections**: Always use proper `CollectionEntry<'blog'>` types; entries expose `id` (never `slug`, which does not exist on glob-loader entries)

Example:
```typescript
import type { CollectionEntry } from 'astro:content';

type Props = CollectionEntry<'blog'>['data'] & {
  relatedArticles?: CollectionEntry<'blog'>[];
};
```

## Mario Theme Implementation

### Color System
All colors are defined in the `@theme` block of `src/styles/global.css`. The default
Tailwind palette is reset (`--color-*: initial`) and replaced with three custom
oklch scales (50–950 stops each), plus white/black:
- `--color-mario-bros-blue-*` — skies, cards, chrome
- `--color-mario-bros-lava-*` — blocks, accents, underground bricks
- `--color-mario-bros-green-*` — pipes

### Typography
- **Pixel font**: "Press Start 2P" via `font-pixelated` (headings, HUD elements)
- **Monospace**: "Source Code Pro" via `font-mono` (body text, code)
- Both are self-hosted subsetted woff2 files served through Astro's fonts API with
  preloads and metrics-adjusted fallbacks
- The `--text-xs` … `--text-9xl` scale is custom-tuned for the retro aesthetic
- `--text-shadow-2xs` … `--text-shadow-lg` provide layered 8-bit text shadows

### Component Patterns
- **Pixel-perfect borders**: `border-2` / `border-4` with `border-black`
- **Pixel drop shadows**: offset solid-black layers (`absolute inset-0 translate-x-1 translate-y-1 bg-black`) or arbitrary `shadow-[4px_4px_0_0_rgba(0,0,0,1)]`
- **Blocky aesthetics**: minimal radius (`rounded-sm`)
- **Gaming terminology**: "LEVELS" for blog posts, "WARP BAYS" for tag pages
- **Gaming emojis**: 🏰, 🎮, 🗺️, 🎯 for visual hierarchy in comments/headings

## Content Management

### Blog Posts
- **Location**: `src/content/blog/`
- **Format**: Markdown (`.md`) files only
- **Wiki links**: `[[Another Post Title]]` links to another post by title; `[[Title|alias]]` customizes the link text
- **Static generation**: All content pre-rendered at build time
- Posts are synced one-way from an Obsidian vault via `npm run sync-blog` (destructive: posts not in the vault are deleted — including posts authored in the Level Editor)

### Level Editor (Sveltia CMS)
- **`/admin/`** hosts [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (static files in `public/admin/`: `index.html` loads the CMS from CDN, `config.yml` configures it). Mobile-first, Decap-compatible, no framework code added to the site.
- Saving an entry commits straight to `main` through the GitHub API; Vercel redeploys.
- **GitHub OAuth** is handled by two Vercel serverless functions in `api/` (`auth.ts`, `callback.ts`) — plain Web-standard handlers deployed by Vercel's root `api/` directory convention. The Astro build does not touch them (no adapter; the site stays static), but they are type-checked by `npm run check`, so they must pass strictest too. They need `OAUTH_GITHUB_CLIENT_ID` / `OAUTH_GITHUB_CLIENT_SECRET` env vars in Vercel.
- The homepage's "SECRET WARP ZONE" pipe links to `/admin/`.

### Frontmatter Schema
Required fields for all blog posts:
```yaml
---
title: "Your Post Title"           # string
date: 2024-01-15                   # YYYY-MM-DD (quoted or unquoted)
tags:                              # array of strings (optional, defaults to [])
  - "JavaScript"
  - "Web Development"
---
```

### Content Collections
Type-safe content using the content layer glob loader (`src/content.config.ts`):
```typescript
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([])
  }),
});
```

## Architecture Principles

### Static-First Approach
- **All pages pre-rendered** at build time (no adapter, no on-demand rendering)
- **No client-side frameworks** - pure Astro components only
- **Minimal JavaScript** - one delegated click handler for question blocks; nothing else
- **Data flows through `getStaticPaths` props** - fetch collections once per route module and pass entries/related data via props instead of re-querying per page

### Modern Web Standards
- **Latest CSS features**: Use without fallbacks or vendor prefixes
- **Modern layout**: CSS Grid, Flexbox, Container Queries
- **Advanced selectors**: `:has()`, `:is()`, `:where()` for clean styling
- **Performance-first**: Target Lighthouse 100/100 scores

### Project Structure
```
api/
├── auth.ts                  # Vercel function: GitHub OAuth entry (Level Editor)
└── callback.ts              # Vercel function: OAuth callback + CMS handshake
public/
└── admin/                   # Level Editor (Sveltia CMS): index.html + config.yml
src/
├── assets/
│   └── fonts/               # Subsetted woff2 fonts (served via fonts API)
├── components/              # Reusable Astro components
│   ├── BaseHead.astro       # HTML head metadata + <Font> preloads
│   ├── Header.astro         # HUD-style site navigation
│   ├── QuestionBlock.astro  # Clickable ? block (only client JS)
│   ├── clouds/              # Pixel-art cloud SVGs
│   └── content/             # ArticleCard, ArticleCardGrid
├── content/
│   └── blog/                # Blog posts (Markdown)
├── layouts/
│   └── BlogPost.astro       # Blog post layout
├── lib/
│   └── wikilink-resolver.ts # Sätteri mdast plugin for [[wiki links]]
├── pages/                   # File-based routing (index, about, blog/, tags/, rss.xml.ts)
├── styles/
│   └── global.css           # Tailwind v4 @theme tokens + component layer
└── utils/                   # blog.ts, tags.ts, dateUtils.ts
```

## Performance Goals

- **Lighthouse 100/100** across all metrics
- **Static-first**: Zero JavaScript unless essential
- **Optimized fonts**: subsetted woff2 with preload + fallback metrics
- **Minimal CSS**: Leverage Tailwind's on-demand generation
- **Fast builds**: Astro 7's Rust compiler and Sätteri markdown pipeline
