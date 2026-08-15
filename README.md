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