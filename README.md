# Jorge Herrera's Personal Blog

Welcome to my personal blog! This is where I share my thoughts on web development, technology, and software engineering.

## Tech Stack

This blog is built with modern web technologies:

- **[Astro](https://astro.build)** - Static site generator with component islands architecture
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework for styling
- **[MDX](https://mdxjs.com)** - Markdown with embedded React components
- **TypeScript** - Type-safe JavaScript development

## Features

- ✅ Fast, static-first architecture with Astro
- ✅ Responsive design with Tailwind CSS
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Automatic sitemap generation
- ✅ RSS feed support
- ✅ Syntax highlighting for code blocks
- ✅ Tag-based article organization

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
│   │   └── blog/            # Blog posts (Markdown/MDX)
│   ├── layouts/
│   │   └── BlogPost.astro   # Blog post layout template
│   ├── pages/               # File-based routing
│   │   ├── index.astro      # Homepage
│   │   ├── about.astro      # About page
│   │   ├── blog/            # Blog listing & individual posts
│   │   └── tags/            # Tag-based filtering
│   ├── styles/              # Global CSS styles
│   └── utils/               # Utility functions
├── astro.config.mjs         # Astro configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

### Key Architectural Decisions

- **Static-first**: All pages are pre-rendered at build time for optimal performance
- **Component islands**: Interactive components are hydrated only when needed
- **Content collections**: Blog posts are managed through Astro's type-safe content system
- **Tailwind CSS**: Utility-first styling for rapid development and consistent design
- **MDX support**: Enhanced Markdown with embedded components for rich content

## How to Add New Blog Posts

Adding a new blog post is straightforward:

1. **Create a new file** in the `src/content/blog/` directory with a `.md` or `.mdx` extension
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

3. **Write your content** below the frontmatter using Markdown or MDX syntax
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
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord Community](https://astro.build/chat)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)