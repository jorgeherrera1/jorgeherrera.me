# Jorge Herrera's Mario-Themed Personal Blog

A static-first personal blog built with Astro 5.13.2 and styled with a Super Mario Bros theme using Tailwind CSS 4.1.10. The site is 100% static generation with no server-side rendering or client-side frameworks.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

Bootstrap, build, and run the repository:
- `npm install` -- takes 2-4 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
- `npm run build` -- takes 4-6 seconds. Fast build process with Astro static generation.
- Run development server: `npm run dev` -- starts in less than 2 seconds seconds at http://localhost:4321
- Run production preview: `npm run preview` -- starts in less than 1 second at http://localhost:4321 (this requires a built project)

**CRITICAL BUILD NOTES:**
- This is a STATIC-ONLY Astro site - never add React, Vue, or other frameworks
- No testing framework exists - do not attempt to run tests
- No linting tools configured - do not attempt to run ESLint, Prettier, etc.

## Validation

**ALWAYS manually validate any changes via these scenarios:**
- Homepage loads: `curl -s -I http://localhost:4321/` should return HTTP 200
- Blog page loads: `curl -s http://localhost:4321/blog/` should return proper HTML with title
- Build generates all pages: Check build output shows all the different static pages generated
- **NEW CONTENT VALIDATION**: After adding blog posts, verify:
  - Build page count increases appropriately  
  - New post accessible at `/blog/post-slug/` URL
  - Tags generate individual tag pages at `/tags/tag-name/`
  - RSS feed includes new content
- **MANUAL TESTING REQUIREMENT**: After making changes, start dev/preview server and manually verify:
  - Navigation works between pages
  - Blog post listing displays correctly
  - Individual blog posts render properly
  - Tag filtering functionality works
  - Responsive design maintains Mario theme

## Architecture & Tech Stack

**Core Technologies:**
- **Astro 5.13.2** - Static site generator
- **TypeScript** - Strict null checks enabled, extends "astro/tsconfigs/strict"
- **Tailwind CSS 4.1.10** - Utility-first CSS with @theme directives
- **MDX Support** - Enhanced markdown with @astrojs/mdx
- **Sharp** - Image optimization
- **Static Generation** - No SSR, no client-side hydration

**Key Constraints:**
- Never add client-side frameworks (React, Vue, Svelte)
- Use only Tailwind utilities, never custom CSS classes
- Use ONLY colors defined in the @theme section of `global.css`
- Modern CSS only - no browser fallbacks or polyfills needed
- Mario gaming theme - use retro/gaming terminology throughout

## Project Structure & Navigation

```
├── src/
│   ├── components/           # Astro components (Mario-themed)
│   │   ├── BaseHead.astro   # HTML head metadata
│   │   ├── Header.astro     # Site navigation  
│   │   ├── Mario*.astro     # Mario-themed UI components
│   │   └── content/         # Blog-specific components
│   ├── content/
│   │   └── blog/           # Blog posts (.md/.mdx files)
│   ├── layouts/
│   │   └── BlogPost.astro  # Blog post layout
│   ├── pages/              # File-based routing
│   │   ├── index.astro     # Homepage
│   │   ├── about.astro     # About page
│   │   ├── blog/           # Blog routes
│   │   ├── tags/           # Tag-based routes  
│   │   └── rss.xml.js      # RSS feed generation
│   ├── styles/
│   │   └── global.css      # Tailwind @theme definitions
│   └── utils/              # TypeScript utilities
│       ├── blog.ts         # Blog content helpers
│       ├── dateUtils.ts    # Date formatting
│       └── tags.ts         # Tag processing
├── public/                 # Static assets
│   ├── fonts/             # font files
│   └── favicon.svg        # Site favicon
└── scripts/
    └── sync-blog.js       # Obsidian blog sync (requires .env.local)
```

**Key Configuration Files:**
- `astro.config.mjs` - Astro configuration with MDX, sitemap
- `src/content.config.ts` - Content collections schema (title, date, tags)
- `src/consts.ts` - Global site constants (SITE_TITLE, SITE_DESCRIPTION)
- `tsconfig.json` - TypeScript strict configuration

## Content Management

**Blog Posts:**
- Location: `src/content/blog/` directory
- Formats: `.md` and `.mdx` files supported
- Naming: kebab-case (e.g., `my-blog-post.md`)

**Required Frontmatter Schema:**
```yaml
---
title: "Your Post Title"        # string, required
date: "2024-01-15"             # YYYY-MM-DD format, required  
tags:                          # array of strings, required
  - "JavaScript"
  - "Web Development"
---
```

**Content Validation:**
- Schema enforced by Zod in `src/content.config.ts`
- Date automatically converted from string to Date object
- Tags array defaults to empty if not provided

## Styling Guidelines

**Tailwind CSS v4 Approach:**
- Use `@theme` directive for custom design tokens
- Use `@utility` directive for complex reusable patterns only when strictly necessary
- Prefer utility classes over custom CSS in ALL cases
- Never create custom CSS classes if achievable with Tailwind
- Use color palette and typography defined in `global.css`
- Add subtle animations for interactive elements (e.g., button hover effects)

**Mario Theme Elements:**
- Use Mario-themed colors for backgrounds, borders, and accents
- Apply pixelated font styles to headings and important text
- Incorporate retro gaming UI elements (e.g., buttons, cards)
- Use background patterns inspired by classic Mario levels
- Use 8-bit inspired icons and imagery throughout the site

## Common Development Tasks

**Component Development:**
- Create `.astro` files in `src/components/`
- Use PascalCase naming (e.g., `MyComponent.astro`)  
- Follow Mario theme naming when appropriate
- Use TypeScript with proper Astro imports

**Styling Changes:**
- Edit `src/styles/global.css` for @theme definitions
- Use only Tailwind utilities in component files
- Reference color variables defined in `src/styles/global.css`

## CI/CD Integration

**GitHub Actions:**
- `.github/workflows/claude.yml` - Claude Code integration
- `.github/workflows/claude-code-review.yml` - Automated PR reviews  
- No additional build/test automation configured

**Development Workflow:**
- Work locally with `npm run dev`
- Build and preview changes with `npm run build && npm run preview`
- Validate manually via browser testing
- Commit changes - no pre-commit hooks configured