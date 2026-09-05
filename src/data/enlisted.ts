import { siteConfig } from './site';

export type EnlistedScreenshot = {
	src: string;
	alt: string;
	title: string;
};

/** Homepage hero — self-hosted for sitemap and LCP. */
export const enlistedHeroImage = '/images/enlisted-cheats-hero.webp';

/** Pricing sidebar — simple Enlisted shop background beside checkout. */
export const enlistedPricingImage = {
	src: '/images/enlisted-pricing-bg.webp',
	alt: 'Enlisted WW2 battlefield atmosphere art beside pricing plans',
	title: 'Enlisted pricing background',
} as const satisfies EnlistedScreenshot;

/** Real Enlisted gameplay screenshots for marketing carousel. */
export const enlistedGameplayImages = {
	esp: '/images/enlisted-gameplay/esp.png',
	aimbot: '/images/enlisted-gameplay/aimbot.png',
	wallhack: '/images/enlisted-gameplay/wallhack.png',
	radar: '/images/enlisted-gameplay/radar.png',
	combat: '/images/enlisted-gameplay/combat.png',
} as const;

/** Official Enlisted.net battlefield screenshots for review heroes and social previews. */
export const enlistedOfficialImages = {
	hero: {
		src: '/images/enlisted-official/battle-hero.webp',
		alt: 'Enlisted WW2 battlefield screenshot with infantry and vehicles in combat',
		title: 'Enlisted battlefield hero',
	},
	combat: {
		src: '/images/enlisted-official/battle-combat.webp',
		alt: 'Enlisted large-scale battle with soldiers advancing through smoke and artillery',
		title: 'Enlisted large-scale battle',
	},
	thumb: {
		src: '/images/enlisted-official/battle-thumb.webp',
		alt: 'Enlisted squad combat thumbnail for reviews and social previews',
		title: 'Enlisted combat thumbnail',
	},
} as const satisfies Record<string, EnlistedScreenshot>;

export const reviewHeroImage = enlistedOfficialImages.hero;
export const reviewDetailHeroImage = enlistedOfficialImages.combat;
export const reviewOgImage = enlistedOfficialImages.thumb.src;

const g = enlistedGameplayImages;

/** Enlisted cheat screenshots — user-provided gameplay captures. */
export const enlistedScreenshots = {
	mainMenu: {
		src: g.esp,
		alt: 'Enlisted cheats main menu with ESP, aimbot, and radar toggles on Windows PC',
		title: 'Enlisted Cheats main menu',
	},
	espOverlay: {
		src: g.esp,
		alt: 'Enlisted ESP wallhack overlay highlighting Axis and Allied soldiers through terrain',
		title: 'Enlisted ESP wallhack overlay',
	},
	espBoxes: {
		src: g.wallhack,
		alt: 'Enlisted ESP enemy bounding boxes with health bars in a frontline campaign',
		title: 'Enlisted ESP enemy boxes',
	},
	aimbotMenu: {
		src: g.aimbot,
		alt: 'Enlisted aimbot settings menu with FOV, smoothing, and bone priority controls',
		title: 'Enlisted aimbot targeting menu',
	},
	radarMinimap: {
		src: g.radar,
		alt: 'Enlisted radar hack 2D minimap showing enemy positions outside the camera view',
		title: 'Enlisted radar hack minimap',
	},
	combatEsp: {
		src: g.combat,
		alt: 'Enlisted cheats combat ESP active during a Axis heavy unit fight',
		title: 'Enlisted combat ESP',
	},
	steelPathEsp: {
		src: g.combat,
		alt: 'Enlisted frontline campaign with ESP overlays on elite enemy units',
		title: 'Enlisted frontline campaigns ESP',
	},
	sortieAimbot: {
		src: g.aimbot,
		alt: 'Enlisted skirmish combat with aimbot lock on a Allied heavy unit',
		title: 'Enlisted skirmish aimbot combat',
	},
	openWorldRadar: {
		src: g.radar,
		alt: 'Enlisted large-scale battles radar and ESP on Moscow bounty route',
		title: 'Enlisted large-scale battles radar',
	},
	lootEsp: {
		src: g.esp,
		alt: 'Enlisted loot and pickup ESP markers for ammo, supplies, and medkits',
		title: 'Enlisted loot pickup ESP',
	},
	settingsPanel: {
		src: g.aimbot,
		alt: 'Enlisted cheats settings panel with hotkeys, colours, and module toggles',
		title: 'Enlisted cheats settings panel',
	},
} as const satisfies Record<string, EnlistedScreenshot>;

/** Pricing sidebar image — single static background beside checkout. */
export const pricingGallery: EnlistedScreenshot[] = [enlistedPricingImage];

/** Feature page section screenshots keyed to productFeatureDetails ids. */
export const featureSectionImages: Record<'aimbot' | 'visual' | 'misc', EnlistedScreenshot> = {
	aimbot: enlistedScreenshots.sortieAimbot,
	visual: enlistedScreenshots.espOverlay,
	misc: enlistedScreenshots.radarMinimap,
};

/** Extra visuals shown below the feature breakdown grid. */
export const featureGallery: EnlistedScreenshot[] = [
	enlistedScreenshots.mainMenu,
	enlistedScreenshots.espBoxes,
	enlistedScreenshots.aimbotMenu,
	enlistedScreenshots.combatEsp,
	enlistedScreenshots.steelPathEsp,
	enlistedScreenshots.openWorldRadar,
	enlistedScreenshots.lootEsp,
	enlistedScreenshots.settingsPanel,
];

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
	product: [
		{ src: s.espOverlay.src, alt: s.espOverlay.alt },
		{ src: s.espBoxes.src, alt: s.espBoxes.alt },
		{ src: s.sortieAimbot.src, alt: s.sortieAimbot.alt },
		{ src: s.aimbotMenu.src, alt: s.aimbotMenu.alt },
		{ src: s.radarMinimap.src, alt: s.radarMinimap.alt },
	],
	gallery: [
		{ src: s.mainMenu.src, alt: s.mainMenu.alt, href: '/enlisted-cheats/' },
		{ src: s.espOverlay.src, alt: s.espOverlay.alt, href: '/enlisted-esp/' },
		{ src: s.espBoxes.src, alt: s.espBoxes.alt, href: '/enlisted-wallhack/' },
		{ src: s.sortieAimbot.src, alt: s.sortieAimbot.alt, href: '/enlisted-aimbot/' },
		{ src: s.settingsPanel.src, alt: s.settingsPanel.alt, href: '/features/' },
		{ src: s.radarMinimap.src, alt: s.radarMinimap.alt, href: '/enlisted-radar/' },
		{ src: s.combatEsp.src, alt: s.combatEsp.alt, href: '/enlisted-cheats/' },
	],
	sitemap: [
		{ src: s.mainMenu.src, title: 'Enlisted Cheats | Undetected ESP & Aimbot', caption: s.mainMenu.alt },
		{ src: s.espOverlay.src, title: 'Enlisted ESP overlay', caption: s.espOverlay.alt },
		{ src: s.espBoxes.src, title: 'Enlisted wallhack ESP', caption: s.espBoxes.alt },
		{ src: s.sortieAimbot.src, title: 'Enlisted aimbot targeting', caption: s.sortieAimbot.alt },
		{ src: s.aimbotMenu.src, title: 'Enlisted aimbot menu', caption: s.aimbotMenu.alt },
		{ src: s.radarMinimap.src, title: 'Enlisted radar hack', caption: s.radarMinimap.alt },
		{ src: s.combatEsp.src, title: 'Enlisted frontline campaign cheats', caption: s.combatEsp.alt },
		{ src: s.steelPathEsp.src, title: 'Enlisted frontline campaigns ESP', caption: s.steelPathEsp.alt },
		{ src: s.openWorldRadar.src, title: 'Enlisted large-scale battles radar', caption: s.openWorldRadar.alt },
		{ src: s.lootEsp.src, title: 'Enlisted loot pickup ESP', caption: s.lootEsp.alt },
		{ src: s.settingsPanel.src, title: 'Enlisted cheats settings panel', caption: s.settingsPanel.alt },
	],
} as const;
