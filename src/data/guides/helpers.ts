import { siteConfig } from '../site';
import { getPostsByCategory } from '../blog/helpers';
import { defaultLocale } from '../i18n/locales';
import { getGuideImageForGame } from './ign-images';
import { externalGuidePosts } from './posts.generated';
import type { ExternalGuidePost, ResolvedExternalGuide } from './types';

export const guidesBasePath = '/guides/';
export const NATIVE_GAME_GUIDES_CATEGORY = 'Enlisted Game Guides';

/** Trusted third-party Enlisted supplys shown below native guides on /guides/. */
export const enlistedAuthorityLinks = [
	{
		title: 'Enlisted on Steam',
		description: 'Official store page, system requirements, and player reviews.',
		href: 'https://store.steampowered.com/app/230410/Enlisted/',
	},
	{
		title: 'Enlisted patch notes & news',
		description: 'Read official PC update posts before you change your loadout.',
		href: 'https://enlisted.net/en/news/',
	},
	{
		title: 'Official Enlisted website',
		description: 'Game overview, news, and supplys from Darkflow Software.',
		href: 'https://enlisted.net/en/',
	},
	{
		title: 'Enlisted Steam community hub',
		description: 'Announcements, guides, and community discussions.',
		href: 'https://steamcommunity.com/app/230410',
	},
] as const;

/** Pedagogical order for native Enlisted guides on the hub. */
const NATIVE_GUIDE_ORDER = [
	'enlisted-new-player-guide',
	'enlisted-mission-types-guide',
	'enlisted-factions-explained',
	'enlisted-large-scale-battles',
	'enlisted-campaign-guide',
	'enlisted-patch-notes-guide',
];

export function getGuidePath(slug: string): string {
	return `${guidesBasePath}${slug}/`;
}

export function absoluteGuideUrl(slug?: string): string {
	return new URL(slug ? getGuidePath(slug) : guidesBasePath, siteConfig.url).href;
}

export function resolveExternalGuide(post: ExternalGuidePost): ResolvedExternalGuide {
	const image = getGuideImageForGame(post.gameId);
	return {
		...post,
		imageSrc: image.src,
		imageAlt: image.alt,
		canonicalPath: getGuidePath(post.slug),
	};
}

export function getAllExternalGuides(): ResolvedExternalGuide[] {
	return externalGuidePosts.map(resolveExternalGuide);
}

export function getExternalGuideBySlug(slug: string): ResolvedExternalGuide | undefined {
	const post = externalGuidePosts.find((p) => p.slug === slug);
	return post ? resolveExternalGuide(post) : undefined;
}

/** Native Enlisted game guides from the blog — shown at top of /guides/. */
export function getNativeEnlistedGuides() {
	const guides = getPostsByCategory(defaultLocale, NATIVE_GAME_GUIDES_CATEGORY);
	const order = new Map(NATIVE_GUIDE_ORDER.map((id, index) => [id, index]));
	return [...guides].sort((a, b) => {
		const ai = order.get(a.id) ?? 999;
		const bi = order.get(b.id) ?? 999;
		return ai - bi;
	});
}

/** External guides interleaved by game so same-game articles are not grouped together. */
export function getMixedExternalGuides(): ResolvedExternalGuide[] {
	const byGame = new Map<string, ResolvedExternalGuide[]>();
	for (const guide of getAllExternalGuides()) {
		const list = byGame.get(guide.gameId) ?? [];
		list.push(guide);
		byGame.set(guide.gameId, list);
	}

	const groups = [...byGame.values()];
	const mixed: ResolvedExternalGuide[] = [];
	let round = 0;

	while (mixed.length < externalGuidePosts.length) {
		for (const group of groups) {
			if (group[round]) mixed.push(group[round]);
		}
		round++;
	}

	// Break any trailing same-game pairs when one title has more guides than others.
	for (let i = 1; i < mixed.length; i++) {
		if (mixed[i].gameId === mixed[i - 1].gameId) {
			const swapIndex = mixed.findIndex((guide, j) => j > i && guide.gameId !== mixed[i - 1].gameId);
			if (swapIndex > i) {
				[mixed[i], mixed[swapIndex]] = [mixed[swapIndex], mixed[i]];
			}
		}
	}

	return mixed;
}

/** @deprecated Use getMixedExternalGuides for hub display. */
export function getExternalGuidesByGame(): { gameName: string; guides: ResolvedExternalGuide[] }[] {
	const groups = new Map<string, ResolvedExternalGuide[]>();
	for (const guide of getAllExternalGuides()) {
		const list = groups.get(guide.gameName) ?? [];
		list.push(guide);
		groups.set(guide.gameName, list);
	}
	return [...groups.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([gameName, guides]) => ({ gameName, guides }));
}

/** Guides sitemap entries — hub only; external guide articles are noindex. */
export function getGuidesSitemapEntries() {
	const guides = getAllExternalGuides();
	const indexLastmod = guides.reduce(
		(max, guide) => (guide.updated > max ? guide.updated : max),
		guides[0]?.updated ?? new Date().toISOString().slice(0, 10),
	);

	return [
		{
			path: guidesBasePath,
			lastmod: indexLastmod,
			priority: 0.88,
			changefreq: 'weekly' as const,
			images: [
				{
					url: new URL(siteConfig.defaultOgImage, siteConfig.url).href,
					title: 'Game guides hub',
					caption: 'Enlisted native guides and multi-game gameplay guides',
				},
			],
		},
	];
}
