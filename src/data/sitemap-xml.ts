/** Shared XML helpers for sitemap endpoints. */
export function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export function renderUrlsetXml(urlBlocks: string[]): string {
	const urls = urlBlocks.join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export const sitemapResponseHeaders = {
	'Content-Type': 'application/xml; charset=utf-8',
	'Cache-Control': 'public, max-age=3600',
} as const;
