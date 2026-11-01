// Wikilink hrefs are rewritten while markdown is rendered. This drives the same
// Sätteri processor the site uses and asserts the HTML, so a missing
// `options.position` opt-in fails here instead of only on the built pages.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri';
import { wikilinkResolver } from '../src/lib/wikilink-resolver.ts';

async function render(markdown) {
  const processor = await createSatteriMarkdownProcessor({
    syntaxHighlight: false,
    gfm: true,
    smartypants: true,
    features: { wikilinks: true },
    mdastPlugins: [wikilinkResolver],
  });
  const { code } = await processor.render(markdown, { frontmatter: {} });
  return code;
}

function links(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([^<]*)<\/a>/g)].map((match) => ({
    href: match[1],
    text: match[2],
  }));
}

test('wikilinks render as /blog/<slug>/ and keep alias text', async () => {
  const html = await render(
    [
      '[[Cursor Projects nailed it|others just handle it for me]]',
      '[[The agentic coding battle is wide open|Spawning new (sub) sessions]]',
      '[[Disappointed with Claude Projects]]',
      '[[cursor-projects-nailed-it]]',
      '[[I am trying to like GitHub Spec-Kit, but]]',
      '[docs](https://example.com/docs)',
      '[mail](mailto:ada@example.com)',
      '[note](#notes)',
      '[about](/about/)',
      '[relative](some-page)',
    ].join('\n\n'),
  );

  assert.deepEqual(links(html), [
    { href: '/blog/cursor-projects-nailed-it/', text: 'others just handle it for me' },
    {
      href: '/blog/the-agentic-coding-battle-is-wide-open/',
      text: 'Spawning new (sub) sessions',
    },
    {
      href: '/blog/disappointed-with-claude-projects/',
      text: 'Disappointed with Claude Projects',
    },
    { href: '/blog/cursor-projects-nailed-it/', text: 'cursor-projects-nailed-it' },
    {
      href: '/blog/i-am-trying-to-like-github-spec-kit-but/',
      text: 'I am trying to like GitHub Spec-Kit, but',
    },
    { href: 'https://example.com/docs', text: 'docs' },
    { href: 'mailto:ada@example.com', text: 'mail' },
    { href: '#notes', text: 'note' },
    { href: '/about/', text: 'about' },
    { href: 'some-page', text: 'relative' },
  ]);
});
