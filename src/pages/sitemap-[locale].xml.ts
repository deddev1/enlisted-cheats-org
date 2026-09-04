import type { APIRoute, GetStaticPaths } from 'astro';

import {
	buildLocaleSitemapEntries,
	i18nLocaleCodes,
	renderLocaleSitemapUrlBlock,
} from '../data/sitemap-locale';
import type { LocaleCode } from '../data/i18n/locales';
import { renderUrlsetXml, sitemapResponseHeaders } from '../data/sitemap-xml';

export const prerender = true;

export const getStaticPaths = (() =>
	i18nLocaleCodes.map((locale) => ({ params: { locale } }))) satisfies GetStaticPaths;

/**
 * Per-locale sitemap — one file per non-English locale (25 URLs each).
 * Listed in sitemap-index.xml when `includeLocaleUrlsInSitemap` is true.
 */
export const GET: APIRoute = ({ params }) => {
	const locale = params.locale as LocaleCode;
	const entries = buildLocaleSitemapEntries(locale);
	const xml = renderUrlsetXml(entries.map(renderLocaleSitemapUrlBlock));

	return new Response(xml, { headers: sitemapResponseHeaders });
};
