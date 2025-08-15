# Jorge Herrera's Mario-Themed Personal Blog

A static-first personal blog built with Astro 5.12.0 and styled with a Super Mario Bros theme using Tailwind CSS v4. The site is 100% static generation with no server-side rendering or client-side frameworks.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

Bootstrap, build, and run the repository:
- `npm install` -- takes 2-4 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
- `npm run build` -- takes 4-6 seconds. Fast build process with Astro static generation.
- Run development server: `npm run dev` -- starts in 1.4 seconds at http://localhost:4321
- Run production preview: `npm run preview` -- starts in 15-30ms at http://localhost:4321

**CRITICAL BUILD NOTES:**
- This is a STATIC-ONLY Astro site - never add React, Vue, or other frameworks
- Build is extremely fast (~6 seconds) - no need for long timeouts on build commands
- No testing framework exists - do not attempt to run tests
- No linting tools configured - do not attempt to run ESLint, Prettier, etc.

## Validation

**ALWAYS manually validate any changes via these scenarios:**
- Homepage loads: `curl -s -I http://localhost:4321/` should return HTTP 200
- Blog page loads: `curl -s http://localhost:4321/blog/` should return proper HTML with title
- RSS feed works: `curl -s -I http://localhost:4321/rss.xml` should return HTTP 200
- Build generates all pages: Check build output shows 17+ static pages generated
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
- **Astro 5.12.0** - Static site generator, islands architecture
- **TypeScript** - Strict null checks enabled, extends "astro/tsconfigs/strict"
- **Tailwind CSS v4** - Utility-first CSS with @theme directives
- **MDX Support** - Enhanced markdown with @astrojs/mdx
- **Sharp** - Image optimization
- **Static Generation** - No SSR, no client-side hydration

**Key Constraints:**
- Never add client-side frameworks (React, Vue, Svelte)
- Use only Tailwind utilities, never custom CSS classes
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
│   ├── fonts/             # JetBrains Mono font files
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
- Use `@utility` directive for complex reusable patterns (like `mario-container`)
- Prefer utility classes over custom CSS in ALL cases
- Never create custom CSS classes if achievable with Tailwind

**Mario Theme Elements:**
- Color system: Castle/stone grays, Mario red, coin gold
- Typography: "Press Start 2P" for authentic 8-bit feel, "JetBrains Mono" for code
- Spacing: 8-bit inspired using 4px base units
- Gaming terminology: "LEVELS" for blog posts, "LEVEL MAP" for navigation

## Common Development Tasks

**Adding New Blog Posts:**
1. Create `.md` file in `src/content/blog/` with proper frontmatter
2. Use kebab-case naming convention
3. Include required title, date, tags fields
4. Content automatically appears on blog index and RSS feed

**Component Development:**
- Create `.astro` files in `src/components/`
- Use PascalCase naming (e.g., `MyComponent.astro`)  
- Follow Mario theme naming when appropriate
- Use TypeScript with proper Astro imports

**Styling Changes:**
- Edit `src/styles/global.css` for @theme definitions
- Use only Tailwind utilities in component files
- Reference Mario color variables: `--color-mario-red`, `--color-castle-black`

## Environment & Dependencies

**Blog Sync (Optional):**
- Script: `npm run sync-blog` 
- Requires: `.env.local` file with `OBSIDIAN_BLOG_PATH` variable
- Purpose: Sync blog posts from Obsidian vault
- Fails gracefully if .env.local doesn't exist

**Dependencies Management:**
- Package manager: npm (package-lock.json committed)
- Main dependencies: Astro, Tailwind CSS v4, Sharp, MDX
- No dev dependencies for testing or linting

## Troubleshooting

**Common Issues:**
- `astro check` command requires `@astrojs/check` and `typescript` packages (not installed)
- Sync blog fails without `.env.local` - expected behavior for external contributors  
- Build failures usually indicate TypeScript errors or invalid frontmatter

**Build Validation:**
- Successful build shows "17 page(s) built" or similar
- Check for static route generation in build output
- Verify dist/ directory contains index.html and other static files

## Performance & Optimization

**Site Characteristics:**
- Static-first: Zero JavaScript by default
- Fast builds: ~6 seconds total build time
- Quick dev server: 1.7 second startup
- Optimized images: Sharp integration for automatic optimization
- SEO ready: Automatic sitemap and RSS feed generation

**When Making Changes:**
- Build times are fast - no need to skip builds
- Always test dev server functionality after changes
- Verify RSS feed updates with new content
- Check that static generation includes new routes

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