import type { LocaleCode } from './locales';

export type GalleryUi = {
	eyebrow: string;
	title: string;
	subtitle: string;
	lead: string;
	highlights: { title: string; copy: string }[];
	updatesLabel: string;
	updatesShort: string;
};

const enGallery: GalleryUi = {
	eyebrow: 'Enlisted Cheats',
	title: 'Enlisted gallery',
	subtitle:
		'Real Enlisted cheat screenshots — ESP boxes, wallhack overlays, aimbot menus, and radar — from the undetected PC package players use in campaigns, skirmishes, and large-scale battles.',
	lead:
		'Enlisted Cheats is built for Enlisted on Windows PC: read Axis, Allied, and heavy vehicles through cover, track flank spawns on a 2D radar, tune soft aim before missions, and buy one license that covers ESP, wallhack, and aimbot together.',
	highlights: [
		{
			title: 'Enemy & objective ESP',
			copy: 'Box, skeleton, and health-bar readouts on Axis, Allied, and heavy vehicles through map geometry so you pick fights with real intel.',
		},
		{
			title: 'Wallhack & distance ESP',
			copy: 'See enemies behind doors and vertical lanes without hard-scoping every angle — distance readouts keep engagement range under control.',
		},
		{
			title: 'Radar & flank detection',
			copy: 'Compact 2D radar overlay highlights threats outside your FOV during defense waves, exfil timers, and multi-floor missions.',
		},
		{
			title: 'Soft aim & hitbox aimbot',
			copy: 'Tune smoothness, FOV, weak-spot priority, and per-weapon profiles for rifles, SMGs, and snipers before you commit to a license.',
		},
		{
			title: 'Why players pick Enlisted Cheats',
			copy: 'One license covers ESP, wallhack-style boxes, soft aim, and radar — no stacking three subscriptions or paying for modules you never open.',
		},
		{
			title: 'Anti-cheat maintenance',
			copy: 'After Darkflow Software anti-cheat patches we rebuild and post status on Updates before you queue — less guesswork on patch day.',
		},
		{
			title: 'PC + controller ready',
			copy: 'Profiles and hotkeys for mouse/keyboard plus controller support so the same build works in large-scale battles zones and frontline campaigns.',
		},
		{
			title: 'Clear buy advantages',
			copy: 'Instant digital delivery, public pricing ($35/mo or $150 lifetime), and support with your order ID — built for players who want online fast.',
		},
	],
	updatesLabel: 'Enlisted Cheats updates',
	updatesShort: 'Patches',
};

export const galleryUi: Record<LocaleCode, GalleryUi> = {
	en: enGallery,
	es: enGallery,
	fr: enGallery,
	de: enGallery,
	pt: enGallery,
	it: enGallery,
	nl: enGallery,
	pl: enGallery,
	ru: enGallery,
	tr: enGallery,
	ar: enGallery,
	ja: enGallery,
	ko: enGallery,
	zh: enGallery,
	hi: enGallery,
	id: enGallery,
	th: enGallery,
	vi: enGallery,
	uk: enGallery,
	cs: enGallery,
	ro: enGallery,
	sv: enGallery,
};

export function getGalleryUi(locale: LocaleCode): GalleryUi {
	return galleryUi[locale];
}
