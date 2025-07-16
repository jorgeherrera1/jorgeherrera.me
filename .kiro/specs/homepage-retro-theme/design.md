# Design Document

## Overview

This design document outlines the technical approach for implementing a unique retro-themed homepage inspired by Super Mario Bros and LEGO aesthetics. The design will transform Jorge Herrera's personal blog homepage into a dark, Bowser Castle-inspired experience with 8-bit pixelated elements and LEGO piece visuals, while maintaining optimal performance and modern web standards.

## Architecture

### Design Philosophy
- **Retro Gaming Aesthetic**: Dark theme inspired by Bowser Castle stages from Super Mario Bros
- **8-bit Pixelated Elements**: Sharp, blocky visual elements with pixel-perfect rendering
- **LEGO-Inspired Components**: Modular, block-like visual elements with realistic depth and shadows
- **Performance-First**: Static generation with Tailwind CSS utilities only
- **Modern CSS Features**: Leveraging latest browser capabilities without backwards compatibility

### Color Palette
Based on Bowser Castle stages and LEGO dark themes:
- **Primary Dark**: `#0f0f0f` (Deep castle black)
- **Secondary Dark**: `#1a1a1a` (Stone gray)
- **Accent Orange**: `#ff6b35` (Bowser/lava orange)
- **Accent Red**: `#dc2626` (LEGO red)
- **Accent Yellow**: `#fbbf24` (Coin/power-up yellow)
- **Accent Green**: `#10b981` (Pipe/1-up green)
- **Text Primary**: `#f9fafb` (Bright white)
- **Text Secondary**: `#d1d5db` (Muted gray)

## Components and Interfaces

### 1. Retro Header Component
**Purpose**: Navigation header with pixelated styling and LEGO-inspired elements

**Visual Design**:
- Pixelated border using CSS `image-rendering: pixelated`
- LEGO brick-style background with CSS gradients and box-shadows
- 8-bit style hover effects with sharp transitions

**Layout**:
- Left: "JorgeHerrera.me" as pixelated logo with LEGO brick styling
- Right: Navigation links styled as retro game buttons

### 2. Hero Section (Section 1)
**Purpose**: 50/50 grid layout with personal description and tag cloud

**Column 1 - Personal Description**:
- Pixelated avatar placeholder (8-bit style)
- Text with retro game font styling
- LEGO brick-inspired background elements

**Column 2 - Tag Cloud**:
- Tags styled as LEGO bricks with realistic depth
- 8-bit color scheme for different tag categories
- Hover effects mimicking LEGO brick connections

### 3. Article Grid Section (Section 2)
**Purpose**: 3-column grid displaying latest articles as retro-styled cards

**Article Cards**:
- LEGO brick-inspired borders with realistic shadows
- Pixelated corners using CSS clip-path
- 8-bit style hover animations
- Retro game UI elements for metadata

### 4. Tag System Redesign
**Purpose**: Transform tags into LEGO brick-style elements

**Visual Elements**:
- Realistic LEGO brick appearance with CSS gradients
- Interlocking visual effects on hover
- 8-bit color coding by category

## Data Models

### Theme Configuration
```typescript
interface RetroTheme {
  colors: {
    primary: string;
    secondary: string;
    accents: string[];
    text: {
      primary: string;
      secondary: string;
    };
  };
  effects: {
    pixelated: boolean;
    legoShadows: boolean;
    retroAnimations: boolean;
  };
}
```

### Component Props
```typescript
interface RetroComponentProps {
  variant?: 'lego' | 'pixel' | 'hybrid';
  colorScheme?: 'bowser' | 'castle' | 'lava';
  animationLevel?: 'minimal' | 'standard' | 'enhanced';
}
```

## CSS Architecture

### Tailwind CSS Custom Theme
Using Tailwind CSS v4 @theme configuration for retro aesthetics:

```css
@theme {
  --color-castle-black: #0f0f0f;
  --color-stone-gray: #1a1a1a;
  --color-bowser-orange: #ff6b35;
  --color-lego-red: #dc2626;
  --color-coin-yellow: #fbbf24;
  --color-pipe-green: #10b981;
  
  --shadow-lego: 0 4px 0 0 rgba(0,0,0,0.3), 0 8px 0 0 rgba(0,0,0,0.2);
  --shadow-pixel: 2px 2px 0 0 rgba(0,0,0,0.5);
  
  --border-pixel: 2px solid;
  --border-lego: 4px solid;
}
```

### Utility Classes for Retro Effects
- `.pixel-perfect`: `image-rendering: pixelated; image-rendering: -moz-crisp-edges;`
- `.lego-shadow`: Custom LEGO brick shadow effects
- `.retro-hover`: 8-bit style hover transitions
- `.brick-border`: LEGO brick-inspired borders

## Visual Effects Implementation

### 8-bit Pixelated Elements
- CSS `image-rendering: pixelated` for sharp edges
- Custom clip-path for pixelated corners
- Sharp color transitions without gradients
- Blocky typography effects

### LEGO Brick Styling
- Multi-layered box-shadows for depth
- CSS gradients for realistic plastic appearance
- Interlocking visual effects using pseudo-elements
- Realistic lighting with CSS gradients

### Retro Animations
- Sharp, stepped transitions (no easing)
- 8-bit style color changes
- Pixel-perfect movement animations
- Retro game UI feedback effects

## Performance Optimizations

### Static Generation
- All styling through Tailwind CSS utilities
- No custom CSS files beyond font definitions
- Minimal JavaScript for enhanced performance
- Static HTML generation with Astro

### Font Loading
- Preload JetBrains Mono fonts
- Font-display: swap for optimal loading
- Monospace fallbacks for consistency

### CSS Optimization
- Tailwind CSS purging for minimal bundle size
- Modern CSS features for enhanced visuals
- No polyfills or backwards compatibility code

## Error Handling

### Fallback Strategies
- Graceful degradation for older browsers
- Fallback fonts for monospace consistency
- Default styling if custom theme fails to load

### Accessibility Considerations
- Sufficient color contrast ratios
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators with retro styling

## Testing Strategy

### Visual Regression Testing
- Screenshot comparisons for pixel-perfect rendering
- Cross-browser compatibility testing
- Responsive design validation

### Performance Testing
- Lighthouse performance score validation (target: 100/100)
- Core Web Vitals monitoring
- Bundle size optimization verification

### Accessibility Testing
- WCAG 2.1 AA compliance
- Keyboard navigation testing
- Screen reader compatibility validation

## Implementation Approach

### Phase 1: Core Theme Setup
- Implement Tailwind CSS custom theme
- Create base retro utility classes
- Set up color palette and typography

### Phase 2: Component Transformation
- Transform Header component with retro styling
- Implement LEGO-inspired article cards
- Create pixelated tag system

### Phase 3: Visual Effects
- Add 8-bit hover animations
- Implement LEGO brick shadows and depth
- Create retro game UI elements

### Phase 4: Performance Optimization
- Optimize CSS bundle size
- Implement font preloading
- Validate Lighthouse scores

## Technical Constraints

### Browser Support
- Modern browsers only (no IE support)
- Latest CSS features without polyfills
- ES6+ JavaScript features

### Styling Constraints
- Tailwind CSS utilities only
- No custom CSS beyond font definitions
- @theme configuration for customization

### Performance Requirements
- 100/100 Lighthouse performance score
- Minimal JavaScript bundle
- Static HTML generation
- Fast font loading with preload hints