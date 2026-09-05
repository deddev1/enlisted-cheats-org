import { getPageContent } from './i18n';
import { getLocalizedPath, hreflangLinksXml, pageIds, type PageId } from './i18n/routing';
import {
	defaultLocale,
	includeLocaleUrlsInSitemap,
	localeCodes,
	type LocaleCode,
} from './i18n/locales';
import { siteConfig } from './site';
import { pageSitemapMeta } from './sitemap-meta';
import { escapeXml } from './sitemap-xml';

export type LocaleSitemapEntry = {
	path: string;
	pageId: PageId;
	lastmod: string;
	priority: number;
	changefreq: string;
	image?: { url: string; title: string; caption: string };
};

/** Non-English locale codes (UI routes). Not SEO peers while translations are thin. */
export const i18nLocaleCodes = localeCodes.filter((code) => code !== defaultLocale);

export function localeSitemapFilename(locale: LocaleCode): string {
	return `sitemap-${locale}.xml`;
}

export function localeSitemapUrl(locale: LocaleCode): string {
	return new URL(`/${localeSitemapFilename(locale)}`, siteConfig.url).href;
}

/**
 * Build sitemap entries for one non-English locale (25 marketing pages).
 */
export function buildLocaleSitemapEntries(locale: LocaleCode): LocaleSitemapEntry[] {
	if (locale === defaultLocale) {
		throw new Error(`English pages belong in sitemap.xml, not sitemap-${locale}.xml`);
	}

	if (!includeLocaleUrlsInSitemap) {
		return [];
	}

	return pageIds.map((pageId) => {
		const meta = pageSitemapMeta[pageId];
		const page = pageId === 'home' ? null : getPageContent(locale, pageId);

		return {
			path: getLocalizedPath(pageId, locale),
			pageId,
			lastmod: meta.lastmod,
			priority: meta.i18nPriority,
			changefreq: meta.changefreq,
			image:
				pageId === 'home'
					? undefined
					: {
							url: new URL(page!.heroImage, siteConfig.url).href,
							title: page!.title,
							caption: page!.imageAlt,
						},
		};
	});
}

export function renderLocaleSitemapUrlBlock(entry: LocaleSitemapEntry): string {
	const loc = new URL(entry.path, siteConfig.url).href;
	const hreflangBlock = `\n${hreflangLinksXml(entry.pageId, escapeXml)}`;
	const imageBlock = entry.image
		? `\n    <image:image>
      <image:loc>${escapeXml(entry.image.url)}</image:loc>
      <image:title>${escapeXml(entry.image.title)}</image:title>
      <image:caption>${escapeXml(entry.image.caption)}</image:caption>
    </image:image>`
		: '';

	return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>${hreflangBlock}${imageBlock}
  </url>`;
}

/** Combined i18n entries — all non-English locales flattened. */
export function buildAllI18nSitemapEntries(): LocaleSitemapEntry[] {
	if (!includeLocaleUrlsInSitemap) return [];
	return i18nLocaleCodes.flatMap((locale) => buildLocaleSitemapEntries(locale));
}
