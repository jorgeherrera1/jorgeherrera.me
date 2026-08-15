import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { wikilinkResolver } from './src/lib/wikilink-resolver';

// https://astro.build/config
export default defineConfig({
  site: 'https://jorgeherrera.me',
  trailingSlash: 'always',
  integrations: [sitemap()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Press Start 2P',
      cssVariable: '--font-press-start-2p',
      fallbacks: ['monospace'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/press-start-2p-latin-400.woff2'],
            weight: 400,
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Source Code Pro',
      cssVariable: '--font-source-code-pro',
      fallbacks: ['monospace'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/source-code-pro-latin-variable.woff2'],
            weight: '200 900',
            style: 'normal',
          },
        ],
      },
    },
  ],
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
