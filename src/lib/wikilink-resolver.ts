import { defineMdastPlugin } from 'satteri';
import { slug } from 'github-slugger';

/**
 * Rewrites Sätteri wikilink output (`[[Page Name]]` -> <a href="Page Name">)
 * to internal blog URLs. Sätteri parses wikilinks into regular mdast link
 * nodes whose `url` is the raw page name, so wikilinks are identified by the
 * `[[` at the node's source position. Uses github-slugger, the same slugger
 * Astro's glob loader uses for entry IDs, so hrefs always match the
 * /blog/[...slug] routes.
 */
export const wikilinkResolver = defineMdastPlugin({
  name: 'wikilink-resolver',
  link(node, ctx) {
    const isWikilink =
      node.position !== undefined &&
      ctx.source.startsWith('[[', node.position.start.offset);
    if (!isWikilink) return;
    return { ...node, url: `/blog/${slug(node.url)}/` };
  },
});
