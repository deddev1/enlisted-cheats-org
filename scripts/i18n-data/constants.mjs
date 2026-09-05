/** Shared constants for i18n content generation. */

export const LOCALES = [
	'en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'tr',
	'ar', 'ja', 'ko', 'zh', 'hi', 'id', 'th', 'vi', 'uk', 'cs', 'ro', 'sv',
];

export const PAGE_IDS = [
	'home', 'enlisted-esp', 'enlisted-aimbot', 'features', 'pricing', 'setup',
	'updates', 'faq', 'support', 'undetected', 'wallhack', 'radar', 'eac-bypass',
	'cheats-2026', 'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all', 'privacy', 'refund', 'terms',
];

/**
 * Banner image per page — thematic Enlisted screenshots (see public/images/enlisted-*).
 */
export const HERO_IMAGES = {
	home: '/images/enlisted-cheats-hero.webp',
	'enlisted-esp': '/images/enlisted-esp-wallhack-overlay.webp',
	'enlisted-aimbot': '/images/enlisted-sortie-aimbot-combat.webp',
	features: '/images/enlisted-cheats-main-menu.webp',
	pricing: '/images/enlisted-cheats-main-menu.webp',
	setup: '/images/enlisted-cheats-settings-panel.webp',
	updates: '/images/enlisted-steel-path-mission-esp.webp',
	faq: '/images/enlisted-cheats-settings-panel.webp',
	support: '/images/enlisted-cheats-main-menu.webp',
	undetected: '/images/enlisted-cheats-combat-esp.webp',
	wallhack: '/images/enlisted-esp-enemy-boxes.webp',
	radar: '/images/enlisted-radar-hack-minimap.webp',
	'eac-bypass': '/images/enlisted-steel-path-mission-esp.webp',
	'cheats-2026': '/images/enlisted-cheats-hero.webp',
	hacks: '/images/enlisted-cheats-combat-esp.webp',
	'cheat-download': '/images/enlisted-cheats-main-menu.webp',
	'mod-menu': '/images/enlisted-cheats-main-menu.webp',
	'soft-aim': '/images/enlisted-sortie-aimbot-combat.webp',
	'best-cheats': '/images/enlisted-steel-path-mission-esp.webp',
	'aimbot-hack': '/images/enlisted-aimbot-targeting-menu.webp',
	'esp-hack': '/images/enlisted-esp-wallhack-overlay.webp',
	'unlock-all': '/images/enlisted-loot-pickup-esp.webp',
	privacy: '/images/enlisted-mission.webp',
	refund: '/images/enlisted-mission.webp',
	terms: '/images/enlisted-mission.webp',
};

export const TS_HEADER = `import type { LocaleCode } from './locales';

export type PageSection = { h2: string; paragraphs: string[]; list?: string[] };
export type PageContent = {
\ttitle: string;
\tdescription: string;
\th1: string;
\tintro: string;
\timageAlt: string;
\tgalleryTitle: string;
\theroImage: string;
\tsections: PageSection[];
\tctaPrimary: string;
\tctaSecondary?: string;
\tctaSecondaryHref?: string;
};
export type LocaleUi = {
\tnav: { home: string; aimbot: string; esp: string; features: string; pricing: string; setup: string; updates: string; faq: string; buyNow: string };
\thero: { accent: string; accentShort: string; subtitle: string; subtitleShort: string; buyNow: string; seeFeatures: string };
\ttrust: { status: string; statusNote: string; statusShort: string; delivery: string; platform: string; antiCheat: string; antiCheatShort: string };
\tproduct: { title: string; addToCart: string; monthly: string; lifetime: string; available: string; gameBadge: string; platformBadge: string; statusBadge: string };
\treviews: { title: string; subtitle: string; outOf: string; countLabel: string; verifiedLabel?: string; seeAll?: string };
\tcommon: { buyNow: string; readGuide: string; language: string; officialLanguageNote: string; relatedPages: string };
\tfooter: { explore: string; help: string; tagline: string };
\timages: {
\t\thero: string; espWallhack: string; aimbotCombat: string; squadFight: string; playerEsp: string;
\t\theaderArt: string; cheatsPackage: string; rebootFight: string; battleRoyale: string; battleRoyaleIsland: string;
\t};
};
export type PageId = 'home' | 'enlisted-esp' | 'enlisted-aimbot' | 'features' | 'pricing' | 'setup' | 'updates' | 'faq' | 'support' | 'undetected' | 'wallhack' | 'radar' | 'eac-bypass' | 'cheats-2026' | 'hacks' | 'cheat-download' | 'mod-menu' | 'soft-aim' | 'best-cheats' | 'aimbot-hack' | 'esp-hack' | 'unlock-all' | 'privacy' | 'refund' | 'terms';
`;

/** Clamp meta strings to SEO limits without ugly ellipsis. */
export function clampTitle(s) {
	if (s.length <= 60) return s;
	const trimmed = s.slice(0, 60);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 45 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 60);
}

export function clampDesc(s) {
	if (s.length <= 160) return s;
	const trimmed = s.slice(0, 160);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 130 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 160);
}

/** Remove Zadeyo from meta title/description strings only. */
export function stripZadeyoFromMeta(text) {
	return text
		.replace(/\s*[—–-]\s*checkout via Zadeyo\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout en Zadeyo\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout über Zadeyo\.?/gi, '.')
		.replace(/\s*with Zadeyo checkout\.?/gi, '.')
		.replace(/\s*via Zadeyo checkout\.?/gi, '.')
		.replace(/\s*Checkout via Zadeyo\.?/gi, '')
		.replace(/\s*Zadeyo checkout,?\s*/gi, ' ')
		.replace(/\s*Zadeyo delivery\.?/gi, ' instant digital delivery.')
		.replace(/\s*and Zadeyo delivery\.?/gi, ' and instant digital delivery.')
		.replace(/\|\s*Instant Zadeyo Delivery/g, '| Instant Digital Delivery')
		.replace(/Buy Enlisted Cheats/g, 'Buy Enlisted Cheats')
		.replace(/\s{2,}/g, ' ')
		.trim();
}

/** Build a page section. Pass 2+ paragraph strings; optional trailing string[] becomes list. */
export function section(h2, ...args) {
	let list;
	const paragraphs = [...args];
	if (paragraphs.length && Array.isArray(paragraphs[paragraphs.length - 1])) {
		list = paragraphs.pop();
	}
	if (paragraphs.length < 2) {
		throw new Error(`section "${h2}" needs at least 2 paragraphs`);
	}
	const sec = { h2, paragraphs };
	if (list?.length) sec.list = list;
	return sec;
}

/** Authoritative external citation helpers (open in new tab). */
export const EXT = {
	epic: '<a href="https://darkflowsoftware.com/" target="_blank" rel="noopener noreferrer">Darkflow Software</a>',
	rust: '<a href="https://enlisted.net/en/" target="_blank" rel="noopener noreferrer">official Enlisted patch notes</a>',
	status: '<a href="https://enlisted.net/en/news/" target="_blank" rel="noopener noreferrer">Enlisted PC update notes</a>',
	eac: '<a href="https://enlisted.net/en/" target="_blank" rel="noopener noreferrer">Enlisted anti-cheat</a>',
};
