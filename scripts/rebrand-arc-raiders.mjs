#!/usr/bin/env node
/**
 * Bulk rebrand IsleCheat/Rust/The Isle → ArcRaiders Hacks / Arc Raiders
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const replacements = [
	['IsleCheat', 'ArcRaiders Hacks'],
	['islecheat.net', 'arcraidershacks.com'],
	['support@islecheat.net', 'support@arcraidershacks.com'],
	['The Isle', 'Arc Raiders'],
	['the isle', 'arc raiders'],
	['Isle ESP', 'Arc Raiders ESP'],
	['Isle Aimbot', 'Arc Raiders Aimbot'],
	['Isle wallhack', 'Arc Raiders wallhack'],
	['Isle cheats', 'Arc Raiders hacks'],
	['isle cheats', 'arc raiders hacks'],
	['isle esp', 'arc raiders esp'],
	['isle aimbot', 'arc raiders aimbot'],
	['isle wallhack', 'arc raiders wallhack'],
	['undetected IsleCheat', 'undetected Arc Raiders hacks'],
	['Rust Cheats', 'Arc Raiders Hacks'],
	['Rust cheats', 'Arc Raiders hacks'],
	['Rust ESP', 'Arc Raiders ESP'],
	['Rust Aimbot', 'Arc Raiders Aimbot'],
	['Rust aimbot', 'Arc Raiders aimbot'],
	['Rust esp', 'Arc Raiders esp'],
	['Rust wallhack', 'Arc Raiders wallhack'],
	['Rust hacks', 'Arc Raiders hacks'],
	['Rust Hacks', 'Arc Raiders Hacks'],
	['Rust hack', 'Arc Raiders hack'],
	['Rust soft aim', 'Arc Raiders soft aim'],
	['Rust radar', 'Arc Raiders radar'],
	['Rust loot', 'Arc Raiders loot'],
	['Rust maps', 'Arc Raiders maps'],
	['Rust punishes', 'Arc Raiders punishes'],
	['Rust mixes', 'Arc Raiders mixes'],
	['Rust’s', 'Arc Raiders’'],
	["Rust's", "Arc Raiders'"],
	['for Rust', 'for Arc Raiders'],
	['in Rust', 'in Arc Raiders'],
	['on Rust', 'on Arc Raiders'],
	['Rust ', 'Arc Raiders '],
	['Rust,', 'Arc Raiders,'],
	['Rust.', 'Arc Raiders.'],
	['Rust:', 'Arc Raiders:'],
	['Rust—', 'Arc Raiders—'],
	['Rust -', 'Arc Raiders -'],
	['Rust)', 'Arc Raiders)'],
	['(Rust', '(Arc Raiders'],
	['wipe pressure', 'extraction pressure'],
	['monuments', 'extraction zones'],
	['oil-rig', 'ARC patrol'],
	['compound fights', 'squad extractions'],
	['Facepunch Rust', 'Arc Raiders'],
	['rust.facepunch.com', 'arcraiders.com'],
	['Chapter 7', 'Season 1'],
	['zero build', 'extraction'],
	['hammer ar', 'SMG'],
	['FNCS', 'ranked'],
	['Fortnite', 'Arc Raiders'],
	['Buy on Zadeyo', 'Buy ArcRaiders Hacks'],
	['Buy IsleCheat', 'Buy ArcRaiders Hacks'],
];

function rebrandFile(path) {
	let text = readFileSync(path, 'utf8');
	let changed = false;
	for (const [from, to] of replacements) {
		if (text.includes(from)) {
			text = text.split(from).join(to);
			changed = true;
		}
	}
	if (changed) {
		writeFileSync(path, text);
		console.log('Updated', path.replace(root + '/', ''));
	}
}

const targets = [
	'scripts/i18n-data/pages-en.mjs',
	'scripts/i18n-data/ui-strings.mjs',
	'scripts/i18n-data/ui-strings-part1.mjs',
	'scripts/i18n-data/ui-strings-part2.mjs',
	'scripts/i18n-data/phrases.mjs',
	'scripts/i18n-data/constants.mjs',
	'src/data/i18n/gallery-ui.ts',
	'src/components/HomeSeo.astro',
	'src/components/Hero.astro',
	'src/components/Gallery.astro',
	'src/components/TrustBar.astro',
	'src/layouts/PageLayout.astro',
	'src/pages/404.astro',
	'README.md',
];

for (const rel of targets) {
	const path = join(root, rel);
	try {
		rebrandFile(path);
	} catch {
		console.warn('Skip', rel);
	}
}

console.log('Rebrand complete.');
