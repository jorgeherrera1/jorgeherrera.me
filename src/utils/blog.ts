import { getCollection, type CollectionEntry } from 'astro:content';
import { normalizeTag } from './tags';

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
  if (!date || isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get formatted date string for datetime attribute
export function formatDateForAttribute(date: Date): string {
  if (!date || isNaN(date.getTime())) {
    return '';
  }
  return date.toISOString().split('T')[0];
}

// Calculate reading time for article content
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  
  // Remove code blocks to avoid inflating word count
  const contentWithoutCodeBlocks = content
    .replace(/```[\s\S]*?```/g, '') // Remove fenced code blocks
    .replace(/`[^`]+`/g, ''); // Remove inline code
  
  // Count words by splitting on whitespace and filtering empty strings
  const words = contentWithoutCodeBlocks
    .split(/\s+/)
    .filter(word => word.length > 0).length;
  
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

// Generate excerpt from article content
export function generateExcerpt(content: string, maxLength: number = 150): string {
  // Remove markdown syntax and HTML tags
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  // Find the last complete sentence within the limit
  const truncated = cleanContent.substring(0, maxLength);
  const lastSentence = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSentence > maxLength - 50) {
    return cleanContent.substring(0, lastSentence + 1);
  }
  
  if (lastSpace > 0) {
    return cleanContent.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

// Convert title to URL slug (title-case to kebab-case)
function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Convert Obsidian-style [[title]] links to markdown [title](/blog/slug) links
export async function convertObsidianLinks(content: string): Promise<string> {
  // Find all Obsidian-style links [[title]]
  const obsidianLinkRegex = /\[\[([^\]]+)\]\]/g;
  const matches = Array.from(content.matchAll(obsidianLinkRegex));
  
  if (matches.length === 0) {
    return content;
  }
  
  // Get all blog posts to match titles against
  const allPosts = await getAllArticles();
  
  let processedContent = content;
  
  // Process each Obsidian link
  for (const match of matches) {
    const fullMatch = match[0]; // [[title]]
    const linkTitle = match[1]; // title
    
    // Find matching blog post by title (case-insensitive)
    const matchingPost = allPosts.find(post => 
      post.data.title.toLowerCase() === linkTitle.toLowerCase()
    );
    
    if (matchingPost) {
      // Convert to markdown link using the actual post title and id as slug
      const slug = matchingPost.id;
      const actualTitle = matchingPost.data.title;
      const markdownLink = `[${actualTitle}](/blog/${slug})`;
      processedContent = processedContent.replace(fullMatch, markdownLink);
    }
  }
  
  return processedContent;
}

// Find related articles based on shared tags
export function findRelatedArticles(currentPost: CollectionEntry<'blog'>, allPosts: CollectionEntry<'blog'>[], limit = 4): CollectionEntry<'blog'>[] {
  const currentTags = currentPost.data.tags?.map(normalizeTag) || [];
  
  return allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => ({
      post,
      sharedTags: (post.data.tags?.map(normalizeTag) || []).filter(tag => currentTags.includes(tag)).length
    }))
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags || new Date(b.post.data.date).getTime() - new Date(a.post.data.date).getTime())
    .slice(0, limit)
    .map(({ post }) => post);
}