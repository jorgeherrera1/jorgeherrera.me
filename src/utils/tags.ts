import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface Tag {
  name: string;
  count: number;
  articles: CollectionEntry<'blog'>[];
}

/**
 * Normalize tag name to lowercase, hyphenated format
 */
export function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Get all unique tags with article counts
 */
export async function getAllTags(): Promise<Tag[]> {
  const articles = await getCollection('blog');
  const tagMap = new Map<string, { count: number; articles: CollectionEntry<'blog'>[] }>();
  
  articles.forEach(article => {
    const tags = article.data.tags || [];
    tags.forEach(tag => {
      const normalizedTag = normalizeTag(tag);
      if (!normalizedTag) return; // Skip empty/invalid tags
      
      if (!tagMap.has(normalizedTag)) {
        tagMap.set(normalizedTag, { count: 0, articles: [] });
      }
      
      const tagData = tagMap.get(normalizedTag)!;
      tagData.count++;
      tagData.articles.push(article);
    });
  });
  
  return Array.from(tagMap.entries()).map(([name, data]) => ({
    name,
    count: data.count,
    articles: data.articles
  })).sort((a, b) => b.count - a.count);
}