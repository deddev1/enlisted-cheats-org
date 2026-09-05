import { siteConfig } from './site';

const localImage = (file: string) => `/images/${file}`;

export type EnlistedScreenshot = {
	src: string;
	alt: string;
	title: string;
};

/** Optimized local gameplay captures — responsive variants in /public/images. */
export const gameplayScreenshots = {
	wallhack: {
		src: localImage('enlisted-gameplay-wallhack.webp'),
		alt: 'Enlisted wallhack ESP highlighting an enemy soldier through wooden trench cover',
		title: 'Trench wallhack ESP',
	},
	esp: {
		src: localImage('enlisted-gameplay-esp.webp'),
		alt: 'Enlisted ESP showing red enemy silhouettes across an open battlefield',
		title: 'Open field ESP overlay',
	},
	aimbot: {
		src: localImage('enlisted-gameplay-aimbot.webp'),
		alt: 'Enlisted scope view with purple chams highlighting a distant enemy target',
		title: 'Scoped target highlight',
	},
	radarCombat: {
		src: localImage('enlisted-gameplay-radar-combat.webp'),
		alt: 'Enlisted radar hack with skeleton ESP, snaplines, and soldier labels in combat',
		title: 'Radar and skeleton ESP',
	},
	radarMap: {
		src: localImage('enlisted-gameplay-radar-map.webp'),
		alt: 'Enlisted 2D radar minimap with soldier icons visible through terrain',
		title: '2D battlefield radar',
	},
} as const satisfies Record<string, EnlistedScreenshot>;

/** Homepage cheat showcase cards — same five gameplay captures. */
export const showcaseGameplay: EnlistedScreenshot[] = [
	gameplayScreenshots.wallhack,
	gameplayScreenshots.esp,
	gameplayScreenshots.aimbot,
	gameplayScreenshots.radarCombat,
	gameplayScreenshots.radarMap,
];

/** Homepage hero — local responsive WebP (same art as Supabase index-new-bg-5). */
export const enlistedHeroImage = localImage('enlisted-cheats-hero.webp');

export const enlistedHeroAlt =
	'Enlisted Cheats hero banner with WWII soldiers in a cinematic battlefield scene';

const g = gameplayScreenshots;

/** Enlisted cheat screenshots — all mapped to live Supabase gameplay captures. */
export const enlistedScreenshots = {
	mainMenu: {
		src: g.radarMap.src,
		alt: 'Enlisted cheats 2D radar with soldier threat markers in live combat',
		title: 'Enlisted Cheats battlefield radar',
	},
	espOverlay: {
		src: g.esp.src,
		alt: g.esp.alt,
		title: g.esp.title,
	},
	espBoxes: {
		src: g.wallhack.src,
		alt: g.wallhack.alt,
		title: g.wallhack.title,
	},
	aimbotMenu: {
		src: g.aimbot.src,
		alt: g.aimbot.alt,
		title: g.aimbot.title,
	},
	radarMinimap: {
		src: g.radarMap.src,
		alt: g.radarMap.alt,
		title: g.radarMap.title,
	},
	combatEsp: {
		src: g.radarCombat.src,
		alt: g.radarCombat.alt,
		title: g.radarCombat.title,
	},
	steelPathEsp: {
		src: g.esp.src,
		alt: 'Enlisted ESP overlays on enemy units during campaign missions',
		title: 'Enlisted campaign missions ESP',
	},
	sortieAimbot: {
		src: g.aimbot.src,
		alt: 'Enlisted aimbot scope highlight during squad assault combat',
		title: 'Enlisted squad assault aimbot combat',
	},
	openWorldRadar: {
		src: g.radarMap.src,
		alt: 'Enlisted battlefield radar and ESP on Eastern Front maps',
		title: 'Enlisted battlefield radar',
	},
	lootEsp: {
		src: g.esp.src,
		alt: 'Enlisted ESP markers for resources and supply points in combat',
		title: 'Enlisted supply ESP',
	},
	settingsPanel: {
		src: g.aimbot.src,
		alt: 'Enlisted cheats scoped targeting and combat assist controls',
		title: 'Enlisted aimbot targeting view',
	},
} as const satisfies Record<string, EnlistedScreenshot>;

/** Pricing section — shop background beside checkout. */
export const pricingShopImage: EnlistedScreenshot = {
	src: localImage('enlisted-pricing-shop-bg.webp'),
	alt: 'Enlisted shop background with WWII soldiers and battlefield atmosphere',
	title: 'Enlisted Cheats shop preview',
};

/** Homepage reviews band — official Enlisted.net scr/thumb-1 background. */
export const reviewsSectionBg: EnlistedScreenshot = {
	src: localImage('enlisted-reviews-bg.webp'),
	alt: 'Enlisted WWII battlefield background behind customer reviews',
	title: 'Enlisted reviews section background',
};

/** Homepage FAQ band — official Enlisted.net scr/4 background. */
export const faqSectionBg: EnlistedScreenshot = {
	src: localImage('enlisted-faq-bg.jpg'),
	alt: 'Enlisted WWII battlefield background behind frequently asked questions',
	title: 'Enlisted FAQ section background',
};

/** Homepage features band — official Enlisted.net scr/thumb-12 background. */
export const featuresSectionBg: EnlistedScreenshot = {
	src: localImage('enlisted-features-bg.webp'),
	alt: 'Enlisted WWII battlefield background behind the features list',
	title: 'Enlisted features section background',
};

/** Official Enlisted.net marketing screenshots for secondary page heroes and UI accents. */
export const enlistedOfficialScreens = {
	battlefieldPanorama: {
		src: 'https://enlisted.net/i/scr/10.jpg?v=20251222',
		alt: 'Enlisted WWII battlefield panorama with soldiers and vehicles in combat',
		title: 'Enlisted battlefield panorama',
	},
	squadCombat: {
		src: 'https://enlisted.net/i/scr/3.jpg?v=20251222',
		alt: 'Enlisted squad combat screenshot with infantry action on the front line',
		title: 'Enlisted squad combat',
	},
	squadThumb: {
		src: 'https://enlisted.net/i/scr/thumb-6.webp?v=20251222',
		alt: 'Enlisted squad gameplay thumbnail from official Enlisted screenshots',
		title: 'Enlisted squad thumbnail',
	},
} as const satisfies Record<string, EnlistedScreenshot>;

export const reviewsHeroImage = enlistedOfficialScreens.battlefieldPanorama.src;
export const reviewsHeroAlt = enlistedOfficialScreens.battlefieldPanorama.alt;
export const reviewDetailHeroImage = enlistedOfficialScreens.squadCombat.src;
export const reviewDetailHeroAlt = enlistedOfficialScreens.squadCombat.alt;

/** Official Enlisted.net art on secondary page heroes (gameplay shots stay on cheat feature pages). */
export const pageHeroOverrides: Partial<Record<string, string>> = {
	features: enlistedOfficialScreens.battlefieldPanorama.src,
	pricing: pricingShopImage.src,
	setup: enlistedOfficialScreens.squadThumb.src,
	updates: enlistedOfficialScreens.squadCombat.src,
	faq: enlistedOfficialScreens.squadCombat.src,
	support: enlistedOfficialScreens.battlefieldPanorama.src,
	privacy: enlistedOfficialScreens.squadThumb.src,
	refund: enlistedOfficialScreens.squadThumb.src,
	terms: enlistedOfficialScreens.squadThumb.src,
	hacks: enlistedOfficialScreens.battlefieldPanorama.src,
	undetected: enlistedOfficialScreens.battlefieldPanorama.src,
	'cheats-2026': enlistedOfficialScreens.battlefieldPanorama.src,
	'best-cheats': enlistedOfficialScreens.squadCombat.src,
	'cheat-download': pricingShopImage.src,
	'mod-menu': enlistedOfficialScreens.squadThumb.src,
	'eac-bypass': enlistedOfficialScreens.squadCombat.src,
};

/** Map legacy Supabase hero URLs from generated content to local WebP assets. */
export function mapSupabaseHeroToLocal(heroImage: string): string | undefined {
	if (!heroImage.includes('supabase.co/storage')) return undefined;
	if (heroImage.includes('index-new-bg-5')) return enlistedHeroImage;
	if (heroImage.includes('161627')) return gameplayScreenshots.wallhack.src;
	if (heroImage.includes('161636')) return gameplayScreenshots.esp.src;
	if (heroImage.includes('161643')) return gameplayScreenshots.aimbot.src;
	if (heroImage.includes('161704')) return gameplayScreenshots.radarCombat.src;
	if (heroImage.includes('161712')) return gameplayScreenshots.radarMap.src;
	if (heroImage.includes('bottom-shop-bg')) return pricingShopImage.src;
	return undefined;
}

export function resolvePageHeroImage(pageId: string, heroImage: string): string {
	if (pageHeroOverrides[pageId]) return pageHeroOverrides[pageId]!;
	const localHero = mapSupabaseHeroToLocal(heroImage);
	if (localHero) return localHero;
	if (heroImage.startsWith('http')) return heroImage;
	return legacyGameplayImageMap[heroImage] ?? heroImage;
}

export const pricingGallery: EnlistedScreenshot[] = [pricingShopImage];

/** Feature page section screenshots keyed to productFeatureDetails ids. */
export const featureSectionImages: Record<'aimbot' | 'visual' | 'misc', EnlistedScreenshot> = {
	aimbot: enlistedScreenshots.sortieAimbot,
	visual: enlistedScreenshots.espOverlay,
	misc: enlistedScreenshots.radarMinimap,
};

/** Extra visuals shown below the feature breakdown grid. */
export const featureGallery: EnlistedScreenshot[] = [...showcaseGameplay];

const s = enlistedScreenshots;

export const enlistedImages = {
	hero: enlistedHeroImage,
	cover: s.espOverlay.src,
	logo: siteConfig.logo,
	loadoutBuilder: s.aimbotMenu.src,
	aimbotCombat: s.sortieAimbot.src,
	squadFight: s.combatEsp.src,
	espWallhack: s.espBoxes.src,
	cheatsPackage: s.mainMenu.src,
	headerArt: s.settingsPanel.src,
	battleRoyaleCombat: s.steelPathEsp.src,
	rebootFight: s.radarMinimap.src,
	playerEsp: s.espOverlay.src,
	radarHack: s.radarMinimap.src,
	zeroBuildCombat: s.combatEsp.src,
	zeroBuildMode: s.espBoxes.src,
	openWorldTileset: s.openWorldRadar.src,
	battleRoyaleIsland: g.radarMap.src,
	product: showcaseGameplay.map((image) => ({ src: image.src, alt: image.alt })),
	gallery: [
		{ src: g.wallhack.src, alt: g.wallhack.alt, href: '/enlisted-wallhack/' },
		{ src: g.esp.src, alt: g.esp.alt, href: '/enlisted-esp/' },
		{ src: g.aimbot.src, alt: g.aimbot.alt, href: '/enlisted-aimbot/' },
		{ src: g.radarCombat.src, alt: g.radarCombat.alt, href: '/enlisted-cheats/' },
		{ src: g.radarMap.src, alt: g.radarMap.alt, href: '/enlisted-radar/' },
	],
	sitemap: showcaseGameplay.map((image) => ({
		src: image.src,
		title: image.title,
		caption: image.alt,
	})),
} as const;

/** Replace legacy /images paths in generated i18n content (hero excluded). */
export const legacyGameplayImageMap: Record<string, string> = {
	'/images/enlisted-esp-wallhack-overlay.webp': g.esp.src,
	'/images/enlisted-esp-enemy-boxes.webp': g.wallhack.src,
	'/images/enlisted-squad-aimbot-combat.webp': g.aimbot.src,
	'/images/enlisted-aimbot-targeting-menu.webp': g.aimbot.src,
	'/images/enlisted-radar-hack-minimap.webp': g.radarMap.src,
	'/images/enlisted-cheats-combat-esp.webp': g.radarCombat.src,
	'/images/enlisted-campaign-mission-esp.webp': g.esp.src,
	'/images/enlisted-cheats-main-menu.webp': g.radarMap.src,
	'/images/enlisted-cheats-settings-panel.webp': g.aimbot.src,
	'/images/enlisted-supply-esp.webp': g.esp.src,
	'/images/enlisted-mission.webp': g.wallhack.src,
	'/images/enlisted-battlefield-radar.webp': g.radarMap.src,
	'/images/enlisted-esp-overlay.webp': g.esp.src,
};

const heroAltSources: EnlistedScreenshot[] = [
	...Object.values(gameplayScreenshots),
	...Object.values(enlistedScreenshots),
	...Object.values(enlistedOfficialScreens),
	pricingShopImage,
	{ src: enlistedHeroImage, alt: enlistedHeroAlt, title: 'Enlisted Cheats home hero' },
];

export const heroAltBySrc: Record<string, string> = Object.fromEntries(
	heroAltSources.map((item) => [item.src, item.alt]),
);

/** Match official Enlisted.net hero art with descriptive alt text on secondary pages. */
export const pageHeroAltOverrides: Partial<Record<string, string>> = {
	features: enlistedOfficialScreens.battlefieldPanorama.alt,
	pricing: pricingShopImage.alt,
	setup: enlistedOfficialScreens.squadThumb.alt,
	updates: enlistedOfficialScreens.squadCombat.alt,
	faq: enlistedOfficialScreens.squadCombat.alt,
	support: enlistedOfficialScreens.battlefieldPanorama.alt,
	privacy: enlistedOfficialScreens.squadThumb.alt,
	refund: enlistedOfficialScreens.squadThumb.alt,
	terms: enlistedOfficialScreens.squadThumb.alt,
	hacks: enlistedOfficialScreens.battlefieldPanorama.alt,
	undetected: enlistedOfficialScreens.battlefieldPanorama.alt,
	'cheats-2026': enlistedOfficialScreens.battlefieldPanorama.alt,
	'best-cheats': enlistedOfficialScreens.squadCombat.alt,
	'cheat-download': pricingShopImage.alt,
	'mod-menu': enlistedOfficialScreens.squadThumb.alt,
	'eac-bypass': enlistedOfficialScreens.squadCombat.alt,
};

export function resolvePageHeroAlt(
	pageId: string,
	resolvedHeroImage: string,
	imageAlt: string,
): string {
	if (pageHeroAltOverrides[pageId]) return pageHeroAltOverrides[pageId]!;
	return heroAltBySrc[resolvedHeroImage] ?? imageAlt;
}
