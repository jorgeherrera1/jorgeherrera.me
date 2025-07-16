# Tech Stack & Build System

## Core Technologies

- **Astro 5.11.0** - Static site generator with islands architecture (CSS framework)
- **TypeScript** - Type-safe development with strict null checks enabled
- **Tailwind CSS 4.1.10** - Utility-first CSS framework via Vite plugin
- **MDX** - Markdown with embedded components for rich content
- **Sharp** - Image optimization

## Architecture Constraints

- **100% Static Generation** - No backend, no server-side rendering
- **No Custom CSS** - All styling through Tailwind CSS @theme and utility classes only
- **Modern-First** - No backwards compatibility, no polyfills
- **Latest Browser Features** - Use cutting-edge HTML/CSS techniques

## Styling Framework

- **Tailwind CSS v4** - Primary and only styling solution
- **@theme Configuration** - Custom theme definitions for retro aesthetic
- **Utility Classes Only** - No custom CSS files beyond global font definitions
- **Monospaced Fonts** - JetBrains Mono as primary typeface

## Key Integrations

- **@astrojs/mdx** - MDX support for enhanced markdown
- **@astrojs/rss** - RSS feed generation
- **@astrojs/sitemap** - Automatic sitemap generation
- **@tailwindcss/typography** - Beautiful typography defaults

## Build Configuration

- **Module Type**: ESM (type: "module")
- **TypeScript Config**: Extends Astro strict config
- **Site URL**: https://jorgeherrera.me

## Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Content Management

- **Content Collections**: Type-safe blog posts with Zod schema validation
- **Frontmatter Schema**: title (string), date (Date), tags (string[])
- **File Formats**: Markdown (.md) and MDX (.mdx) supported
- **Content Location**: All blog posts in `src/content/blog/`
- **Article Generation**: Pure markdown to HTML conversion

## Performance Optimizations

- Static-first rendering with minimal JavaScript
- Font preloading for JetBrains Mono fonts
- Image optimization with Sharp
- Component islands for selective hydration