import type { CollectionEntry } from 'astro:content';

/**
 * Converts Obsidian-style links [[filename]] to markdown links
 * This function processes the raw markdown content before it's rendered
 */
export function convertObsidianLinks(content: string, allPosts: CollectionEntry<'blog'>[]): string {
  // Create a map of title to slug for quick lookup
  // Also create a case-insensitive lookup for better matching
  const titleToSlug = new Map<string, string>();
  const titleToSlugLowercase = new Map<string, string>();
  
  allPosts.forEach(post => {
    titleToSlug.set(post.data.title, post.slug);
    titleToSlugLowercase.set(post.data.title.toLowerCase(), post.slug);
  });
  
  // Replace Obsidian-style links with markdown links
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, title) => {
    // First try exact match
    let slug = titleToSlug.get(title);
    
    // If no exact match, try case-insensitive match
    if (!slug) {
      slug = titleToSlugLowercase.get(title.toLowerCase());
    }
    
    if (slug) {
      return `[${title}](/blog/${encodeURIComponent(slug)})`;
    }
    
    // If no matching post found, return the original text but without brackets
    // This prevents broken links
    return title;
  });
}

/**
 * Convert a blog post title to a URL-safe slug
 * This matches Astro's file-based routing behavior
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}