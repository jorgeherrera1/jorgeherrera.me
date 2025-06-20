# PRD: jorgeherrera.me Blog

## Goals and Background Context

### Goals

- Establish a personal knowledge crystallization platform that transforms Zettelkasten insights into polished, publicly accessible articles
- Create a frictionless markdown-to-web publishing workflow that eliminates technical barriers to content creation
- Build an optimal reading experience using retro aesthetics and modern web technologies that encourages deep focus and knowledge retention
- Deploy a sustainable, long-term personal publishing system on jorgeherrera.me that Jorge will actively use and revisit for years
- Demonstrate cutting-edge web capabilities (view transitions, CSS container queries, advanced theming) within a minimal, distraction-free interface

### Background Context

Jorge has accumulated substantial expertise across systems architecture, software development, design, productivity, leadership, and management over years of professional experience. However, like many knowledge workers, this accumulated wisdom has become diluted over time without active reinforcement. Research consistently shows that writing concepts in one's own words is among the most effective methods for knowledge development and retention.

While Jorge maintains a private Zettelkasten system for personal knowledge management, he recognizes the value of transforming selected insights into refined, public articles. This blog will serve as a "knowledge crystallization laboratory" - a space where private notes evolve into polished thoughts that benefit both Jorge's long-term learning and any visitors who discover the content organically.

## Requirements

### Functional

- FR1: The system **must** automatically convert markdown files to optimized static web pages without requiring a CMS interface
- FR2: Users **must** be able to add new articles by placing markdown files directly in the source repository
- FR3: The blog **must** display articles with a tag system that allows clicking tags to filter and view related content
- FR4: The site **must** implement view transitions between pages for smooth navigation
- FR5: The system **must** provide dark/light/system mode switching using modern CSS techniques
- FR6: Articles **must** be displayed using monospaced typography optimized for reading technical and prose content
- FR7: The site **must** present a minimal, distraction-free interface focused entirely on content readability
- FR8: The system **must** support theme customization where providing primary colors automatically generates a complete color palette
- FR9: The blog **must** be deployable to jorgeherrera.me domain as a static site
- FR10: The site **must** implement CSS container queries and other cutting-edge web features where appropriate
- FR11: The system **must** provide responsive design that maintains retro aesthetic across all device sizes

### Non Functional

- NFR1: Page load times **must** be optimized for performance with static generation and modern build tools
- NFR2: The site **must** be maintainable by a solo developer without complex server infrastructure
- NFR3: The design **must** maintain a retro/vintage computer aesthetic while utilizing modern web capabilities
- NFR4: The codebase **must** be structured for long-term sustainability and easy updates as web standards evolve
- NFR5: The typography **must** optimize readability for both technical content (code, architecture) and prose
- NFR6: All animations and transitions **must** be subtle and enhance rather than distract from content consumption
- NFR7: The site **must** function without JavaScript for core reading functionality (progressive enhancement)

## User Interface Design Goals

### Overall UX Vision

Create a digital reading environment that evokes the focused, contemplative experience of reading content produced by a vintage typewriter or early computer terminal. The interface should feel like a carefully curated personal library where every element serves the singular purpose of enhancing content consumption and knowledge retention. The aesthetic should blend 1970s computer lab nostalgia with cutting-edge web capabilities, creating a timeless yet technologically sophisticated experience.

### Key Interaction Paradigms

- **Content-First Navigation**: All interactive elements should feel secondary to the reading experience, appearing only when needed
- **Typewriter-Inspired Flow**: Linear, deliberate progression through content that mimics the methodical pace of typewritten documents
- **Subtle Modern Enhancements**: View transitions and micro-animations that feel natural and enhance comprehension rather than call attention to themselves
- **Tag-Based Discovery**: Intuitive content exploration through clickable tag systems that reveal thematic connections between articles
- **Progressive Enhancement**: Core reading functionality available immediately, with modern features layering on top gracefully

### Core Screens and Views

- **Homepage/Article List**: Clean index of articles displayed in minimal cards or list format, similar to the reference screenshots, with visible tags and publication dates
- **Individual Article View**: Full-screen reading experience with optimal typography, subtle table of contents (for longer pieces), and related article suggestions via tags
- **Tag Filter View**: Focused display of all articles sharing specific tags, maintaining the same minimal aesthetic
- **About/Contact Page**: Simple personal introduction and contact information
- **Theme Customization Interface**: Minimal settings panel for color theme selection and reading preferences

### Accessibility: WCAG 2.1 AA

Full compliance with modern accessibility standards, with particular attention to:

- High contrast ratios that work with both retro aesthetic and readability requirements
- Keyboard navigation that feels natural for the typewriter-inspired interface
- Screen reader optimization for technical content and code snippets
- Focus management during view transitions

### Branding

- **Color Palette**: Monochromatic base with carefully selected accent colors inspired by vintage computer terminals (amber, green, cyan options)
- **Typography**: Primary monospaced font optimized for both code and prose readability
- **Visual Language**: Clean lines, generous whitespace, subtle grid systems that echo vintage technical documentation
- **Potential LEGO Integration**: Minimal, tasteful nods to LEGO aesthetics through color choices, geometric elements, or subtle modularity metaphors in content organization

### Target Device and Platforms

Web responsive design optimized for:

- **Primary**: Desktop/laptop reading (large screens for optimal article consumption)
- **Secondary**: Tablet reading experience that maintains typography quality
- **Tertiary**: Mobile reading that preserves content focus while adapting layout appropriately

## Technical Assumptions

### Repository Structure: Monorepo

Single repository containing both the blog content (markdown files) and the website source code. This approach simplifies content management by allowing direct markdown file placement while keeping everything in one maintainable codebase.

### Service Architecture

**Static Site Generation (SSG)** - The entire blog will be pre-built into optimized static files at build time. No server-side rendering or dynamic backend services required. This approach maximizes performance, simplifies hosting, and aligns with the modern web philosophy while maintaining long-term sustainability.

### Testing requirements

- **Unit Testing**: Core build processes, markdown processing, and theme generation logic
- **Integration Testing**: End-to-end build pipeline validation ensuring markdown correctly converts to optimized static pages
- **Visual Regression Testing**: Automated checks to ensure design consistency across builds, especially important for typography and theming
- **Performance Testing**: Lighthouse audits integrated into CI/CD to maintain loading speed standards
- **Cross-browser Testing**: Validation of modern web features (view transitions, container queries) with graceful fallbacks

### Additional Technical Assumptions and Requests

- **Framework Selection**: Strong preference for **Astro.js** based on reference screenshots and its superior static generation capabilities for content-focused sites
- **CSS Strategy**: **Tailwind CSS (latest version)** for utility-first styling with custom theme configuration supporting dynamic color palette generation and monospaced typography system
- **Build Pipeline**: Automated deployment triggered by markdown file commits, with optimized asset generation and modern bundling
- **Typography System**: Carefully selected monospaced font stack configured through Tailwind's font family system, optimized for both code blocks and prose readability
- **Color Theme System**: **Tailwind CSS custom theme configuration** with CSS custom properties for dynamic theming, allowing primary color input to generate complete accessible color palettes using Tailwind's color generation utilities and modern CSS color functions
- **Performance Targets**: Sub-3 second First Contentful Paint, optimized Core Web Vitals scores, minimal JavaScript payload
- **Browser Support**: Latest 2 versions of modern browsers with graceful degradation for older browsers (progressive enhancement approach)
- **Content Processing**: Custom markdown processing pipeline supporting syntax highlighting, proper typography handling, and metadata extraction for tags/dates
- **SEO Optimization**: Semantic HTML structure, proper meta tags, structured data for articles, optimized for search discovery without compromising minimal aesthetic

## Epics

### Epic 1: Foundation & Core Infrastructure

Establish the foundational project structure with Astro.js, implement basic markdown-to-static conversion, set up Tailwind CSS, and create a minimal viable blog that can display articles. This epic delivers a working blog that Jorge can immediately start using to publish content, even without advanced features.

#### Story 1.1: Project Setup and Initial Configuration

As a developer, I want to set up the foundational Astro.js project with Tailwind CSS, so that I have a working development environment ready for blog development.

##### Acceptance Criteria

- 1: Astro.js project is initialized with latest stable version
- 2: Tailwind CSS is installed and configured with basic setup
- 3: Project runs locally with `npm run dev` command
- 4: Basic folder structure is established for content, components, and pages
- 5: Git repository is initialized with appropriate .gitignore file
- 6: Package.json includes all necessary dependencies and scripts

#### Story 1.2: Basic Markdown Processing Pipeline

As a content creator, I want to place markdown files in a content directory and have them automatically converted to web pages, so that I can start publishing articles immediately.

##### Acceptance Criteria

- 1: Markdown files placed in `/src/content/` directory are automatically processed
- 2: Frontmatter metadata (title, date, tags) is extracted from markdown files
- 3: Markdown content is converted to HTML with proper semantic structure
- 4: Individual article pages are generated with proper routing
- 5: Basic syntax highlighting is implemented for code blocks
- 6: Test article can be created and viewed in browser

#### Story 1.3: Article List Homepage

As a reader, I want to see a list of all available articles on the homepage, so that I can browse and select content to read.

##### Acceptance Criteria

- 1: Homepage displays all articles in chronological order (newest first)
- 2: Each article entry shows title, publication date, and brief excerpt
- 3: Article titles are clickable links to individual article pages
- 4: Articles without dates default to file creation date
- 5: Empty state message displays when no articles exist
- 6: Page is responsive and works on mobile devices

#### Story 1.4: Basic Article Page Layout

As a reader, I want individual articles to be displayed with clean, readable typography, so that I can focus on the content without distractions.

##### Acceptance Criteria

- 1: Article pages display title, date, and full content clearly
- 2: Basic monospaced font is applied to all text content
- 3: Proper heading hierarchy (H1, H2, H3) is maintained
- 4: Code blocks are visually distinct with syntax highlighting
- 5: Links are styled consistently and remain accessible
- 6: Reading width is optimized for comfortable consumption

### Epic 2: Content Management & Processing

Implement the tag system, content organization features, and enhanced markdown processing that enables effective content discovery and organization. This epic transforms the basic blog into a knowledge management system with the filtering and organization capabilities Jorge needs.

#### Story 2.1: Tag System Implementation

As a content creator, I want to add tags to my articles via frontmatter, so that I can categorize and organize my content by topic.

##### Acceptance Criteria

- 1: Tags can be specified in markdown frontmatter as an array (e.g., `tags: ["web-dev", "ai", "architecture"]`)
- 2: Tags are extracted and processed during build time
- 3: Invalid or empty tags are handled gracefully
- 4: Tag names are normalized (lowercase, hyphenated) for consistency
- 5: Articles without tags are handled without breaking the build
- 6: Tag data is available for use in page components

#### Story 2.2: Tag Display on Articles

As a reader, I want to see tags displayed on articles, so that I can understand the topic categories and discover related content.

##### Acceptance Criteria

- 1: Tags are displayed on individual article pages in a clear, visually distinct way
- 2: Tags are also shown on the homepage article list for quick scanning
- 3: Tags are clickable links that lead to filtered views
- 4: Tag styling is consistent with the minimal aesthetic
- 5: Multiple tags are displayed in a clean, organized manner
- 6: Tags are accessible via keyboard navigation

#### Story 2.3: Tag Filtering and Tag Pages

As a reader, I want to click on tags to see all articles that share that tag, so that I can explore content by topic area.

##### Acceptance Criteria

- 1: Clicking a tag navigates to a dedicated tag page (e.g., `/tags/web-dev`)
- 2: Tag pages display all articles that contain that specific tag
- 3: Tag pages show the tag name prominently and article count
- 4: Article listings on tag pages maintain the same format as homepage
- 5: Tag pages include navigation back to main article list
- 6: Non-existent tag pages show appropriate 404 handling

#### Story 2.4: Enhanced Article Metadata

As a content creator, I want to include rich metadata in my articles, so that I can provide better context and organization for my content.

##### Acceptance Criteria

- 1: Articles support description/excerpt in frontmatter for better preview text
- 2: Publication date formatting is consistent and readable
- 3: Reading time estimation is calculated and displayed
- 4: Articles support draft status to hide incomplete content from public lists
- 5: Metadata validation prevents build errors from malformed frontmatter
- 6: Article URLs are clean and SEO-friendly (slug-based)

#### Story 2.5: Content Search and Discovery

As a reader, I want to easily discover and navigate between related articles, so that I can explore interconnected topics effectively.

##### Acceptance Criteria

- 1: Tag overview page displays all available tags with article counts
- 2: Related articles suggestions appear at the end of each article based on shared tags
- 3: Article navigation includes "back to articles" link for easy browsing
- 4: Site navigation is consistent across all page types
- 5: Tag overview is accessible from main navigation
- 6: Articles are sorted logically within tag pages (newest first)

### Epic 3: Advanced UI & Modern Web Features

Implement the retro aesthetic, dynamic theming system, view transitions, and modern web features that create the distinctive visual experience Jorge envisions. This epic transforms the functional blog into a beautifully designed, cutting-edge web experience with typewriter aesthetics and modern capabilities.

#### Story 3.1: Retro Typography and Base Styling

As a reader, I want the blog to have a distinctive typewriter/vintage computer aesthetic, so that the reading experience feels focused and nostalgic while remaining modern.

##### Acceptance Criteria

- 1: Monospaced font stack is implemented with proper fallbacks for all text content
- 2: Typography scales appropriately across different screen sizes
- 3: Line spacing and character spacing are optimized for reading comfort
- 4: Heading hierarchy uses consistent monospaced styling with appropriate sizing
- 5: Code blocks are visually integrated with the overall typography system
- 6: Text remains highly readable in both light and dark contexts

#### Story 3.2: Dynamic Color Theming System

As a user, I want to customize the site's color theme by selecting a primary color, so that I can personalize the visual experience while maintaining design consistency.

##### Acceptance Criteria

- 1: Tailwind CSS configuration supports dynamic color palette generation from a primary color input
- 2: Color system includes proper contrast ratios for accessibility compliance
- 3: Theme selection interface allows primary color customization
- 4: Generated color palette includes variations for text, backgrounds, accents, and interactive elements
- 5: Color choices persist across browser sessions
- 6: Default theme reflects retro computer terminal aesthetics (amber, green, or classic monochrome options)

#### Story 3.3: Dark/Light/System Mode Implementation

As a reader, I want to switch between dark, light, and system-preference color modes, so that I can read comfortably in different lighting conditions.

##### Acceptance Criteria

- 1: Dark mode, light mode, and system preference detection are fully implemented
- 2: Mode switching is instant without page refresh or flash of incorrect theme
- 3: User preference is stored locally and remembered across sessions
- 4: System mode automatically follows OS preference changes
- 5: All content (articles, code blocks, UI elements) renders correctly in all modes
- 6: Mode selector is accessible and clearly indicates current selection

#### Story 3.4: View Transitions and Micro-Animations

As a user, I want smooth, subtle transitions between pages and interactions, so that the site feels polished and enhances rather than distracts from content consumption.

##### Acceptance Criteria

- 1: View Transitions API is implemented for smooth page navigation between articles and lists
- 2: Micro-animations enhance interactive elements (buttons, links, hover states) subtly
- 3: Animation preferences respect user's motion settings (prefers-reduced-motion)
- 4: Transitions feel fast and responsive, never causing perceived slowness
- 5: Fallback behavior works gracefully in browsers without view transitions support
- 6: All animations maintain the minimal, professional aesthetic

#### Story 3.5: Responsive Design and Modern CSS Features

As a reader, I want the site to work beautifully on all device sizes using cutting-edge web technologies, so that I can read comfortably whether on desktop, tablet, or mobile.

##### Acceptance Criteria

- 1: CSS Container Queries are used for component-level responsive behavior where appropriate
- 2: Reading experience is optimized for desktop (primary), tablet, and mobile devices
- 3: Typography scales appropriately using modern CSS techniques (clamp, container-relative units)
- 4: Navigation adapts elegantly to smaller screen sizes
- 5: Touch targets meet accessibility guidelines on mobile devices
- 6: Modern CSS features degrade gracefully in older browsers

#### Story 3.6: Enhanced Visual Layout and Components

As a reader, I want the blog layout to feel carefully designed and visually polished, so that the content presentation enhances my reading and learning experience.

##### Acceptance Criteria

- 1: Article cards on homepage have subtle depth and hover effects that feel tactile
- 2: Tag styling reflects the retro aesthetic while remaining modern and clickable
- 3: Overall page layout uses proper spacing and visual hierarchy
- 4: Loading states and empty states are designed consistently with the overall aesthetic
- 5: Print styles are optimized for offline reading and documentation
- 6: Visual elements subtly reference LEGO modularity concepts without being distracting

### Epic 4: Performance & Production Readiness

Optimize the blog for production deployment with performance enhancements, SEO optimization, accessibility compliance, and deployment to jorgeherrera.me. This epic ensures the blog is fast, discoverable, accessible, and ready for long-term use as Jorge's primary knowledge publishing platform.

#### Story 4.1: Performance Optimization and Core Web Vitals

As a site owner, I want the blog to load quickly and perform excellently on all devices, so that readers have an optimal experience and the site ranks well in search engines.

##### Acceptance Criteria

- 1: Lighthouse Performance score is 95+ on both desktop and mobile
- 2: First Contentful Paint (FCP) is under 1.5 seconds
- 3: Largest Contentful Paint (LCP) is under 2.5 seconds
- 4: Cumulative Layout Shift (CLS) is under 0.1
- 5: Images are optimized and properly sized for different viewport widths
- 6: JavaScript bundle size is minimized with tree-shaking and code splitting

#### Story 4.2: SEO Optimization and Structured Data

As a content creator, I want my articles to be discoverable through search engines with rich previews, so that my knowledge can reach readers who would benefit from it.

##### Acceptance Criteria

- 1: All pages have proper meta titles, descriptions, and Open Graph tags
- 2: Structured data (JSON-LD) is implemented for articles and blog schema
- 3: XML sitemap is automatically generated and updated
- 4: Robots.txt is configured appropriately for search indexing
- 5: Canonical URLs are set correctly for all pages
- 6: Social media preview cards display correctly with proper images and descriptions

#### Story 4.3: Accessibility Compliance and Testing

As an inclusive site owner, I want the blog to be fully accessible to users with disabilities, so that everyone can access and benefit from the content regardless of their abilities.

##### Acceptance Criteria

- 1: WCAG 2.1 AA compliance is achieved across all pages and components
- 2: Lighthouse Accessibility score is 100
- 3: Keyboard navigation works for all interactive elements
- 4: Screen readers can navigate and consume content effectively
- 5: Color contrast ratios meet or exceed accessibility standards in all theme modes
- 6: Focus management is properly implemented for view transitions and dynamic content

#### Story 4.4: Production Deployment Configuration

As a site owner, I want the blog deployed to jorgeherrera.me with automated updates, so that new content is published automatically when I commit markdown files.

##### Acceptance Criteria

- 1: Site is successfully deployed to jorgeherrera.me domain
- 2: HTTPS is properly configured with valid SSL certificates
- 3: CDN/hosting is optimized for static site performance
- 4: Automated deployment triggers when new content is pushed to repository
- 5: Build process completes successfully in production environment
- 6: Custom 404 page is implemented and styled consistently

## Change Log

|Change|Date|Version|Description|Author|
|---|---|---|---|---|

## Checklist Results Report

I've completed a comprehensive review of the PRD using the PM Checklist. Here's the validation summary:

### Category Assessment

|Category|Status|Notes|
|---|---|---|
|1. Problem Definition & Context|✅ PASS|Clear problem statement around knowledge crystallization and retention|
|2. MVP Scope Definition|✅ PASS|Well-defined scope with clear boundaries and logical epic progression|
|3. User Experience Requirements|✅ PASS|Comprehensive UI/UX goals with specific aesthetic and interaction requirements|
|4. Functional Requirements|✅ PASS|All core functionality captured with clear, testable acceptance criteria|
|5. Non-Functional Requirements|✅ PASS|Performance, accessibility, and technical quality standards well-defined|
|6. Epic & Story Structure|✅ PASS|Logical sequence, appropriate sizing for AI implementation, clear dependencies|
|7. Technical Guidance|✅ PASS|Specific technology choices (Astro.js, Tailwind) with clear rationale|
|8. Cross-Functional Requirements|✅ PASS|SEO, accessibility, performance requirements integrated throughout|
|9. Clarity & Communication|✅ PASS|Well-structured, unambiguous requirements ready for technical implementation|

**Overall PRD Status: ✅ READY FOR ARCHITECT**

The PRD is comprehensive, properly structured, and ready for architectural design. All requirements are clearly defined with sufficient technical guidance while maintaining focus on user value delivery.

## Design Architect Prompt

This PRD provides the complete context for Jorge's Knowledge Crystallization Blog. The project requires a sophisticated blend of retro aesthetics with cutting-edge web technologies. Please start in 'UI/UX Specification Mode' to create detailed visual and interaction specifications that will guide the frontend architecture. Pay special attention to the typewriter aesthetic, monospaced typography system, LEGO-inspired elements, and modern theming capabilities outlined in the UI Design Goals section.

## Architect Prompt

This PRD provides the complete context for Jorge's Knowledge Crystallization Blog. Please start in 'Architecture Creation Mode' to design the technical architecture using Astro.js and Tailwind CSS as specified in the Technical Assumptions. Focus on the static site generation pipeline, dynamic theming system, modern web features integration (view transitions, container queries), and optimal markdown processing workflow. The architecture must support the retro aesthetic goals while leveraging cutting-edge web capabilities.