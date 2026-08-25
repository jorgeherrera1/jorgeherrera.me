# Jorge Herrera's Personal Blog

Welcome to my personal blog! This is where I share my thoughts on web development, technology, and software engineering.

## Tech Stack

This blog is built with modern web technologies:

- **[Astro 7](https://astro.build)** - Static site generator (Rust compiler, Sätteri markdown pipeline)
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework, configured in CSS
- **Markdown** - Posts are plain `.md` files with Obsidian-style `[[wiki links]]`
- **TypeScript** - Type-safe development, checked with `astro check`

## Features

- ✅ Fast, static-first architecture with Astro
- ✅ Responsive design with Tailwind CSS
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Automatic sitemap generation
- ✅ RSS feed support
- ✅ Syntax highlighting for code blocks
- ✅ Tag-based article organization
- ✅ Wiki links between posts (`[[Post Title]]` resolves to the post's URL)
- ✅ Self-hosted, subsetted woff2 fonts with preloads via Astro's fonts API

## Architecture

This blog follows Astro's **islands architecture**, which delivers lightning-fast performance by shipping minimal JavaScript to the browser.

### Project Structure

```text
├── public/                    # Static assets (fonts, favicon, etc.)
├── src/
│   ├── components/           # Reusable Astro components
│   │   ├── BaseHead.astro   # HTML head metadata
│   │   ├── Header.astro     # Site navigation
│   │   └── content/         # Blog-specific components
│   ├── content/
│   │   └── blog/            # Blog posts (Markdown)
│   ├── layouts/
│   │   └── BlogPost.astro   # Blog post layout template
│   ├── pages/               # File-based routing
│   │   ├── index.astro      # Homepage
│   │   ├── about.astro      # About page
│   │   ├── blog/            # Blog listing & individual posts
│   │   └── tags/            # Tag-based filtering
│   ├── assets/fonts/        # Self-hosted woff2 fonts
│   ├── lib/                 # Sätteri markdown plugins (wikilink resolver)
│   ├── styles/              # Global CSS (Tailwind v4 @theme config)
│   └── utils/               # Utility functions
└── astro.config.ts          # Astro configuration (fonts, markdown, sitemap)
```

### Key Architectural Decisions

- **Static-first**: All pages are pre-rendered at build time for optimal performance
- **Minimal JavaScript**: pure Astro components; a single tiny script powers the question blocks
- **Content collections**: Blog posts are managed through Astro's type-safe content layer (glob loader)
- **Tailwind CSS v4**: CSS-first configuration via `@theme` in `src/styles/global.css` — no tailwind.config.js
- **Sätteri markdown**: Astro 7's native Rust pipeline with wikilinks enabled; a small mdast plugin maps `[[Page Name]]` to `/blog/page-name/`

## How to Add New Blog Posts

Adding a new blog post is straightforward:

1. **Create a new file** in the `src/content/blog/` directory with a `.md` extension
2. **Add frontmatter** at the top of the file with required metadata:

```yaml
---
title: "Your Post Title"
date: "2024-01-15"
tags:
  - "JavaScript"
  - "Web Development"
---
```

3. **Write your content** below the frontmatter using Markdown (link to other posts with `[[Their Title]]`)
4. **Save the file** - Astro will automatically generate the blog post page

### ✍️ Level Editor (write posts from the website)

Posts can also be written straight from the browser — including on mobile — via
the **Level Editor** at [`/admin/`](https://jorgeherrera.me/admin/) (or through
the warp pipe at the bottom of the homepage). It runs
[Sveltia CMS](https://github.com/sveltia/sveltia-cms), a lightweight, mobile-first,
Git-based CMS:

- **Sign in with GitHub** — no custom accounts; only users with write access to
  this repo can publish.
- **Saving a post commits it to `main`** via the GitHub API, and Vercel picks up
  the commit and redeploys. No database anywhere.
- The site itself stays fully static: the CMS is a single script loaded on
  `/admin/` only, and the OAuth handshake lives in two Vercel serverless
  functions (`api/auth.ts`, `api/callback.ts`).

#### One-time setup

1. Create a **GitHub OAuth App** ([Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)):
   - Homepage URL: `https://jorgeherrera.me`
   - Authorization callback URL: `https://jorgeherrera.me/api/callback`
2. In the Vercel project, add two environment variables (Production):
   - `OAUTH_GITHUB_CLIENT_ID` — the OAuth App's client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` — a generated client secret
3. Redeploy. Visit `/admin/`, hit **Sign in with GitHub**, and start writing.

#### Local editing

On `localhost` the CMS offers **Work with local repository** (no OAuth needed):
it edits the files in your working copy directly via the File System Access API.

#### 🔄 Two-way sync with Obsidian

`npm run sync-blog` is a two-way, additive sync between the Obsidian vault and
`src/content/blog/`:

- Posts that exist on only one side are copied to the other — Level Editor
  posts flow back into the vault, vault drafts flow into the repo.
- **The sync never deletes anything.** To remove a post, delete it in both
  places yourself and commit.
- Posts are matched by URL slug (github-slugger, same as the site's routes),
  not by filename — the vault's `Title verbatim.md` and the Level Editor's
  `Title-verbatim.md` are recognized as the same post, no duplicates.
- If both sides changed the same post, the newer edit wins and the losing
  version is kept next to the winner as `<file>.md.sync-backup` (gitignored,
  invisible to Astro and Obsidian) — nothing is ever lost silently.
- The script warns when `origin/main` has blog commits you haven't pulled
  (fresh Level Editor posts); `git pull` first so they can sync into the vault.
- `npm run commit-new-blog-posts` still commits new posts only; edits to
  existing posts are committed manually for now.

`npm test` runs the sync's verification suite (Node's built-in test runner,
temp directories only): a file placed on either side must appear on the other
with nothing deleted or clobbered in either direction.

### Frontmatter Schema

All blog posts must include these frontmatter fields:

- `title` (string): The post title
- `date` (string): Publication date in YYYY-MM-DD format  
- `tags` (array): List of tags for categorization

### Example Blog Post

```markdown
---
title: "Getting Started with Astro"
date: "2024-01-15"
tags:
  - "Astro"
  - "JavaScript"
  - "Static Sites"
---

# Getting Started with Astro

Astro is a modern static site generator that delivers exceptional performance...

## Key Benefits

- Lightning fast loading
- SEO optimized
- Developer friendly

// Your markdown content here
```

## Development Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run check`           | Type-check the project with `astro check`        |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord Community](https://astro.build/chat)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)