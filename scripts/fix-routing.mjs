#!/usr/bin/env node
/** Rebuild routing.ts and constants.mjs from clean Warzone source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_IDS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['warzone-esp', 'enlisted-esp'],
	['warzone-aimbot', 'enlisted-aimbot'],
	['ricochet', 'eac-bypass'],
	['undetected-warzone-cheats', 'undetected-enlisted-cheats'],
	['warzone-wallhack', 'enlisted-wallhack'],
	['warzone-radar-hack', 'enlisted-radar-hack'],
	['warzone-cheats-2026', 'enlisted-cheats-2026'],
	['ricochet-bypass', 'eac-bypass-enlisted'],
	['warzonescheats.net', 'enlistedcheats.org'],
	['trucos-warzone', 'trucos-enlisted'],
	['triche-warzone', 'triche-enlisted'],
	['warzone-cheats', 'enlisted-cheats'],
	['cheats-warzone', 'cheats-enlisted'],
	['trucchi-warzone', 'trucchi-enlisted'],
	['cheaty-warzone', 'cheaty-enlisted'],
	['chity-warzone', 'chity-enlisted'],
	['chitov-warzone', 'chitov-enlisted'],
	['chitiv-warzone', 'chitiv-overwatch'],
	['cheatow-warzone', 'cheatow-enlisted'],
	['hile-warzone', 'hile-enlisted'],
	['warzone-hile', 'enlisted-hile'],
	['warzone-esp-chity', 'enlisted-esp-chity'],
	['warzone-aimbot-chity', 'enlisted-aimbot-chity'],
	['unentdeckte-warzone-cheats', 'unentdeckte-enlisted-cheats'],
	['cheats-warzone-indetectaveis', 'cheats-enlisted-indetectaveis'],
	['trucchi-warzone-indetectabili', 'trucchi-enlisted-indetectabili'],
	['niewykrywalne-cheats-warzone', 'niewykrywalne-cheats-enlisted'],
	['nedecektiruemye-chity-warzone', 'nedecektiruemye-chity-enlisted'],
	['tespit-edilemeyen-warzone-hileleri', 'tespit-edilemeyen-enlisted-hileleri'],
	['nedecektovani-chity-warzone', 'nedecektovani-chity-enlisted'],
	['cheats-warzone-nedetectabile', 'cheats-enlisted-nedetectabile'],
	['basta-warzone-cheats', 'basta-enlisted-cheats'],
	['eac-bypass-enlisted-trucos-warzone', 'eac-bypass-enlisted-trucos-enlisted'],
	['eac-bypass-enlisted-triche-warzone', 'eac-bypass-enlisted-triche-enlisted'],
	['eac-bypass-enlisted-cheats-warzone', 'eac-bypass-enlisted-cheats-enlisted'],
	['eac-bypass-enlisted-chity-warzone', 'eac-bypass-enlisted-chity-enlisted'],
	['eac-bypass-enlisted-warzone', 'eac-bypass-enlisted'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageBlocks(content, pageId) {
	const keyPatterns = [
		new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': \\{[\\s\\S]*?\\},\\n`, 'g'),
	];
	let r = content;
	for (const p of keyPatterns) r = r.replace(p, '');
	// Remove from PageId union
	r = r.replace(new RegExp(`\\s*\\|\\s*'${pageId}'`, 'g'), '');
	// Remove from englishPaths single line
	r = r.replace(new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: '[^']*',\\n`, 'g'), '');
	r = r.replace(new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': '[^']*',\\n`, 'g'), '');
	return r;
}

async function fixRouting() {
	let content = await readFile(path.join(SRC, 'src/data/i18n/routing.ts'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) content = removePageBlocks(content, id);
	// Fix eac key in englishPaths
	content = content.replace(/\teac: '/, "\t'eac-bypass': '");
	await writeFile(path.join(ROOT, 'src/data/i18n/routing.ts'), content);
	console.log('Fixed routing.ts');
}

async function fixConstants() {
	const heroImages = `/** Hero image per page topic — keyword-rich enlisted-cheats paths. */
export const HERO_IMAGES = {
	home: '/images/enlisted-cheats-hero.webp',
	'enlisted-esp': '/images/enlisted-cheats-esp-wallhack.webp',
	'enlisted-aimbot': '/images/enlisted-cheats-aimbot-combat.webp',
	features: '/images/enlisted-cheats-package.webp',
	pricing: '/images/enlisted-cheats-cover.webp',
	setup: '/images/enlisted-loadout-builder.webp',
	updates: '/images/enlisted-header-art.webp',
	faq: '/images/enlisted-squad-fight.webp',
	support: '/images/enlisted-cheats-package.webp',
	undetected: '/images/enlisted-battle-royale-combat.webp',
	wallhack: '/images/enlisted-cheats-esp-wallhack.webp',
	radar: '/images/enlisted-player-esp.webp',
	'eac-bypass': '/images/enlisted-reboot-van-fight.webp',
	'cheats-2026': '/images/enlisted-cheats-hero.webp',
	privacy: '/images/enlisted-cheats-aimbot-combat.webp',
	refund: '/images/enlisted-cheats-cover.webp',
	terms: '/images/enlisted-cheats-package.webp',
};`;

	let content = await readFile(path.join(SRC, 'scripts/i18n-data/constants.mjs'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) {
		content = content.replace(new RegExp(`'${id}',\\s*`, 'g'), '');
	}
	content = content.replace(
		/export const PAGE_IDS = \[[\s\S]*?\];/,
		`export const PAGE_IDS = [\n\t'home', 'enlisted-esp', 'enlisted-aimbot', 'features', 'pricing', 'setup',\n\t'updates', 'faq', 'support', 'undetected', 'wallhack', 'radar', 'eac-bypass',\n\t'cheats-2026', 'privacy', 'refund', 'terms',\n];`,
	);
	content = content.replace(/\/\*\* Hero image[\s\S]*?};/, heroImages);
	content = content.replace(
		/export type PageId = [^;]+;/,
		"export type PageId = 'home' | 'enlisted-esp' | 'enlisted-aimbot' | 'features' | 'pricing' | 'setup' | 'updates' | 'faq' | 'support' | 'undetected' | 'wallhack' | 'radar' | 'eac-bypass' | 'cheats-2026' | 'privacy' | 'refund' | 'terms';",
	);
	content = content.replace(/operatorEsp/g, 'playerEsp');
	content = content.replace(/gulagFight/g, 'rebootFight');
	content = content.replace(/alMazrah/g, 'battleRoyaleIsland');
	await writeFile(path.join(ROOT, 'scripts/i18n-data/constants.mjs'), content);
	console.log('Fixed constants.mjs');
}

await fixRouting();
await fixConstants();
