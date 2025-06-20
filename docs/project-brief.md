# Project Brief: jorgeherrera.me Blog

## Introduction / Problem Statement

Jorge has accumulated vast knowledge over years of experience in systems architecture, software development, design, productivity, leadership, and management. However, like many professionals, this knowledge has become diluted over time. Research shows that writing concepts in your own words is one of the most effective ways to develop and retain knowledge. While Jorge maintains a Zettelkasten for personal consumption, he wants to create a public blog that transforms selected insights into polished, free-text articles - essentially creating a "knowledge crystallization laboratory" where private notes become refined public thoughts.

## Vision & Goals

- **Vision:** Create a minimal, retro-styled personal blog that serves as a digital atelier for knowledge crystallization, where insights from Jorge's Zettelkasten are refined into polished articles using modern web technologies with a typewriter/vintage computer aesthetic.
    
- **Primary Goals:**
    
    - Goal 1: Establish a markdown-driven static blog that automatically converts content to web format without requiring a CMS
    - Goal 2: Create an optimal reading experience using monospaced typography and minimal design that maximizes focus on content
    - Goal 3: Implement modern web features (view transitions, CSS container queries, advanced color management) within a retro aesthetic framework
    - Goal 4: Build a sustainable personal knowledge publishing system that Jorge will want to revisit and use for years
    - Goal 5: Deploy a fully functional blog on jorgeherrera.me domain with tag-based content organization
- **Success Metrics (Initial Ideas):**
    
    - Jorge consistently publishes articles without friction (easy markdown workflow)
    - Reading experience feels distraction-free and conducive to deep thinking
    - Site loads quickly and demonstrates modern web capabilities
    - Jorge actively revisits and references his own articles over time

## Target Audience / Users

**Primary User:** Jorge himself - this is a personal knowledge tool that happens to be public. The design and functionality should optimize for Jorge's writing workflow and reading preferences.

**Secondary Users:** Occasional visitors who discover the site organically. If they appreciate the content and aesthetic, excellent; if not, that's perfectly acceptable. No specific audience targeting or growth optimization needed.

## Key Features / Scope (High-Level Ideas for MVP)

- **Markdown-to-Static Conversion:** Automatic build process that converts markdown files to optimized static web pages
- **Minimal, Retro UI:** Clean typewriter/vintage computer aesthetic with monospaced typography and zero visual distractions
- **Modern Web Features:** View transitions between pages, CSS container queries, sophisticated dark/light/system mode handling
- **Tag System:** Clickable tags for content organization and filtering, similar to reference screenshots
- **Content Management:** Direct markdown file placement in source repository (no CMS interface needed)
- **Responsive Design:** Optimal reading experience across all devices while maintaining retro aesthetic
- **Performance Optimization:** Fast loading times with modern build optimization
- **Theme Customization:** Easy color theme adjustment via primary color selection with automatic palette generation

## Post MVP Features / Scope and Ideas

- **LEGO Design Elements:** Tasteful integration of LEGO-inspired visual elements or interactions
- **Enhanced Animations:** More sophisticated but still subtle page transitions and micro-interactions
- **Advanced Typography:** Exploration of multiple monospaced font options with reading optimization
- **Content Interconnections:** Visual representation of how articles "snap together" thematically
- **Advanced Search:** Full-text search capabilities across all articles
- **Reading Progress:** Subtle indicators for longer articles
- **Print Optimization:** Beautiful print stylesheets for offline reading
- **RSS/Atom Feeds:** Syndication for any followers who emerge
- **Series/Collections:** Grouping related articles into cohesive learning paths

## Known Technical Constraints or Preferences

- **Constraints:**
    
    - Must work with jorgeherrera.me domain
    - No budget for commercial CMS or hosting solutions beyond static hosting
    - No need for dynamic server-side functionality
    - Must be maintainable by Jorge as a solo developer
- **Initial Architectural Preferences:**
    
    - **Repository Structure:** Single repository (monorepo) containing both content (markdown files) and site source code
    - **Service Architecture:** Static site generation with modern build pipeline - no server-side components needed
    - **Technology Preferences:** Modern web framework (likely Astro.js based on reference screenshots), latest CSS features, minimal JavaScript for interactions
- **Risks:**
    
    - Achieving the right balance between retro aesthetic and modern functionality
    - Ensuring sustainable long-term maintenance as web standards evolve
    - Typography choices that work well for both technical content and prose
- **User Preferences:**
    
    - Strong preference for cutting-edge web technologies
    - Emphasis on build-time optimization over runtime complexity
    - Monospaced fonts for typewriter aesthetic
    - Color palette that can be easily customized
    - Reference designs show appreciation for Astro.js framework and similar minimal blog aesthetics

## Relevant Research (Optional)

Reference screenshots provided show successful implementations of minimal blog designs with:

- Astro.js framework demonstrating retro styling with modern card layouts
- Citrus theme showing effective tag organization and table of contents functionality
- Both examples successfully balance minimal aesthetics with practical navigation features

## PM Prompt

This Project Brief provides the full context for Jorge's Knowledge Crystallization Blog. Please start in 'PRD Generation Mode', review the brief thoroughly to work with the user to create the PRD section by section as the template indicates, asking for any necessary clarification or suggesting improvements as your mode allows. Pay special attention to the technical requirements around modern web features, markdown workflow, and the balance between retro aesthetics and cutting-edge functionality.