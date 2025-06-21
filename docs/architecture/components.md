# UI Components Specification

## Overview

Component library for Jorge Herrera's Blog implementing a retro computer terminal aesthetic with modern web capabilities. All components follow atomic design principles and are built as Astro components with TypeScript props.

## Component Hierarchy

### Atomic Components (Smallest Building Blocks)

#### Button.astro
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  class?: string;
}
```

**Styling:**
- Monospace font consistency
- Retro terminal button aesthetics
- Hover states with subtle depth
- Focus indicators for accessibility

**Variants:**
- **Primary:** Main action buttons with accent color
- **Secondary:** Secondary actions with border styling
- **Ghost:** Minimal buttons for navigation

#### Tag.astro
```typescript
interface TagProps {
  name: string;
  href: string;
  count?: number;
  variant?: 'default' | 'active' | 'large';
  class?: string;
}
```

**Styling:**
- Pill-shaped or rectangular design
- Terminal-inspired color scheme
- Clickable hover states
- Size variations for different contexts

**Behavior:**
- Links to tag filter pages
- Visual indication of active/selected state
- Smooth hover transitions

### Molecular Components (Simple Groups)

#### ThemeToggle.astro
```typescript
interface ThemeToggleProps {
  position?: 'header' | 'footer' | 'floating';
  showLabels?: boolean;
  class?: string;
}
```

**Functionality:**
- System/Light/Dark mode switching
- localStorage persistence
- Visual state indicators
- Accessibility support

**Styling:**
- Retro switch aesthetic
- Clear visual state differentiation
- Integration with overall theme system

#### ArticleMetadata.astro
```typescript
interface ArticleMetadataProps {
  title: string;
  date: Date;
  tags: string[];
  readingTime?: number;
  showTags?: boolean;
  variant?: 'card' | 'header' | 'list';
}
```

**Display Elements:**
- Article title with proper heading hierarchy
- Publication date with semantic `<time>` element
- Tag list with clickable tag components
- Reading time estimation

#### CodeBlock.astro
```typescript
interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  class?: string;
}
```

**Features:**
- Syntax highlighting with Shiki
- Language detection and labeling
- Optional line numbers
- Terminal-style presentation
- Copy-to-clipboard functionality

### Organism Components (Complex Groups)

#### Header.astro
```typescript
interface HeaderProps {
  currentPath?: string;
  showSearch?: boolean;
  class?: string;
}
```

**Structure:**
```html
<header>
  <nav>
    <a href="/">Site Title</a>
    <ul>
      <li><a href="/blog">Articles</a></li>
      <li><a href="/tags">Tags</a></li>
      <li><a href="/about">About</a></li>
    </ul>
    <ThemeToggle />
  </nav>
</header>
```

**Styling:**
- Minimal header design
- Retro typography for site title
- Responsive navigation
- Active state indicators

#### ArticleCard.astro
```typescript
interface ArticleCardProps {
  article: {
    id: string;
    slug: string;
    data: {
      title: string;
      date: Date;
      tags: string[];
    };
  };
  showExcerpt?: boolean;
  variant?: 'grid' | 'list';
  class?: string;
}
```

**Layout:**
- Card container with subtle depth
- Article metadata at top
- Excerpt or content preview
- Tag list at bottom
- Hover effects for interactivity

**Responsive Behavior:**
- Adapts to grid or list layouts
- Maintains readability across screen sizes
- Touch-friendly on mobile devices

#### ArticleContent.astro
```typescript
interface ArticleContentProps {
  article: {
    id: string;
    slug: string;
    body: string;
    data: {
      title: string;
      date: Date;
      tags: string[];
    };
  };
  showTableOfContents?: boolean;
  showRelatedArticles?: boolean;
}
```

**Structure:**
- Article header with metadata
- Main content with optimized typography
- Code block handling
- Related articles section
- Tag navigation

#### TagCloud.astro
```typescript
interface TagCloudProps {
  tags: Array<{
    name: string;
    count: number;
    articles: Article[];
  }>;
  variant?: 'cloud' | 'list' | 'grid';
  maxTags?: number;
  sortBy?: 'name' | 'count' | 'recent';
}
```

**Display Options:**
- **Cloud:** Visual tag cloud with size variations
- **List:** Simple list format for mobile
- **Grid:** Organized grid layout

**Functionality:**
- Tag frequency visualization
- Clickable navigation to tag pages
- Sorting and filtering options

### Template Components (Page-Level)

#### BaseLayout.astro
```typescript
interface BaseLayoutProps {
  title: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  class?: string;
}
```

**HTML Document Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags, title, description -->
  <!-- Theme configuration -->
  <!-- View transitions -->
  <!-- Fonts and styles -->
</head>
<body>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</body>
</html>
```

**Features:**
- SEO optimization with meta tags
- Theme system initialization
- View transitions configuration
- Responsive design foundation

#### BlogPost.astro
```typescript
interface BlogPostProps {
  frontmatter: {
    title: string;
    date: Date;
    tags: string[];
  };
}
```

**Layout Structure:**
- BaseLayout wrapper
- Article header with metadata
- Main content area
- Related articles section
- Navigation elements

#### ArchivePage.astro
```typescript
interface ArchivePageProps {
  articles: Article[];
  currentTag?: string;
  pagination?: {
    page: number;
    totalPages: number;
  };
}
```

**Features:**
- Article list display
- Tag filtering interface
- Pagination controls
- Search and sorting options

## Styling System

### Design Tokens (Tailwind Configuration)

**Colors:**
```javascript
colors: {
  'terminal': {
    'amber': { 50: '#fffbeb', 500: '#f59e0b', 900: '#78350f' },
    'green': { 50: '#f0fdf4', 500: '#10b981', 900: '#14532d' },
    'mono': { 50: '#f8fafc', 500: '#64748b', 900: '#0f172a' }
  },
  'lego': {
    'red': '#d40000', 'blue': '#0055aa', 'yellow': '#ffcc00', 'green': '#00af33'
  }
}
```

**Typography:**
```javascript
fontFamily: {
  'mono': ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'monospace']
},
fontSize: {
  'xs': '0.75rem',    // 12px
  'sm': '0.875rem',   // 14px  
  'base': '1rem',     // 16px
  'lg': '1.125rem',   // 18px
  'xl': '1.25rem',    // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem'    // 36px
}
```

### Component Classes

**Base Component Classes:**
```css
.component-base {
  @apply font-mono text-base leading-relaxed;
  @apply text-slate-900 dark:text-slate-100;
}

.component-interactive {
  @apply transition-colors duration-200 ease-in-out;
  @apply hover:bg-slate-100 dark:hover:bg-slate-800;
  @apply focus:outline-none focus:ring-2 focus:ring-terminal-amber-500;
}

.component-card {
  @apply bg-white dark:bg-slate-900;
  @apply border border-slate-200 dark:border-slate-700;
  @apply rounded-lg p-6;
  @apply shadow-sm hover:shadow-md transition-shadow;
}
```

**Retro Aesthetic Classes:**
```css
.retro-terminal {
  @apply bg-black text-terminal-amber-400;
  @apply font-mono text-sm leading-tight;
  @apply p-4 rounded border-2 border-terminal-amber-600;
}

.retro-button {
  @apply bg-slate-800 text-terminal-amber-400;
  @apply border-2 border-terminal-amber-600;
  @apply px-4 py-2 font-mono text-sm;
  @apply hover:bg-terminal-amber-400 hover:text-black;
  @apply transition-colors duration-150;
}

.lego-accent {
  @apply relative;
  @apply before:absolute before:top-0 before:left-0;
  @apply before:w-2 before:h-full before:bg-lego-red;
  @apply before:rounded-l;
}
```

## Accessibility Guidelines

### Keyboard Navigation
- All interactive components support keyboard navigation
- Logical tab order throughout component hierarchy
- Skip links for main content access
- Escape key support for modal/overlay components

### Screen Reader Support
- Semantic HTML structure in all components
- ARIA labels and descriptions where needed
- Proper heading hierarchy
- Alternative text for visual elements

### Color and Contrast
- WCAG 2.1 AA compliance across all theme modes
- 4.5:1 contrast ratio for normal text
- 3:1 contrast ratio for large text and UI components
- Color-independent information conveyance

## Component Testing

### Unit Testing
- Props validation and type checking
- Rendering output verification
- Accessibility compliance testing
- Theme switching functionality

### Integration Testing
- Component interaction testing
- Data flow validation
- Navigation functionality
- Theme persistence testing

### Visual Testing
- Component appearance across themes
- Responsive behavior validation
- Browser compatibility testing
- Animation and transition verification

## Performance Considerations

### Bundle Size Optimization
- Tree-shaking for unused component code
- Minimal JavaScript for interactive components
- CSS optimization with Tailwind JIT
- Image optimization for any component assets

### Runtime Performance
- Efficient re-rendering strategies
- Lazy loading for non-critical components
- Optimized event handling
- Memory leak prevention

### Loading Strategies
- Critical CSS inlining for above-the-fold components
- Progressive enhancement approach
- Graceful degradation for older browsers
- Efficient font loading with proper fallbacks

## Development Guidelines

### Component Creation
1. Define TypeScript interface for props
2. Implement Astro component with proper structure
3. Add Tailwind classes following design system
4. Include accessibility attributes
5. Document component usage and examples

### Naming Conventions
- PascalCase for component files (ArticleCard.astro)
- camelCase for prop names
- kebab-case for CSS classes
- Descriptive names that reflect functionality

### Code Organization
```
src/components/
├── layout/          # Layout components (Header, Footer, BaseLayout)
├── content/         # Content display components
├── navigation/      # Navigation and discovery components
├── ui/              # Basic UI components (Button, Tag, etc.)
└── templates/       # Page template components
```

### Best Practices
- Single responsibility principle for each component
- Props validation with TypeScript
- Consistent styling with design system
- Accessibility-first development
- Performance-conscious implementation