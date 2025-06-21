# Frontend Architecture

## Overview

Frontend architecture for Jorge Herrera's Blog implementing a retro computer terminal aesthetic using modern web technologies. Built on Astro.js static site generation with Tailwind CSS for styling and TypeScript for type safety.

## Architecture Patterns

### Static Site Generation (SSG)
- **Pre-built pages** for maximum performance and simplicity
- **Build-time processing** of all content and assets
- **Zero server-side dependencies** for long-term sustainability

### Component Composition
- **Reusable Astro components** following atomic design principles
- **Layout components** for consistent page structure
- **Content components** for article display and organization
- **UI components** for interactive elements

### Theme-Driven Design
- **Dynamic color theming** through CSS custom properties
- **Tailwind configuration** supporting multiple theme variations
- **System/light/dark mode** switching with preference persistence

## Component Architecture

### Layout Layer
```
BaseLayout.astro
├── Header.astro
│   ├── SiteTitle component
│   └── Navigation component
├── Main Content (slot)
└── Footer.astro
```

**BaseLayout.astro**
- Master page template with HTML document structure
- Theme management and CSS custom property definitions
- Meta tags and SEO optimization
- View transitions configuration

**Header.astro**
- Site navigation and branding
- Theme toggle controls
- Responsive navigation patterns

**Footer.astro**
- Minimal footer with essential links
- Maintains retro aesthetic consistency

### Content Layer
```
Article Display System
├── ArticleCardGrid.astro (Homepage)
├── ArticleList.astro (Archive)
├── ArticleListItem.astro (List entries)
├── ArticleCard.astro (Card entries)
└── ArticleContent.astro (Individual articles)
```

**ArticleCardGrid.astro**
- Homepage article display in card format
- Responsive grid layout using CSS Grid
- Hover effects and interactive states

**ArticleList.astro**
- Archive page with list-style article display
- Optimal for scanning large numbers of articles
- Integrated tag filtering

**ArticleContent.astro**
- Individual article rendering
- Typography optimization for reading
- Related articles suggestions via tags

### Navigation Layer
```
Content Discovery System
├── TagCloud.astro (Tag overview)
├── Tag.astro (Individual tag elements)
├── Breadcrumb.astro (Navigation context)
└── RelatedArticles.astro (Content connections)
```

**TagCloud.astro**
- Visual representation of all available tags
- Tag frequency visualization through sizing/color
- Clickable navigation to filtered views

**Tag.astro**
- Individual tag component with consistent styling
- Hover states and click interactions
- Integrates with retro aesthetic

### UI Layer
```
Interactive Elements
├── ThemeToggle.astro (Theme switching)
├── CodeBlock.astro (Syntax highlighting)
└── Button.astro (Standard interactions)
```

**ThemeToggle.astro**
- System/light/dark mode switching
- Preference persistence in localStorage
- Visual indicators for current theme

**CodeBlock.astro**
- Enhanced syntax highlighting with Shiki
- Language detection and proper formatting
- Retro terminal styling integration

## Styling Architecture

### Tailwind CSS Configuration

**Custom Theme Extensions:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace']
      },
      colors: {
        'terminal-amber': { /* custom amber variations */ },
        'terminal-green': { /* custom green variations */ },
        'lego-red': { /* LEGO-inspired accent colors */ }
      }
    }
  }
}
```

**CSS Custom Properties for Theming:**
```css
:root {
  --color-text-primary: theme('colors.slate.900');
  --color-text-secondary: theme('colors.slate.600');
  --color-bg-primary: theme('colors.white');
  --color-bg-secondary: theme('colors.slate.50');
  --color-accent: theme('colors.terminal-amber.500');
}

[data-theme="dark"] {
  --color-text-primary: theme('colors.slate.100');
  --color-text-secondary: theme('colors.slate.300');
  --color-bg-primary: theme('colors.slate.900');
  --color-bg-secondary: theme('colors.slate.800');
  --color-accent: theme('colors.terminal-amber.400');
}
```

### Typography System

**Monospace Typography Hierarchy:**
- **H1 (Article Titles):** `text-4xl font-bold` (2.25rem/36px)
- **H2 (Major Sections):** `text-3xl font-bold` (1.875rem/30px)
- **H3 (Subsections):** `text-2xl font-bold` (1.5rem/24px)
- **Body Text:** `text-base leading-relaxed` (1rem/16px, line-height: 1.6)
- **Code/Metadata:** `text-sm` (0.875rem/14px)

**Responsive Typography:**
```css
/* Mobile-first responsive scaling */
.heading-1 {
  @apply text-2xl md:text-3xl lg:text-4xl;
}

.body-text {
  @apply text-sm md:text-base;
  @apply leading-relaxed md:leading-loose;
}
```

## Modern Web Features Integration

### View Transitions API
```javascript
// In BaseLayout.astro <head>
<ViewTransitions />

// Custom transition animations for retro feel
<style>
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
  }
</style>
```

### CSS Container Queries
```css
/* Component-level responsive behavior */
.article-card {
  container-type: inline-size;
}

@container (min-width: 320px) {
  .article-card .tag-list {
    @apply flex flex-wrap;
  }
}
```

### Advanced Color Management
```css
/* OKLCH color space for perceptual uniformity */
.accent-color {
  color: oklch(0.7 0.15 180);
}

/* Dynamic color palette generation */
.theme-variant {
  --hue: 200;
  --primary: oklch(0.5 0.2 var(--hue));
  --primary-light: oklch(0.7 0.2 var(--hue));
  --primary-dark: oklch(0.3 0.2 var(--hue));
}
```

## State Management

### Theme State
- **localStorage persistence** for user theme preferences
- **System preference detection** via `prefers-color-scheme`
- **Reactive theme switching** without page reload

### Content State
- **Build-time content processing** via Astro Content Collections
- **Static content delivery** with no client-side state management
- **Tag filtering** through static page generation

## Performance Optimization

### Build-Time Optimizations
- **Static asset optimization** with Astro's built-in processing
- **CSS purging** with Tailwind's JIT compilation
- **Image optimization** for any future image content
- **JavaScript bundling** with tree-shaking

### Runtime Optimizations
- **Minimal JavaScript payload** (< 50KB)
- **Critical CSS inlining** for above-the-fold content
- **Lazy loading** for non-critical resources
- **View transitions** for smooth navigation without full page reloads

### Content Delivery
- **Static file serving** from CDN
- **Aggressive caching** for static assets
- **Optimized font loading** with font-display: swap
- **Compressed assets** with gzip/brotli

## Responsive Design Strategy

### Breakpoint System
- **Mobile-first approach** using Tailwind's responsive utilities
- **Component-level responsiveness** with container queries
- **Flexible typography** scaling with viewport size

### Device Optimization
- **Desktop (lg+):** Primary optimization target for reading
- **Tablet (md):** Maintain typography quality and navigation
- **Mobile (sm/base):** Focus on content accessibility and core functionality

## Accessibility Architecture

### Semantic HTML Structure
```html
<article>
  <header>
    <h1>Article Title</h1>
    <time datetime="2023-12-27">December 27, 2023</time>
  </header>
  <div><!-- Article content --></div>
  <footer>
    <ul role="list" aria-label="Article tags">
      <li><a href="/tags/web">Web</a></li>
    </ul>
  </footer>
</article>
```

### ARIA Implementation
- **Landmark regions** (`main`, `nav`, `article`)
- **Screen reader labels** for interactive elements
- **Focus management** for view transitions
- **Skip links** for keyboard navigation

### Color Contrast
- **WCAG 2.1 AA compliance** across all theme modes
- **4.5:1 minimum ratio** for normal text
- **3:1 minimum ratio** for large text and UI elements

## Error Handling

### Build-Time Errors
- **Content schema validation** with clear error messages
- **TypeScript compilation errors** with helpful diagnostics
- **Missing dependency detection** during build process

### Runtime Error Boundaries
- **404 page handling** with retro-styled error page
- **Broken link detection** during build
- **Graceful degradation** for unsupported features

## Development Workflow

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # TypeScript validation
```

### Component Development
- **Astro component isolation** for independent testing
- **Tailwind utilities** for rapid styling iteration
- **TypeScript props** for component API definition

## Integration Points

### Content Management
- **Markdown frontmatter** processing via Astro Content Collections
- **Tag system** integration across all components
- **URL generation** from content structure

### Build Pipeline
- **Astro build system** with optimized output
- **Tailwind CSS compilation** with purging
- **TypeScript transpilation** with strict checking

### Deployment
- **Static asset optimization** for CDN delivery
- **HTML/CSS/JS minification** for production
- **Source map generation** for debugging support