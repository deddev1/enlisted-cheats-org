import { siteConfig } from './site';

const img = (name: string) => `/images/${name}`;

/** Homepage hero — self-hosted for sitemap and LCP. */
export const enlistedHeroImage = '/images/enlisted-cheats-hero.webp';

/** Real Enlisted gameplay screenshots for marketing carousel. */
export const enlistedGameplayImages = {
	esp: '/images/enlisted-gameplay/esp.png',
	aimbot: '/images/enlisted-gameplay/aimbot.png',
	wallhack: '/images/enlisted-gameplay/wallhack.png',
	radar: '/images/enlisted-gameplay/radar.png',
	combat: '/images/enlisted-gameplay/combat.png',
} as const;

export type EnlistedScreenshot = {
	src: string;
	alt: string;
	title: string;
};

/** Enlisted cheat screenshots — SEO filenames under /images/. */
export const enlistedScreenshots = {
	mainMenu: {
		src: img('enlisted-cheats-main-menu.webp'),
		alt: 'Enlisted cheats main menu with ESP, aimbot, and radar toggles on Windows PC',
		title: 'Enlisted Cheats main menu',
	},
	espOverlay: {
		src: img('enlisted-esp-wallhack-overlay.webp'),
		alt: 'Enlisted ESP wallhack overlay highlighting Axis and Allied soldiers through terrain',
		title: 'Enlisted ESP wallhack overlay',
	},
	espBoxes: {
		src: img('enlisted-esp-enemy-boxes.webp'),
		alt: 'Enlisted ESP enemy bounding boxes with health bars in a frontline campaign',
		title: 'Enlisted ESP enemy boxes',
	},
	aimbotMenu: {
		src: img('enlisted-aimbot-targeting-menu.webp'),
		alt: 'Enlisted aimbot settings menu with FOV, smoothing, and bone priority controls',
		title: 'Enlisted aimbot targeting menu',
	},
	radarMinimap: {
		src: img('enlisted-radar-hack-minimap.webp'),
		alt: 'Enlisted radar hack 2D minimap showing enemy positions outside the camera view',
		title: 'Enlisted radar hack minimap',
	},
	combatEsp: {
		src: img('enlisted-cheats-combat-esp.webp'),
		alt: 'Enlisted cheats combat ESP active during a Axis heavy unit fight',
		title: 'Enlisted combat ESP',
	},
	steelPathEsp: {
		src: img('enlisted-steel-path-mission-esp.webp'),
		alt: 'Enlisted frontline campaign with ESP overlays on elite enemy units',
		title: 'Enlisted frontline campaigns ESP',
	},
	sortieAimbot: {
		src: img('enlisted-sortie-aimbot-combat.webp'),
		alt: 'Enlisted skirmish combat with aimbot lock on a Allied heavy unit',
		title: 'Enlisted skirmish aimbot combat',
	},
	openWorldRadar: {
		src: img('enlisted-open-world-radar.webp'),
		alt: 'Enlisted large-scale battles radar and ESP on Moscow bounty route',
		title: 'Enlisted large-scale battles radar',
	},
	lootEsp: {
		src: img('enlisted-loot-pickup-esp.webp'),
		alt: 'Enlisted loot and pickup ESP markers for ammo, supplies, and medkits',
		title: 'Enlisted loot pickup ESP',
	},
	settingsPanel: {
		src: img('enlisted-cheats-settings-panel.webp'),
		alt: 'Enlisted cheats settings panel with hotkeys, colours, and module toggles',
		title: 'Enlisted cheats settings panel',
	},
} as const satisfies Record<string, EnlistedScreenshot>;

/** Pricing gallery — main viewer + thumbnail strip (no video). */
export const pricingGallery: EnlistedScreenshot[] = [
	enlistedScreenshots.mainMenu,
	enlistedScreenshots.espOverlay,
	enlistedScreenshots.espBoxes,
	enlistedScreenshots.aimbotMenu,
	enlistedScreenshots.radarMinimap,
	enlistedScreenshots.combatEsp,
	enlistedScreenshots.steelPathEsp,
	enlistedScreenshots.sortieAimbot,
	enlistedScreenshots.openWorldRadar,
	enlistedScreenshots.lootEsp,
	enlistedScreenshots.settingsPanel,
];

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
