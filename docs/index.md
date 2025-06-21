# Jorge Herrera Blog - Project Documentation

## Project Overview

A minimal, retro-styled personal blog that serves as a digital knowledge crystallization platform, transforming Zettelkasten insights into polished, publicly accessible articles using modern web technologies with vintage computer terminal aesthetics.

## Core Documents

### Planning & Requirements
- **[Project Brief](./project-brief.md)** - Initial project vision and goals
- **[PRD (Product Requirements Document)](./prd.md)** - Detailed requirements and epic breakdown
- **[UI/UX Specification](./front-end-spec.md)** - Design system and user experience goals

### Technical Architecture
- **[Architecture Overview](./architecture.md)** - Complete technical architecture
- **[Architecture Details](./architecture/)** - Detailed architecture documentation
  - [Tech Stack](./architecture/tech-stack.md)
  - [Coding Standards](./architecture/coding-standards.md)  
  - [Project Structure](./architecture/project-structure.md)

### Development
- **[Stories](./stories/)** - Development stories and implementation tracking
  - [Story 1.1: Project Setup](./stories/1.1.story.md)
  - [Story 1.2: Markdown Processing](./stories/1.2.story.md)
  - [Story 1.3: Article List Homepage](./stories/1.3.story.md)

## Quick Reference

### Technology Stack
- **Framework:** Astro.js (Static Site Generation)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel → jorgeherrera.me

### Key Features
- Markdown-to-static conversion
- Tag-based content organization
- Retro typewriter aesthetic
- Modern web features (View Transitions, Container Queries)
- Dark/light/system theme modes

### Project Status
- Current Phase: Development (Epic 1: Foundation & Core Infrastructure)
- Architecture: Complete
- UI/UX Specification: Complete
- Stories 1.1-1.2: Complete
- Next: Article List Homepage (Story 1.3)

## Development Workflow

1. **Content Creation:** Place markdown files in `src/content/blog/`
2. **Development:** `npm run dev` for local development
3. **Build:** `npm run build` for production build
4. **Deploy:** Automatic deployment via Git to jorgeherrera.me

## Links
- **Live Site:** [jorgeherrera.me](https://jorgeherrera.me)
- **Repository:** Current working directory
- **BMAD Framework:** `.bmad-core/` - Agent configurations and workflows