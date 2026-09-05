import { siteConfig } from './site';
import { enlistedImages } from './enlisted';
import { englishPaths, sitemapPageIds, type PageId } from './i18n/routing';
import { pageSitemapMeta } from './sitemap-meta';

export type SitemapImage = {
	url: string;
	title: string;
	caption: string;
};

export type PageSitemapEntry = {
	path: string;
	priority: number;
	changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
	lastmod: string;
	images: SitemapImage[];
};

const abs = (path: string) => new URL(path, siteConfig.url).href;

const img = (path: string, title: string, caption: string): SitemapImage => ({
	url: abs(path),
	title,
	caption,
});

/** Sitemap image assignments for indexable pages only (see sitemapPageIds in routing.ts). */
const sitemapImagesByPageId: Partial<Record<PageId, SitemapImage[]>> = {
	home: [
		img(enlistedImages.hero, 'Enlisted Cheats', 'Enlisted Cheats homepage hero'),
		img(enlistedImages.espWallhack, 'Enlisted ESP', 'Enlisted ESP wallhack overlay'),
		img(enlistedImages.aimbotCombat, 'Enlisted Aimbot', 'Enlisted Aimbot combat preview'),
	],
	hacks: [
		img(enlistedImages.battleRoyaleCombat, 'Enlisted Cheats', 'Enlisted cheats campaign squad fight preview'),
		img(enlistedImages.espWallhack, 'Enlisted Cheats ESP', 'Enlisted wallhack ESP on enemy infantry, tanks, and artillery'),
	],
	'enlisted-esp': [
		img(enlistedImages.espWallhack, 'Enlisted ESP', 'Enlisted ESP wallhack overlay'),
		img(enlistedImages.playerEsp, 'Enlisted Enemy ESP', 'Enlisted Enemy ESP markers'),
	],
	'enlisted-aimbot': [
		img(enlistedImages.aimbotCombat, 'Enlisted Aimbot', 'Enlisted Aimbot combat preview'),
		img(enlistedImages.squadFight, 'Enlisted Aimbot squad fight', 'Enlisted Aimbot in squad combat'),
	],
	wallhack: [
		img(enlistedImages.espWallhack, 'Enlisted Wallhack', 'Enlisted wallhack ESP view'),
		img(enlistedImages.cover, 'Enlisted Wallhack overlay', 'Enlisted ESP boxes through terrain'),
	],
	radar: [
		img(enlistedImages.radarHack, 'Enlisted Radar Hack', 'Enlisted radar hack minimap overlay'),
		img(enlistedImages.rebootFight, 'Enlisted Radar Hack overlay', 'Enlisted 2D radar for flank detection'),
	],
	features: [
		img(enlistedImages.hero, 'Enlisted Cheats Features', 'Enlisted Cheats feature overview'),
		img(enlistedImages.loadoutBuilder, 'Enlisted Cheats menu', 'Enlisted Cheats in-client controls'),
	],
	pricing: [
		img(enlistedImages.cover, 'Enlisted Cheats Pricing', 'Enlisted Cheats license plans'),
		img(enlistedImages.cheatsPackage, 'Enlisted Cheats package', 'Enlisted Cheats product package'),
	],
	setup: [
		img(enlistedImages.squadFight, 'Enlisted Cheats Setup', 'Enlisted Cheats installation guide'),
	],
	updates: [
		img(enlistedImages.hero, 'Enlisted Cheats Updates', 'Enlisted Cheats patch status'),
	],
	faq: [
		img(enlistedImages.loadoutBuilder, 'Enlisted Cheats FAQ', 'Enlisted Cheats frequently asked questions'),
	],
	support: [
		img(enlistedImages.headerArt, 'Enlisted Cheats Support', 'Enlisted Cheats help center'),
	],
	privacy: [
		img(enlistedImages.cover, 'Enlisted Cheats Privacy Policy', 'Enlisted Cheats privacy policy'),
	],
	refund: [
		img(enlistedImages.cover, 'Enlisted Cheats Refund Policy', 'Enlisted Cheats refund policy'),
	],
	terms: [
		img(enlistedImages.squadFight, 'Enlisted Cheats Terms', 'Enlisted Cheats terms of use'),
	],
};

for (const pageId of sitemapPageIds) {
	if (!sitemapImagesByPageId[pageId]?.length) {
		throw new Error(`[sitemap] No images configured for sitemap pageId: ${pageId}`);
	}
}

/** Canonical English sitemap entries — core enlisted-cheats URLs only. */
export const pageSitemapEntries: PageSitemapEntry[] = sitemapPageIds.map((pageId) => {
	const meta = pageSitemapMeta[pageId];
	return {
		path: englishPaths[pageId],
		priority: meta.priority,
		changefreq: meta.changefreq,
		lastmod: meta.lastmod,
		images: sitemapImagesByPageId[pageId]!,
	};
});

/** Unique keyword images for the dedicated image sitemap. */
export const imageSitemapEntries: SitemapImage[] = enlistedImages.sitemap.map((entry) =>
	img(entry.src, entry.title, entry.caption),
);

export function absolutePageUrl(path: string): string {
	return abs(path);
}

export function absoluteAssetUrl(path: string): string {
	return abs(path);
}
