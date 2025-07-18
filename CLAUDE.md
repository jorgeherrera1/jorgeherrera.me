# Jorge Herrera's Mario-Themed Personal Blog

A static-first personal blog built with Astro and styled with a Super Mario Bros theme using modern CSS techniques.

## Project Overview

- **Static-only Astro site** - Never add React, Vue, or other frameworks
- **Minimal JavaScript** - Ship the least JS possible, use Astro's static-first approach  
- **Personal website** - Optimized for latest browsers only, no backwards compatibility needed
- **Modern CSS bleeding-edge** - Use cutting-edge CSS features regardless of adoption
- **Tech stack**: Astro, Tailwind CSS v4, TypeScript, Markdown

## Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally |
| `npm run astro` | Run Astro CLI commands |

## Modern CSS & Tailwind v4 Guidelines

### Core Principles
- **Use @theme directive** for custom theme definitions (latest Tailwind approach)
- **Prefer utility classes** over custom CSS classes whenever possible
- **Use @utility directive** for reusable component patterns (like `mario-container`)
- **Use @apply directive** when grouping utilities is necessary
- **Never create custom CSS classes** if achievable with Tailwind utilities
- **Embrace modern CSS**: Use Container Queries, CSS Grid subgrid, `:has()`, `@layer`, CSS nesting, etc.
- **No browser fallbacks** - Use latest CSS features without polyfills or vendor prefixes

### Styling Approach
```css
/* ✅ Good: Use @theme for design tokens */
@theme {
  --color-mario-red: #cc3333;
  --font-primary: "Press Start 2P", monospace;
}

/* ✅ Good: Use @utility for complex reusable patterns */
@utility mario-container {
  background-color: var(--color-mario-container-bg);
  border-top: 4px solid var(--color-mario-border-light);
  /* ... */
}

/* ❌ Avoid: Custom CSS classes when utilities can achieve the same */
.custom-button { /* Use Tailwind utilities instead */ }
```

## Code Style & Conventions

### File Structure
- **Components**: Pure Astro components (`.astro` files only)
- **Blog posts**: Markdown files in `src/content/blog/`
- **Layouts**: Astro layout files in `src/layouts/`
- **Utilities**: TypeScript utilities in `src/utils/`

### Naming Conventions
- **Blog posts**: `kebab-case.md` 
- **Components**: `PascalCase.astro`
- **Utilities**: `camelCase.ts`
- **Gaming terminology**: Use Mario/gaming terms consistently (levels, power-ups, etc.)

### TypeScript Guidelines
- **Strict type checking** with proper imports from `astro:content`
- **Type imports**: Use `import type` for type-only imports
- **Content collections**: Always use proper `CollectionEntry<'blog'>` types

Example:
```typescript
import type { CollectionEntry } from 'astro:content';

type Props = CollectionEntry<'blog'>['data'] & {
  relatedArticles?: CollectionEntry<'blog'>[];
};
```

## Mario Theme Implementation

### Color System
All colors defined in `@theme` directive using CSS custom properties:
- **Castle/Stone**: `--color-castle-black`, `--color-stone-gray`, etc.
- **Mario Classic**: `--color-mario-red`, `--color-coin-gold`, etc.
- **Semantic mapping**: `--color-bg-primary`, `--color-text-primary`, etc.

### Typography
- **Primary font**: "Press Start 2P" for authentic 8-bit feel
- **Monospace**: "JetBrains Mono" for code blocks
- **Responsive sizing**: Use `clamp()` for fluid typography

### Spacing System
8-bit inspired spacing using 4px base unit:
- `--spacing-1: 4px` (base unit)
- `--spacing-2: 8px` (2x base)
- `--spacing-4: 16px` (4x base)
- etc.

### Component Patterns
- **Mario Title Block**: Use `mario-container`, `mario-rivet`, `mario-title` utilities
- **Gaming terminology**: "LEVELS" for blog posts, "LEVEL MAP" for TOC
- **Pixel-perfect shadows**: `--shadow-pixel`, `--shadow-block` for retro depth

## Content Management

### Blog Posts
- **Location**: `src/content/blog/`
- **Format**: Markdown (`.md`) files only
- **Static generation**: All content pre-rendered at build time

### Frontmatter Schema
Required fields for all blog posts:
```yaml
---
title: "Your Post Title"           # string
date: "2024-01-15"                # YYYY-MM-DD format
tags:                             # array of strings
  - "JavaScript"
  - "Web Development"
---
```

### Content Collections
Type-safe content using Zod schema validation:
```typescript
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: () => z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([])
  }),
});
```

## Architecture Principles

### Static-First Approach
- **All pages pre-rendered** at build time
- **No client-side frameworks** - pure Astro components only
- **Minimal JavaScript** - only essential functionality (e.g., TOC highlighting)
- **Component islands**: Use only when absolutely necessary

### Modern Web Standards
- **Latest CSS features**: Use without fallbacks or vendor prefixes
- **Modern layout**: CSS Grid, Flexbox, Container Queries
- **Advanced selectors**: `:has()`, `:is()`, `:where()` for clean styling
- **Performance-first**: Target Lighthouse 100/100 scores

### Project Structure
```
src/
├── components/           # Reusable Astro components
│   ├── BaseHead.astro   # HTML head metadata
│   ├── Header.astro     # Site navigation
│   └── MarioTitleBlock.astro # Themed title component
├── content/
│   └── blog/            # Blog posts (Markdown)
├── layouts/
│   └── BlogPost.astro   # Blog post layout
├── pages/               # File-based routing
├── styles/
│   └── global.css       # @theme and @utility definitions
└── utils/               # TypeScript utilities
```

## Gaming Theme Guidelines

### Visual Elements
- **Pixel-perfect borders**: Use `border-2` and `border-4` for retro feel
- **8-bit shadows**: `shadow-pixel`, `shadow-block` for depth
- **Gaming emojis**: 🏰, 🎮, 🗺️, 🎯 for visual hierarchy
- **Retro animations**: Use `--ease-retro`, `--ease-bounce` custom easings

### Component Design
- **Blocky aesthetics**: Minimal border radius (`--radius-sm: 2px`)
- **High contrast**: Dark castle theme with bright accent colors
- **Consistent spacing**: Always use 8-bit spacing system
- **Authentic feel**: "Press Start 2P" font throughout interface

## Performance Goals

- **Lighthouse 100/100** across all metrics
- **Static-first**: Zero JavaScript unless essential
- **Optimized images**: Use Astro's built-in image optimization
- **Minimal CSS**: Leverage Tailwind's purging capabilities
- **Fast builds**: Astro's efficient static generation

## 