import { siteConfig } from './site';

const supabaseGameplayBase =
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/enlisted';

export type EnlistedScreenshot = {
	src: string;
	alt: string;
	title: string;
};

/** Live Supabase gameplay captures — used across the site (homepage hero excluded). */
export const gameplayScreenshots = {
	wallhack: {
		src: `${supabaseGameplayBase}/Screenshot%202026-09-04%20161627.png`,
		alt: 'Enlisted wallhack ESP highlighting an enemy soldier through wooden trench cover',
		title: 'Trench wallhack ESP',
	},
	esp: {
		src: `${supabaseGameplayBase}/Screenshot%202026-09-04%20161636.png`,
		alt: 'Enlisted ESP showing red enemy silhouettes across an open battlefield',
		title: 'Open field ESP overlay',
	},
	aimbot: {
		src: `${supabaseGameplayBase}/Screenshot%202026-09-04%20161643.png`,
		alt: 'Enlisted scope view with purple chams highlighting a distant enemy target',
		title: 'Scoped target highlight',
	},
	radarCombat: {
		src: `${supabaseGameplayBase}/Screenshot%202026-09-04%20161704.png`,
		alt: 'Enlisted radar hack with skeleton ESP, snaplines, and soldier labels in combat',
		title: 'Radar and skeleton ESP',
	},
	radarMap: {
		src: `${supabaseGameplayBase}/Screenshot%202026-09-04%20161712.png`,
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

/** Homepage hero — Supabase cinematic background. */
export const enlistedHeroImage = `${supabaseGameplayBase}/index-new-bg-5.webp`;

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

/** Pricing gallery — main viewer + thumbnail strip. */
export const pricingGallery: EnlistedScreenshot[] = [...showcaseGameplay];

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
