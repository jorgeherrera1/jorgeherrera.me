# Project Structure & Organization

## Root Directory Structure

```
├── public/                 # Static assets (fonts, favicon, etc.)
├── src/                   # Source code
├── docs/                  # Project documentation
├── .astro/               # Astro build artifacts and type definitions
├── dist/                 # Production build output
└── node_modules/         # Dependencies
```

## Source Code Organization (`src/`)

```
src/
├── components/           # Reusable Astro components
│   ├── BaseHead.astro   # HTML head metadata component
│   ├── Header.astro     # Site navigation
│   ├── content/         # Blog-specific components
│   └── ui/              # UI components
├── content/
│   └── blog/            # Blog posts (Markdown/MDX files)
├── layouts/             # Page layout templates
├── pages/               # File-based routing
│   ├── index.astro      # Homepage
│   ├── about.astro      # About page
│   ├── blog/            # Blog routes
│   └── tags/            # Tag-based filtering pages
├── styles/              # Global CSS styles
└── utils/               # Utility functions and helpers
```

## Page Layout Requirements

### Homepage (`pages/index.astro`)
- **Header**: 
  - Left: Blog title "JorgeHerrera.me" (link to homepage)
  - Right: Navigation ("All Articles", "About Me")
- **Main Content**:
  - **Section 1**: 50/50 grid layout
    - Column 1: Personal description
    - Column 2: Tag cloud
  - **Section 2**: 3-column grid
    - Display latest 3 articles as horizontal cards

### All Articles Page (`pages/blog/index.astro`)
- **Layout**: Vertical list of article cards
- **Sorting**: Chronological order (newest to oldest)
- **Content**: Article previews with metadata

### Individual Article Page (`pages/blog/[...slug].astro`)
- **Article Header**: Date and tags displayed below title
- **Tags**: Rendered as badges
- **Floating Panel**: Always-visible right sidebar with:
  - Article structure (headings/subheadings)
  - Clickable navigation to sections
- **Content**: Optimized for readability with proper spacing and typography

## Key Conventions

### File Naming
- **Components**: PascalCase (e.g., `BaseHead.astro`, `ArticleCard.astro`)
- **Pages**: kebab-case (e.g., `about.astro`, `[...slug].astro`)
- **Utilities**: camelCase (e.g., `blog.ts`, `tags.ts`)
- **Blog Posts**: kebab-case (e.g., `the-web-is-going-back-to-the-basis.md`)

### Component Organization
- **Base components**: Root of `components/` directory
- **Content components**: `components/content/` for blog-specific UI
- **UI components**: `components/ui/` for reusable interface elements

### Content Structure
- **Blog posts**: All in `src/content/blog/` directory
- **Required frontmatter**: title, date, tags
- **File formats**: `.md` or `.mdx` extensions supported

### Utility Functions
- **Blog utilities**: `src/utils/blog.ts` - article fetching, sorting, filtering
- **Tag utilities**: `src/utils/tags.ts` - tag normalization and processing
- **Global constants**: `src/consts.ts` - site-wide configuration

### Routing Patterns
- **Static pages**: Direct `.astro` files in `pages/`
- **Dynamic routes**: Square bracket notation (e.g., `[tag].astro`, `[...slug].astro`)
- **Nested routes**: Directory structure mirrors URL structure

### Asset Management
- **Fonts**: `public/fonts/` - JetBrains Mono and Atkinson font families
- **Static assets**: `public/` directory for direct serving
- **Styles**: Global CSS in `src/styles/global.css`