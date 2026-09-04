import type { APIRoute } from 'astro';
import { absolutePageUrl, imageSitemapEntries, pageSitemapEntries } from '../data/page-sitemap';

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export const prerender = true;

/**
 * Dedicated image sitemap: each keyword asset is listed under its best host URL
 * so Google Image Search can fetch and associate titles/captions cleanly.
 */
export const GET: APIRoute = () => {
	const homepage = absolutePageUrl('/');
	const lastmod = pageSitemapEntries[0]?.lastmod ?? new Date().toISOString().slice(0, 10);

	const hostByImage = new Map<string, string>();
	for (const page of pageSitemapEntries) {
		for (const image of page.images) {
			if (!hostByImage.has(image.url)) {
				hostByImage.set(image.url, absolutePageUrl(page.path));
			}
		}
	}

	const urls = imageSitemapEntries
		.map((image) => {
			const host = hostByImage.get(image.url) ?? homepage;
			return `  <url>
    <loc>${escapeXml(host)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <image:image>
      <image:loc>${escapeXml(image.url)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>
  </url>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
