import type { APIRoute } from 'astro';
import { getBlogSitemapEntries } from '../data/blog/helpers';
import { includeLocaleUrlsInSitemap } from '../data/i18n/locales';
import { i18nLocaleCodes, localeSitemapUrl } from '../data/sitemap-locale';
import { siteConfig } from '../data/site';
import { latestPageLastmod } from '../data/sitemap-meta';
import { escapeXml } from '../data/sitemap-xml';

export const prerender = true;

/** Sitemap index: English pages (+ per-locale sitemaps when enabled) and image sitemap. */
export const GET: APIRoute = () => {
	const pageLastmod = latestPageLastmod();
	const englishLastmod = getBlogSitemapEntries().reduce(
		(max, entry) => (entry.lastmod > max ? entry.lastmod : max),
		pageLastmod,
	);

	const subSitemaps: { loc: string; lastmod: string }[] = [
		{ loc: new URL('/sitemap.xml', siteConfig.url).href, lastmod: englishLastmod },
		...(includeLocaleUrlsInSitemap
			? i18nLocaleCodes.map((locale) => ({
					loc: localeSitemapUrl(locale),
					lastmod: pageLastmod,
				}))
			: []),
		{ loc: new URL('/sitemap-images.xml', siteConfig.url).href, lastmod: pageLastmod },
	];

	const entries = subSitemaps
		.map(
			({ loc, lastmod }) => `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
  </sitemap>`,
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
