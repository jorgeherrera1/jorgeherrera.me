# Coding Standards

## TypeScript Configuration

- **Strict Mode:** All TypeScript strict flags enabled
- **Type Safety:** All content processing is fully typed
- **Import Strategy:** ES modules exclusively

## Astro Component Standards

- **File Naming:** PascalCase for components (ArticleCard.astro)
- **Component Props:** Typed interfaces for all component properties
- **Content Processing:** Build-time processing preferred over runtime

## CSS Standards

- **Tailwind First:** Use Tailwind utilities before custom CSS
- **CSS Custom Properties:** For dynamic theming values only
- **Class Naming:** Follow Tailwind conventions, use Tailwind classes

## Content Standards

- **Frontmatter:** Minimal required fields (title, date, tags)
- **URL Generation:** Automatic from filename without extension
- **Tag Format:** Simple string array, case-sensitive

## Security Best Practices

- **Static Generation:** No server-side code eliminates most security vectors
- **Content Sanitization:** Markdown processing includes automatic XSS prevention
- **HTTPS Enforcement:** Automatic SSL through hosting platform
- **Dependency Security:** Regular npm audit for vulnerability scanning
- **Build Security:** Content validation prevents malicious frontmatter injection

## Error Handling Strategy

- **General Approach:** Simple, clean error handling that maintains vintage aesthetic
- **Build-Time Validation:** Astro content collections provide automatic schema validation
- **404 Pages:** Minimal retro-styled error pages with clear navigation
- **Missing Content:** Simple fallback messages for empty states
- **Logging:** Standard console.error for development debugging
- **Error Prevention:** TypeScript and build-time validation prevent most runtime errors