// Simple test for obsidian links conversion
import { convertObsidianLinks } from './src/utils/obsidian-links.ts';

// Mock posts data
const mockPosts = [
  {
    slug: 'Initial impressions of Kiro',
    data: {
      title: 'Initial Impressions of Kiro'
    }
  },
  {
    slug: 'Kiro spec-driven development is better for large features',
    data: {
      title: 'Kiro Spec-driven Development is Better for Large Features'
    }
  }
];

// Test content with Obsidian links
const testContent = `BMAD is all about context engineering, and that's why Kiro attracted me when I learned about it. I liked their simple approach to documenting features which I already wrote about on [[Initial impressions of Kiro]] and [[Kiro spec-driven development is better for large features]]. Also the best practices of Claude Code's memory management tell you to optimize your context.`;

// Convert the content
const result = convertObsidianLinks(testContent, mockPosts);

console.log('Original:');
console.log(testContent);
console.log('\nConverted:');
console.log(result);

console.log('\nExpected links:');
console.log('[[Initial impressions of Kiro]] → [Initial impressions of Kiro](/blog/Initial%20impressions%20of%20Kiro)');
console.log('[[Kiro spec-driven development is better for large features]] → [Kiro spec-driven development is better for large features](/blog/Kiro%20spec-driven%20development%20is%20better%20for%20large%20features)');