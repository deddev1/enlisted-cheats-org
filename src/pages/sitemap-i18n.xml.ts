import type { APIRoute } from 'astro';

import {
	buildAllI18nSitemapEntries,
	renderLocaleSitemapUrlBlock,
} from '../data/sitemap-locale';
import { renderUrlsetXml, sitemapResponseHeaders } from '../data/sitemap-xml';

export const prerender = true;

/**
 * Combined i18n sitemap — all 21 non-English locales (525 URLs).
 * Per-locale files are also available as sitemap-{locale}.xml.
 */
export const GET: APIRoute = () => {
	const entries = buildAllI18nSitemapEntries();
	const xml = renderUrlsetXml(entries.map(renderLocaleSitemapUrlBlock));

	return new Response(xml, { headers: sitemapResponseHeaders });
};
