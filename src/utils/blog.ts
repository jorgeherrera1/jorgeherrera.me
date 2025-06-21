import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'blog'>;

// Get all articles, sorted by date (newest first)
export async function getAllArticles(): Promise<Article[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Get articles by specific tag
export async function getArticlesByTag(tagName: string): Promise<Article[]> {
  const posts = await getAllArticles();
  return posts.filter(post => post.data.tags?.includes(tagName));
}

// Get all unique tags with article counts
export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllArticles();
  const tagCounts = new Map<string, number>();
  
  posts.forEach(post => {
    post.data.tags?.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// Format date consistently
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get formatted date string for datetime attribute
export function formatDateForAttribute(date: Date): string {
  return date.toISOString().split('T')[0];
}