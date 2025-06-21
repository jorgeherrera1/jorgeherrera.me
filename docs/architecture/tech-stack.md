# Tech Stack

## Definitive Tech Stack Selections

| Category       | Technology     | Version | Description                                    | Justification                                     |
| :------------- | :------------- | :------ | :--------------------------------------------- | :------------------------------------------------ |
| **Framework**  | Astro.js       | Latest  | Static site generator with content collections | Superior markdown processing, optimal performance |
| **Styling**    | Tailwind CSS   | Latest  | Utility-first CSS framework                    | Complete customization control, dynamic theming   |
| **Language**   | TypeScript     | Latest  | Type-safe development                          | Content validation, development productivity      |
| **Runtime**    | Node.js        | 20.x    | Development and build environment              | Modern JavaScript features support                |
| **Content**    | Markdown       | N/A     | Article format with frontmatter                | Simple, focused content creation                  |
| **Deployment** | Vercel         | N/A     | Static hosting with automatic builds           | Zero-config Astro support, optimal performance    |
| **Fonts**      | JetBrains Mono | Latest  | Primary monospace font                         | Excellent readability for code and prose          |
| **Icons**      | ASCII/Unicode  | N/A     | Text-based indicators                          | Maintains retro aesthetic                         |

## Modern Web Features Integration

### View Transitions API
- **Full implementation** without fallbacks for seamless page transitions
- **Retro-styled animations** that complement the terminal aesthetic
- **Named transitions** for specific UI elements

### CSS Container Queries
- **Component-level responsive design** for modular layouts
- **No feature detection needed** - assume full browser support
- **Advanced container styling** for theme-aware components

### Cutting-Edge CSS
- **CSS Cascade Layers** for organized styling hierarchy
- **OKLCH color space** for perceptually uniform colors
- **CSS Nesting** without preprocessors
- **Modern selectors** including `:has()` for contextual styling

### Latest JavaScript Features
- **ES2024+ syntax** including top-level await and import assertions
- **Latest array methods** for content processing
- **Modern View Transitions API** with latest syntax

## Infrastructure and Deployment

- **Cloud Provider:** Vercel (recommended) with automatic Git deployments
- **Core Services:** Static hosting, CDN, automatic SSL certificate management
- **Deployment Strategy:** Git-based continuous deployment triggered by content commits
- **Environments:** Production deployment to jorgeherrera.me
- **Environment Promotion:** Direct deployment from main branch
- **Rollback Strategy:** Git-based rollback through Vercel dashboard

### Build Configuration

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://jorgeherrera.me',
  integrations: [tailwind(), sitemap()],
  experimental: { viewTransitions: true },
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
```