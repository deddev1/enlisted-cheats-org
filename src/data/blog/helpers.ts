import { siteConfig } from '../site';
import { enlistedImages } from '../enlisted';
import {
	defaultLocale,
	localeCodes,
	type LocaleCode,
	locales,
} from '../i18n/locales';
import type { BlogImageKey, BlogPostDefinition, BlogTranslation, ResolvedBlogPost } from './types';
import { blogPosts as rawBlogPosts } from './posts.generated';

const imageMap: Record<BlogImageKey, string> = {
	hero: enlistedImages.hero,
	espWallhack: enlistedImages.espWallhack,
	aimbotCombat: enlistedImages.aimbotCombat,
	squadFight: enlistedImages.squadFight,
	headerArt: enlistedImages.headerArt,
	cheatsPackage: enlistedImages.cheatsPackage,
	playerEsp: enlistedImages.playerEsp,
	rebootFight: enlistedImages.rebootFight,
	battleRoyaleCombat: enlistedImages.battleRoyaleCombat,
	battleRoyaleIslandMap: enlistedImages.battleRoyaleIsland,
};

function expandTranslations(
	translations: Partial<Record<LocaleCode, BlogTranslation>> & { en: BlogTranslation },
): Record<LocaleCode, BlogTranslation> {
	const en = translations.en;
	const full = {} as Record<LocaleCode, BlogTranslation>;
	for (const code of localeCodes) {
		full[code] = translations[code] ?? { ...en };
	}
	return full;
}

export const blogPosts: BlogPostDefinition[] = rawBlogPosts.map((post) => ({
	...post,
	translations: expandTranslations(post.translations as Partial<Record<LocaleCode, BlogTranslation>> & { en: BlogTranslation }),
}));

/** Game progression posts — shown on /guides/, not the cheats blog hub. */
export const GAME_GUIDES_CATEGORY = 'Enlisted Game Guides';

export function isGameGuidePost(post: Pick<BlogPostDefinition, 'category'>): boolean {
	return post.category === GAME_GUIDES_CATEGORY;
}

export function isCheatsBlogPost(post: Pick<BlogPostDefinition, 'category'>): boolean {
	return !isGameGuidePost(post);
}

export function getBlogImageSrc(key: BlogImageKey): string {
	return imageMap[key];
}

export function blogCardHeading(title: string): string {
	const stripped = title
		.replace(/^Enlisted Cheats:?\s*/i, '')
		.replace(/^Enlisted\s+/i, '')
		.replace(/:\s*.+$/, '')
		.trim();
	if (stripped.length <= 34) return stripped;
	const cut = stripped.slice(0, 34);
	const lastSpace = cut.lastIndexOf(' ');
	return `${(lastSpace > 18 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function blogCardExcerpt(text: string, max = 168): string {
	const plain = text.replace(/\s+/g, ' ').trim();
	if (plain.length <= max) return plain;
	const cut = plain.slice(0, max);
	const lastSpace = cut.lastIndexOf(' ');
	return `${(lastSpace > 96 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function getBlogBasePath(locale: LocaleCode): string {
	return locale === defaultLocale ? '/blog/' : `/${locale}/blog/`;
}

export function getBlogPostPath(locale: LocaleCode, slug: string): string {
	const base = getBlogBasePath(locale);
	return `${base}${slug}/`;
}

export function absoluteBlogUrl(locale: LocaleCode, slug?: string): string {
	const path = slug ? getBlogPostPath(locale, slug) : getBlogBasePath(locale);
	return new URL(path, siteConfig.url).href;
}

export function resolvePost(post: BlogPostDefinition, locale: LocaleCode): ResolvedBlogPost {
	const translation = post.translations[locale];
	return {
		...post,
		locale,
		translation,
		imageSrc: getBlogImageSrc(post.imageKey),
		canonicalPath: getBlogPostPath(locale, translation.slug),
	};
}

export function getAllPostsForLocale(locale: LocaleCode): ResolvedBlogPost[] {
	return blogPosts
		.map((post) => resolvePost(post, locale))
		.sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function getFeaturedPosts(locale: LocaleCode, limit = 3): ResolvedBlogPost[] {
	const cheatsPosts = getAllPostsForLocale(locale).filter(isCheatsBlogPost);
	const featured = cheatsPosts.filter((p) => p.featured);
	return (featured.length >= limit ? featured : cheatsPosts).slice(0, limit);
}

export function getCheatsBlogPosts(locale: LocaleCode): ResolvedBlogPost[] {
	return getAllPostsForLocale(locale).filter(isCheatsBlogPost);
}

export function getProductBlogPosts(locale: LocaleCode, limit = 3): ResolvedBlogPost[] {
	const featured = getCheatsBlogPosts(locale).filter((post) => post.featured);
	const pool = featured.length >= limit ? featured : getCheatsBlogPosts(locale);
	return pool.slice(0, limit);
}

export function getPostsByCategory(locale: LocaleCode, category: string): ResolvedBlogPost[] {
	return getAllPostsForLocale(locale).filter((post) => post.category === category);
}

export function getRelatedPosts(
	locale: LocaleCode,
	post: ResolvedBlogPost,
	limit = 3,
): ResolvedBlogPost[] {
	const poolCategory = isGameGuidePost(post) ? GAME_GUIDES_CATEGORY : post.category;
	const all = getAllPostsForLocale(locale).filter(
		(p) => p.id !== post.id && p.category === poolCategory,
	);
	const pool = all.length >= limit ? all : getAllPostsForLocale(locale).filter((p) => p.id !== post.id);
	return pool.slice(0, limit);
}

export function getPostBySlug(locale: LocaleCode, slug: string): ResolvedBlogPost | undefined {
	const post = blogPosts.find((p) => p.translations[locale]?.slug === slug);
	return post ? resolvePost(post, locale) : undefined;
}

/**
 * ⚠️ QUARANTINED — DO NOT USE YET.
 * Blog hreflang: English + x-default only (matches site SEO policy).
 * Localized blog routes (`/{lang}/blog/…`) do not exist yet — do not expand
 * this to other locales until real translations and routes ship.
 */
export function getHreflangAlternates(post: BlogPostDefinition) {
	const enHref = absoluteBlogUrl(defaultLocale, post.translations[defaultLocale].slug);
	return [
		{
			hreflang: locales.find((l) => l.code === defaultLocale)!.hreflang,
			href: enHref,
		},
		{
			hreflang: 'x-default',
			href: enHref,
		},
	];
}

/**
 * ⚠️ QUARANTINED — DO NOT USE YET.
 * Generates static paths for localized blog routes (`/{lang}/blog/{slug}/`)
 * that are not implemented — no `src/pages/[lang]/blog/` route exists.
 * Do not wire into getStaticPaths (or sitemaps) until localized blog routes exist,
 * otherwise sitemaps/links would reference pages that are never built.
 */
export function getAllBlogStaticPaths(): { params: { lang?: string; slug: string }; props: { locale: LocaleCode } }[] {
	const paths: { params: { lang?: string; slug: string }; props: { locale: LocaleCode } }[] = [];
	for (const post of blogPosts) {
		for (const locale of localeCodes) {
			const slug = post.translations[locale].slug;
			if (locale === defaultLocale) {
				paths.push({ params: { slug }, props: { locale } });
			} else {
				paths.push({ params: { lang: locale, slug }, props: { locale } });
			}
		}
	}
	return paths;
}

/** English blog routes only (locale blog pages ship later). */
export function getBlogSitemapEntries() {
	const locale = defaultLocale;

	// The blog index reflects its newest post, so its lastmod is the max of all
	// post `updated` dates — never older than any post it links to.
	const indexLastmod = blogPosts.reduce(
		(max, post) => (post.updated > max ? post.updated : max),
		blogPosts[0]?.updated ?? new Date().toISOString().slice(0, 10),
	);

	const entries: {
		path: string;
		lastmod: string;
		priority: number;
		changefreq: 'daily' | 'weekly' | 'monthly';
		images: { url: string; title: string; caption: string }[];
	}[] = [
		{
			path: getBlogBasePath(locale),
			lastmod: indexLastmod,
			priority: 0.92,
			changefreq: 'daily',
			images: [
				{
					url: new URL(siteConfig.defaultOgImage, siteConfig.url).href,
					title: 'Enlisted cheats guides',
					caption: 'Enlisted cheats guides covering ESP, aimbot, undetected status, and vendor comparisons',
				},
			],
		},
	];

	for (const post of blogPosts) {
		if (isGameGuidePost(post)) continue;
		const t = post.translations[locale];
		const imageSrc = getBlogImageSrc(post.imageKey);
		entries.push({
			path: getBlogPostPath(locale, t.slug),
			lastmod: post.updated,
			priority: 0.9,
			changefreq: 'weekly',
			images: [
				{
					url: new URL(imageSrc, siteConfig.url).href,
					title: t.title,
					caption: t.imageAlt,
				},
			],
		});
	}

	return entries;
}
