import type { PageId } from '../data/i18n';
import { getLocalizedPath } from '../data/i18n/routing';
import type { LocaleCode } from '../data/i18n/locales';

export type InternalLink = {
	label: string;
	href: string;
};

type NavLabels = {
	esp: string;
	aimbot: string;
	features: string;
	setup: string;
	pricing: string;
	updates: string;
	faq: string;
};

/** Core product funnel links reused across pricing, reviews, and blog CTAs. */
export function getProductRelatedLinks(locale: LocaleCode, labels: NavLabels): InternalLink[] {
	return [
		{ label: labels.esp, href: getLocalizedPath('enlisted-esp', locale) },
		{ label: labels.aimbot, href: getLocalizedPath('enlisted-aimbot', locale) },
		{ label: labels.features, href: getLocalizedPath('features', locale) },
		{ label: labels.setup, href: getLocalizedPath('setup', locale) },
		{ label: labels.pricing, href: getLocalizedPath('pricing', locale) },
	];
}

/** Homepage explore hub — deep links not duplicated in the primary navbar. */
export function getHomeExploreLinks(locale: LocaleCode): InternalLink[] {
	return [
		{ label: 'Enlisted Cheats guide', href: getLocalizedPath('hacks', locale) },
		{ label: 'Enlisted ESP', href: getLocalizedPath('enlisted-esp', locale) },
		{ label: 'Enlisted Aimbot', href: getLocalizedPath('enlisted-aimbot', locale) },
		{ label: 'Enlisted wallhack', href: getLocalizedPath('wallhack', locale) },
		{ label: 'Enlisted radar', href: getLocalizedPath('radar', locale) },
		{ label: 'Setup guide', href: getLocalizedPath('setup', locale) },
		{ label: 'Guides hub', href: '/guides/' },
		{ label: 'Cheats guides', href: '/blog/' },
	];
}

/** Comparison blog posts — high-intent shopping keywords. */
export function getComparisonBlogLinks(): InternalLink[] {
	return [
		{ label: 'CheatVault comparison', href: '/blog/enlisted-cheats-vs-cheatvault-comparison/' },
		{ label: 'VoidCheats comparison', href: '/blog/voidcheats-vs-enlisted-cheats-two-week-test/' },
		{ label: 'Ghostware comparison', href: '/blog/enlisted-cheats-vs-ghostware-features-pricing/' },
		{ label: 'Anti-cheat reality guide', href: '/blog/undetected-enlisted-cheats-eac/' },
	];
}

/** Blog and review footer product shortcuts. */
export function getBlogProductLinks(locale: LocaleCode, labels: NavLabels): InternalLink[] {
	return [
		{ label: 'Enlisted Cheats', href: getLocalizedPath('hacks', locale) },
		{ label: labels.features, href: getLocalizedPath('features', locale) },
		{ label: labels.pricing, href: getLocalizedPath('pricing', locale) },
		{ label: 'Reviews', href: '/reviews/' },
		{ label: labels.setup, href: getLocalizedPath('setup', locale) },
		{ label: labels.updates, href: getLocalizedPath('updates', locale) },
		...getComparisonBlogLinks(),
	];
}

/** Map review tags to the most relevant product or support page. */
export const reviewTagLinks: Record<string, string> = {
	'Soft aim': '/enlisted-aimbot/',
	Extraction: '/enlisted-esp/',
	'Open World': '/enlisted-esp/',
	'campaign missions': '/enlisted-aimbot/',
	'Cloud DMA': '/enlisted-cheats/',
	Controller: '/enlisted-aimbot/',
	Setup: '/setup/',
	Ranked: '/enlisted-aimbot/',
	Squads: '/enlisted-radar/',
	Updates: '/updates/',
};

export function getReviewTagHref(tag: string | undefined): string | undefined {
	if (!tag) return undefined;
	return reviewTagLinks[tag];
}

/** Contextual related links for inner pages — extends the core funnel where relevant. */
export function getPageRelatedLinks(
	pageId: PageId,
	locale: LocaleCode,
	labels: NavLabels,
): InternalLink[] {
	const core = getProductRelatedLinks(locale, labels);
	const extras: Partial<Record<PageId, InternalLink[]>> = {
		hacks: [
			{ label: 'Wallhack', href: getLocalizedPath('wallhack', locale) },
			{ label: 'Radar', href: getLocalizedPath('radar', locale) },
			{ label: 'Reviews', href: '/reviews/' },
		],
		'enlisted-esp': [
			{ label: 'Wallhack', href: getLocalizedPath('wallhack', locale) },
			{ label: 'Radar', href: getLocalizedPath('radar', locale) },
			{ label: 'Reviews', href: '/reviews/' },
		],
		'enlisted-aimbot': [
			{ label: 'Soft aim', href: getLocalizedPath('soft-aim', locale) },
			{ label: 'ESP', href: getLocalizedPath('enlisted-esp', locale) },
			{ label: 'Reviews', href: '/reviews/' },
		],
		wallhack: [
			{ label: 'ESP', href: getLocalizedPath('enlisted-esp', locale) },
			{ label: 'Radar', href: getLocalizedPath('radar', locale) },
		],
		radar: [
			{ label: 'ESP', href: getLocalizedPath('enlisted-esp', locale) },
			{ label: 'Wallhack', href: getLocalizedPath('wallhack', locale) },
		],
		features: [{ label: 'Reviews', href: '/reviews/' }, { label: 'Cheats guides', href: '/blog/' }],
		pricing: [
			{ label: labels.faq, href: getLocalizedPath('faq', locale) },
			{ label: 'Reviews', href: '/reviews/' },
			{ label: 'CheatVault comparison', href: '/blog/enlisted-cheats-vs-cheatvault-comparison/' },
			{ label: 'VoidCheats comparison', href: '/blog/voidcheats-vs-enlisted-cheats-two-week-test/' },
		],
		setup: [
			{ label: labels.updates, href: getLocalizedPath('updates', locale) },
			{ label: 'Support', href: getLocalizedPath('support', locale) },
		],
		updates: [
			{ label: 'Undetected guide', href: getLocalizedPath('undetected', locale) },
			{ label: 'Support', href: getLocalizedPath('support', locale) },
		],
		faq: [
			{ label: 'Enlisted guides', href: '/guides/' },
			{ label: 'CheatVault comparison', href: '/blog/enlisted-cheats-vs-cheatvault-comparison/' },
			{ label: 'Anti-cheat guide', href: '/blog/undetected-enlisted-cheats-eac/' },
			{ label: 'Support', href: getLocalizedPath('support', locale) },
			{ label: 'Reviews', href: '/reviews/' },
		],
		support: [
			{ label: labels.faq, href: getLocalizedPath('faq', locale) },
			{ label: 'Refund policy', href: getLocalizedPath('refund', locale) },
		],
	};

	const merged = [...core, ...(extras[pageId] ?? [])];
	const seen = new Set<string>();
	return merged.filter((link) => {
		if (seen.has(link.href)) return false;
		seen.add(link.href);
		return true;
	});
}
