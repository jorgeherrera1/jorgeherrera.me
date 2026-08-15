import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getAllArticles, generateExcerpt } from '../utils/blog';

export async function GET(context: APIContext) {
	const posts = await getAllArticles();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: generateExcerpt(post.body ?? '', 160),
			categories: post.data.tags,
			link: `/blog/${post.id}/`,
		})),
	});
}
