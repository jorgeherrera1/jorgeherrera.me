# Project Structure

```plaintext
jorgeherrera.me/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated deployment workflow
├── public/
│   ├── fonts/                      # Monospace font files
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BaseLayout.astro
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── content/
│   │   │   ├── ArticleCard.astro
│   │   │   ├── ArticleCardGrid.astro
│   │   │   ├── ArticleList.astro
│   │   │   ├── ArticleListItem.astro
│   │   │   └── ArticleContent.astro
│   │   ├── navigation/
│   │   │   ├── TagCloud.astro
│   │   │   ├── Tag.astro
│   │   │   └── Breadcrumb.astro
│   │   └── ui/
│   │       ├── ThemeToggle.astro
│   │       └── CodeBlock.astro
│   ├── content/
│   │   └── blog/                   # Markdown articles
│   │       ├── thoughts-on-standardization-of-web.md
│   │       └── ...
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── BlogPost.astro
│   │   └── ArchivePage.astro
│   ├── pages/
│   │   ├── index.astro             # Homepage (cards)
│   │   ├── blog/
│   │   │   ├── index.astro         # Archive (list)
│   │   │   └── [...slug].astro     # Individual posts
│   │   ├── tags/
│   │   │   ├── index.astro
│   │   │   └── [tag].astro
│   │   ├── about.astro
│   │   └── rss.xml.js
│   ├── styles/
│   │   ├── global.css              # @import "tailwindcss"
│   │   └── theme.css               # CSS custom properties
│   ├── utils/
│   │   ├── blog.ts
│   │   └── tags.ts
│   └── types/
│       └── blog.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── vercel.json
└── package.json
```

## Component Architecture

### Core System Components

**Content Layer:**
- **Astro Content Collections** - Handles markdown processing and frontmatter validation
- **Tag Processing System** - Automatically extracts and organizes content by tags
- **Article Metadata Generator** - Processes dates, generates URLs from filenames

**Presentation Layer:**
- **Layout Components** - BaseLayout, Header, Footer for consistent structure
- **Content Components** - ArticleCard, ArticleList, ArticleContent for content display
- **Navigation Components** - TagCloud, TagFilter, Breadcrumb for content discovery
- **UI Components** - ThemeToggle, Tag, CodeBlock for interactive elements

**Enhancement Layer:**
- **View Transitions Manager** - Handles smooth page transitions
- **Theme System** - Manages dynamic color theming and mode switching
- **Modern CSS Features** - Container queries, advanced color functions

## Data Models

### Article Data Model

```typescript
export interface Article {
  id: string;
  slug: string; // Generated from filename
  body: string;
  data: {
    title: string;
    date: Date;
    tags: string[];
  };
}
```

### Tag Data Model

```typescript
export interface Tag {
  name: string;
  count: number;
  articles: Article[];
}
```

## API Reference

### Content Collections API

**Blog Collection Schema:**

```typescript
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

**Example Article Frontmatter:**

```yaml
---
title: Thoughts on standardization of the web
date: 2022-12-27
tags:
  - Web
---
```

### Content Processing APIs

**Core Blog Functions:**

```typescript
// Get all articles, sorted by date
export async function getAllArticles(): Promise<Article[]>

// Get articles by specific tag
export async function getArticlesByTag(tagName: string): Promise<Article[]>

// Get all tags with article counts
export async function getAllTags(): Promise<Tag[]>
```