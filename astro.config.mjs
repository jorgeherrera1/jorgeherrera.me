// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import remarkWikiLink from 'remark-wiki-link';

// Slugify helper to map Obsidian page names to blog slugs
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // remove special chars
    .replace(/\s+/g, '-')       // spaces -> hyphens
    .replace(/-+/g, '-')         // collapse dashes
    .trim();
}

// https://astro.build/config
export default defineConfig({
  site: 'https://jorgeherrera.me',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [
      [
        remarkWikiLink,
        {
          aliasDivider: '|',
          pageResolver: (name) => [name], // keep full page name; slugify in href
          hrefTemplate: (permalink) => `/blog/${slugify(permalink)}/`,
        },
      ],
    ],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      transformers: []
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
});