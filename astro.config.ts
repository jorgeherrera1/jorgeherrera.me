import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { wikilinkResolver } from './src/lib/wikilink-resolver';

// https://astro.build/config
export default defineConfig({
  site: 'https://jorgeherrera.me',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({
      features: { wikilinks: true },
      mdastPlugins: [wikilinkResolver],
    }),
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
