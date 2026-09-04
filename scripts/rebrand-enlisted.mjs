#!/usr/bin/env node
/**
 * Bulk rebrand Warframe Cheats → Enlisted Cheats (enlistedcheats.org)
 */
import { readFileSync, writeFileSync, readdirSync, renameSync, existsSync, unlinkSync, rmSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'rebrand-enlisted.mjs',
	'rebrand-warframe.mjs',
	'rebrand-war-thunder.mjs',
	'rebrand-overwatch.mjs',
	'rebrand-arc-raiders.mjs',
	'adapt-rust.mjs',
]);

/** Longest / most specific replacements first. */
const REPLACEMENTS = [
	// Domain & email
	['https://www.warframecheats.net', 'https://enlistedcheats.org'],
	['https://warframecheats.net', 'https://enlistedcheats.org'],
	['http://www.warframecheats.net', 'https://enlistedcheats.org'],
	['http://warframecheats.net', 'https://enlistedcheats.org'],
	['www.warframecheats.net', 'www.enlistedcheats.org'],
	['warframecheats.net', 'enlistedcheats.org'],
	['support@warframecheats.net', 'support@enlistedcheats.org'],
	// Canonical URL paths
	['/warframe-wallhack/', '/enlisted-wallhack/'],
	['/warframe-aimbot/', '/enlisted-aimbot/'],
	['/warframe-radar/', '/enlisted-radar/'],
	['/warframe-esp/', '/enlisted-esp/'],
	['/warframe-cheats/', '/enlisted-cheats/'],
	['/warframe-wallhack', '/enlisted-wallhack'],
	['/warframe-aimbot', '/enlisted-aimbot'],
	['/warframe-radar', '/enlisted-radar'],
	['/warframe-esp', '/enlisted-esp'],
	['/warframe-cheats', '/enlisted-cheats'],
	// Assets & scripts
	['data-warframe-cheats-video', 'data-enlisted-cheats-video'],
	['warframe-cheats-bg-video.js', 'enlisted-cheats-bg-video.js'],
	['warframe-cheats-video-poster.webp', 'enlisted-cheats-video-poster.webp'],
	['warframe-cheats-preview.mp4', 'enlisted-cheats-preview.mp4'],
	['warframe-cheats-hero.webp', 'enlisted-cheats-hero.webp'],
	['warframe-cheats-main-menu.webp', 'enlisted-cheats-main-menu.webp'],
	['warframe-esp-wallhack-overlay.webp', 'enlisted-esp-wallhack-overlay.webp'],
	['warframe-esp-enemy-boxes.webp', 'enlisted-esp-enemy-boxes.webp'],
	['warframe-aimbot-targeting-menu.webp', 'enlisted-aimbot-targeting-menu.webp'],
	['warframe-radar-hack-minimap.webp', 'enlisted-radar-hack-minimap.webp'],
	['warframe-cheats-combat-esp.webp', 'enlisted-cheats-combat-esp.webp'],
	['warframe-steel-path-mission-esp.webp', 'enlisted-campaign-mission-esp.webp'],
	['warframe-sortie-aimbot-combat.webp', 'enlisted-squad-aimbot-combat.webp'],
	['warframe-open-world-radar.webp', 'enlisted-battlefield-radar.webp'],
	['warframe-loot-pickup-esp.webp', 'enlisted-supply-esp.webp'],
	['warframe-cheats-settings-panel.webp', 'enlisted-cheats-settings-panel.webp'],
	['warframe-mission.webp', 'enlisted-mission.webp'],
	['warframe-esp-overlay.webp', 'enlisted-esp-overlay.webp'],
	['warframe-esp-modules.webp', 'enlisted-esp-modules.webp'],
	['warframe-esp-enemies.webp', 'enlisted-esp-enemies.webp'],
	['warframe-aimbot-menu.webp', 'enlisted-aimbot-menu.webp'],
	['warframe-radar-hack.webp', 'enlisted-radar-hack.webp'],
	['/images/warframe', '/images/enlisted'],
	['/videos/warframe', '/videos/enlisted'],
	// Page IDs & slugs
	['warframe-unlock-all', 'enlisted-unlock-all'],
	['warframe-wallhack', 'enlisted-wallhack'],
	['warframe-aimbot-hack', 'enlisted-aimbot-hack'],
	['warframe-esp-hack', 'enlisted-esp-hack'],
	['warframe-cheat-download', 'enlisted-cheat-download'],
	['warframe-cheats-2026', 'enlisted-cheats-2026'],
	['warframe-mod-menu', 'enlisted-mod-menu'],
	['warframe-soft-aim', 'enlisted-soft-aim'],
	['best-warframe-cheats', 'best-enlisted-cheats'],
	['undetected-warframe-cheats', 'undetected-enlisted-cheats'],
	['eac-bypass-warframe', 'eac-bypass-enlisted'],
	['warframe-aimbot', 'enlisted-aimbot'],
	['warframe-radar-hack', 'enlisted-radar-hack'],
	['warframe-radar', 'enlisted-radar'],
	['warframe-esp', 'enlisted-esp'],
	['warframe-cheats', 'enlisted-cheats'],
	// Localized slug patterns
	['eac-bypass-warframe-trucos-warframe', 'eac-bypass-enlisted-trucos-enlisted'],
	['eac-bypass-warframe-triche-warframe', 'eac-bypass-enlisted-triche-enlisted'],
	['eac-bypass-warframe-cheats-warframe', 'eac-bypass-enlisted-cheats-enlisted'],
	['eac-bypass-warframe-chity-warframe', 'eac-bypass-enlisted-chity-enlisted'],
	['undetected-warframe-cheats', 'undetected-enlisted-cheats'],
	['nedecektiruemye-chity-warframe', 'nedecektiruemye-chity-enlisted'],
	['nedecektovani-chity-warframe', 'nedecektovani-chity-enlisted'],
	['tespit-edilemeyen-warframe-hileleri', 'tespit-edilemeyen-enlisted-hileleri'],
	['niewykrywalne-cheats-warframe', 'niewykrywalne-cheats-enlisted'],
	['unentdeckte-warframe-cheats', 'unentdeckte-enlisted-cheats'],
	['cheats-warframe-indetectaveis', 'cheats-enlisted-indetectaveis'],
	['trucchi-warframe-indetectabili', 'trucchi-enlisted-indetectabili'],
	['cheats-warframe-nedetectabile', 'cheats-enlisted-nedetectabile'],
	['trucos-warframe', 'trucos-enlisted'],
	['triche-warframe', 'triche-enlisted'],
	['cheats-warframe', 'cheats-enlisted'],
	['trucchi-warframe', 'trucchi-enlisted'],
	['cheaty-warframe', 'cheaty-enlisted'],
	['chity-warframe', 'chity-enlisted'],
	['chitov-warframe', 'chitov-enlisted'],
	['cheatow-warframe', 'cheatow-enlisted'],
	['hile-warframe', 'hile-enlisted'],
	['warframe-hile', 'enlisted-hile'],
	['hacks-trucos-warframe', 'hacks-trucos-enlisted'],
	['hacks-triche-warframe', 'hacks-triche-enlisted'],
	['hacks-cheats-warframe', 'hacks-cheats-enlisted'],
	['hacks-trucchi-warframe', 'hacks-trucchi-enlisted'],
	['hacks-cheatow-warframe', 'hacks-cheatow-enlisted'],
	['haksy-chity-warframe', 'haksy-chity-enlisted'],
	['warframe-hile-hacks', 'enlisted-hile-hacks'],
	// Review slugs
	['warframe-soft-aim-review', 'enlisted-soft-aim-review'],
	['warframe-esp-mission-review', 'enlisted-esp-mission-review'],
	['warframe-esp-realistic-review', 'enlisted-esp-realistic-review'],
	['warframe-cloud-dma-review', 'enlisted-cloud-dma-review'],
	['warframe-controller-aimbot-review', 'enlisted-controller-aimbot-review'],
	['warframe-cheat-setup-review', 'enlisted-cheat-setup-review'],
	['warframe-ability-esp-review', 'enlisted-ability-esp-review'],
	['warframe-aimbot-mission-review', 'enlisted-aimbot-mission-review'],
	['warframe-aimbot-realistic-review', 'enlisted-aimbot-realistic-review'],
	['warframe-radar-hack-review', 'enlisted-radar-hack-review'],
	['warframe-anti-cheat-update-review', 'enlisted-anti-cheat-update-review'],
	['warframe-sniper-aimbot-review', 'enlisted-sniper-aimbot-review'],
	['warframe-monthly-sub-review', 'enlisted-monthly-sub-review'],
	['warframe-lifetime-key-review', 'enlisted-lifetime-key-review'],
	['warframe-squad-play-review', 'enlisted-squad-play-review'],
	// Blog slugs
	['warframe-open-world-farming-guide', 'enlisted-battlefield-farming-guide'],
	['warframe-patch-notes-guide', 'enlisted-patch-notes-guide'],
	['undetected-warframe-cheats-eac', 'undetected-enlisted-cheats-eac'],
	['voidcheats-vs-warframe-cheats-two-week-test', 'voidcheats-vs-enlisted-cheats-two-week-test'],
	['elitefn-vs-warframe-cheats-two-week-test', 'elitefn-vs-enlisted-cheats-two-week-test'],
	// Checkout & external
	['/products/warframe-cheats', '/products/enlisted'],
	['/products/warframe', '/products/enlisted'],
	['https://www.warframe.com/game-guide', 'https://enlisted.net/en/game/about/'],
	['https://www.warframe.com/', 'https://enlisted.net/'],
	['https://warframe.com/', 'https://enlisted.net/'],
	['https://forums.warframe.com/forum/3-pc-update-notes/', 'https://enlisted.net/en/news/'],
	['https://warframe.fandom.com/wiki/WARFRAME_Wiki', 'https://enlisted.fandom.com/wiki/Enlisted_Wiki'],
	['warframe.fandom.com', 'enlisted.fandom.com'],
	['warframe.com', 'enlisted.net'],
	// Game lore → Enlisted
	['Plains of Eidolon, Orb Vallis, and Deimos', 'Eastern Front, Western Front, and urban combat maps'],
	['Plains of Eidolon, Orb Vallis, and defense waves', 'Eastern Front, Western Front, and defense sectors'],
	['Plains of Eidolon, Orb Vallis, and Deimos bounty route', 'Eastern Front and Western Front campaign routes'],
	['Plains and Deimos', 'Eastern Front and urban maps'],
	['Plains of Eidolon', 'Eastern Front maps'],
	['Orb Vallis', 'Western Front maps'],
	['Deimos', 'urban combat maps'],
	['Eidolon hunts', 'tank assault missions'],
	['duo arbitrations', 'duo squad assaults'],
	['Steel Path and Sortie presets', 'Campaign and squad assault presets'],
	['Steel Path & Sortie presets', 'Campaign & squad assault presets'],
	['Steel Path and Sortie modifier stacks', 'Campaign and squad assault modifier stacks'],
	['Steel Path enemy density and Sortie modifier stacks', 'Campaign enemy density and squad assault modifiers'],
	['Steel Path, Sorties, and open world missions', 'campaign missions, squad assaults, and large-scale battles'],
	['Steel Path, Sorties, and open world', 'campaign missions, squad assaults, and large-scale battles'],
	['Steel Path, Sorties, and open world tilesets', 'campaign missions, squad assaults, and battlefield maps'],
	['Steel Path and open world missions', 'campaign missions and large-scale battles'],
	['Steel Path and open world', 'campaign missions and large-scale battles'],
	['Steel Path and Sorties', 'campaign missions and squad assaults'],
	['Steel Path missions', 'campaign missions'],
	['Steel Path mission', 'campaign mission'],
	['Steel Path', 'campaign missions'],
	['Sortie modifier stacks', 'squad assault modifier stacks'],
	['Sortie combat', 'squad assault combat'],
	['Sortie', 'squad assault'],
	['Sorties', 'squad assaults'],
	['Grineer, Corpus & Infested ESP', 'Infantry, tank & artillery ESP'],
	['Grineer, Corpus, and Infested', 'infantry, tanks, and artillery'],
	['Grineer, Corpus, Infested, and Sentient', 'infantry, tanks, artillery, and vehicles'],
	['Grineer, Corpus, Infested, and Sentients', 'infantry, tanks, artillery, and vehicles'],
	['Grineer lancers, Corpus MOAs, Infested runners', 'enemy infantry, tank crews, and artillery spotters'],
	['Grineer heavy unit', 'enemy tank'],
	['Grineer and Corpus enemies', 'enemy infantry and tank crews'],
	['Grineer and Corpus', 'enemy infantry and tanks'],
	['Grineer, Corpus, and Infested units', 'infantry, tanks, and artillery units'],
	['liches, sisters of parvos, archons, and Sentient fragments', 'officers, tank commanders, and heavy vehicles'],
	['liches, sisters, and archons', 'officers, tank commanders, and command units'],
	['Boss, lich & Sentient ESP', 'Officer, tank & vehicle ESP'],
	['boss phases', 'command post assaults'],
	['demolysts', 'bunker emplacements'],
	['heavy units', 'tanks and artillery'],
	['heavy unit', 'tank or artillery unit'],
	['Sentient fragments', 'enemy vehicles'],
	['Sentient units', 'enemy vehicles'],
	['Sentients', 'enemy vehicles'],
	['Sentient', 'vehicle'],
	['enemy Warframes and Sentients', 'enemy soldiers and vehicles'],
	['enemy Warframe', 'enemy soldier'],
	['enemy Warframes', 'enemy soldiers'],
	['squad Warframes', 'squad soldiers'],
	['your Warframe', 'your soldier'],
	['your squad Warframes', 'your squad soldiers'],
	['Warframe can actually hit', 'soldier can actually hit'],
	['Frame ESP', 'Soldier ESP'],
	['frame ESP', 'soldier ESP'],
	['ability and heavy attack threat', 'artillery and tank threat'],
	['ability cooldown and health markers', 'reload and squad status markers'],
	['Ability cooldown tracking', 'Reload and squad status tracking'],
	['ability cooldowns', 'reload timers'],
	['Ability ESP', 'Squad ESP'],
	['ability ESP', 'squad ESP'],
	['ability effects', 'smoke and cover effects'],
	['ability barriers', 'smoke and cover'],
	['parkour combat', 'squad combat'],
	['Star Chart', 'campaign map'],
	['relic missions', 'supply missions'],
	['survival runs', 'defense runs'],
	['defense waves', 'defense sectors'],
	['defense, survival, and interception', 'defense, assault, and conquest'],
	['defense, survival, and squad pushes', 'defense, assault, and squad pushes'],
	['defense point', 'capture point'],
	['defense or survival objective', 'defense or assault objective'],
	['defense missions', 'defense sectors'],
	['public missions', 'public matches'],
	['public squads', 'public squads'],
	['Digital Extremes Warframe status', 'Gaijin Enlisted status'],
	['Digital Extremes Warframe', 'Gaijin Enlisted'],
	['Digital Extremes and Warframe patches', 'Gaijin and Enlisted patches'],
	['Digital Extremes', 'Gaijin'],
	['Warframe update log', 'Enlisted update log'],
	['Warframe Intel', 'Enlisted Intel'],
	['warframe intel', 'enlisted intel'],
	['Warframe patch', 'Enlisted patch'],
	['Warframe patches', 'Enlisted patches'],
	['Warframe or anti-cheat patches', 'Enlisted or anti-cheat patches'],
	['Warframe punishes', 'Enlisted punishes'],
	['Warframe mixes', 'Enlisted mixes'],
	['Warframe game guides', 'Enlisted game guides'],
	['Warframe mission types', 'Enlisted mission types'],
	['Warframe Wiki', 'Enlisted Wiki'],
	['official game guide', 'official game guide'],
	['open world missions', 'large-scale battles'],
	['open world mission', 'large-scale battle'],
	['open world bounties', 'battlefield objectives'],
	['open world', 'battlefield'],
	['open world content', 'battlefield content'],
	['open world farming', 'battlefield farming'],
	['mission objectives', 'capture objectives'],
	['mission fights', 'squad fights'],
	['mission fight', 'squad fight'],
	['mission types', 'mission types'],
	['spawn routes', 'flank routes'],
	['spawn pushes', 'flank pushes'],
	['flank vectors', 'flank routes'],
	['extraction route', 'supply route'],
	['health orb & pickup ESP', 'Medkit & supply ESP'],
	['health orbs, energy pickups, and ammo', 'medkits, ammo crates, and supply drops'],
	['health pickups', 'medkits'],
	['health pickup markers', 'medkit markers'],
	['Resource & locker markers', 'Supply crate & ammo markers'],
	['resources, mods, and lockers', 'ammo, supplies, and equipment crates'],
	['resource tracking', 'supply tracking'],
	['resource ESP', 'supply ESP'],
	['primaries, secondaries, and melee', 'rifles, SMGs, and sidearms'],
	['rifles, shotguns, and snipers', 'rifles, SMGs, and sniper rifles'],
	['primaries, secondaries, and melee — tuned for Steel Path, Sorties, and open world missions', 'rifles, SMGs, and sidearms — tuned for campaign missions, squad assaults, and large-scale battles'],
	['anti-cheat bypass', 'anti-cheat bypass'],
	['anti-cheat patches', 'anti-cheat patches'],
	['after anti-cheat patches', 'after anti-cheat patches'],
	['anti-cheat updates', 'anti-cheat updates'],
	['anti-cheat', 'anti-cheat'],
	// Brand strings (longest first)
	['Warframe Cheats', 'Enlisted Cheats'],
	['Warframe ESP', 'Enlisted ESP'],
	['Warframe Aimbot', 'Enlisted Aimbot'],
	['Warframe Wallhack', 'Enlisted Wallhack'],
	['Warframe wallhack', 'Enlisted wallhack'],
	['Warframe Radar', 'Enlisted Radar'],
	['Warframe radar', 'Enlisted radar'],
	['Warframe hacks', 'Enlisted cheats'],
	['Warframe hack', 'Enlisted cheat'],
	['Warframe cheat', 'Enlisted cheat'],
	['Warframe cheats', 'Enlisted cheats'],
	['Warframe aimbot', 'Enlisted aimbot'],
	['Warframe maps', 'Enlisted battlefields'],
	['undetected warframe cheats', 'undetected enlisted cheats'],
	['warframe wallhack', 'enlisted wallhack'],
	['warframe aimbot', 'enlisted aimbot'],
	['warframe esp', 'enlisted esp'],
	['warframe cheats', 'enlisted cheats'],
	['warframe hacks 2026', 'enlisted cheats 2026'],
	['warframe hacks', 'enlisted cheats'],
	['warframe hack', 'enlisted cheat'],
	['Warframe', 'Enlisted'],
	// Project identifiers
	['project-name=warframecheats', 'project-name=enlistedcheats'],
	['name = "warframe-cheats-net"', 'name = "enlisted-cheats-org"'],
	['name = "warframecheats"', 'name = "enlistedcheats"'],
	['"warframe-cheats"', '"enlisted-cheats"'],
	['Buy Warframe Cheats', 'Buy Enlisted Cheats'],
	// Middleware hosts
	["const APEX_HOST = 'warframecheats.net'", "const APEX_HOST = 'enlistedcheats.org'"],
	["const WWW_HOST = 'www.warframecheats.net'", "const WWW_HOST = 'www.enlistedcheats.org'"],
	["const CANONICAL_ORIGIN = 'https://warframecheats.net'", "const CANONICAL_ORIGIN = 'https://enlistedcheats.org'"],
	// seo.ts helper
	["if (lead.toLowerCase().includes('warframe'))", "if (lead.toLowerCase().includes('enlisted'))"],
	['return `Warframe cheats — ${lead}`', 'return `Enlisted cheats — ${lead}`'],
	['optimized for warframecheats.net', 'optimized for enlistedcheats.org'],
	['| warframecheats.net', '| enlistedcheats.org'],
	['| Warframe Cheats', '| Enlisted Cheats'],
	["shortName: 'WF'", "shortName: 'EN'"],
	["game: 'Warframe'", "game: 'Enlisted'"],
	['Warframe Cheats logo', 'Enlisted Cheats logo'],
	['warframeImages', 'enlistedImages'],
	['warframeHeroVideo', 'enlistedHeroVideo'],
	['warframeVideo', 'enlistedVideo'],
	['warframeHeroImage', 'enlistedHeroImage'],
	['warframeScreenshots', 'enlistedScreenshots'],
	['WarframeScreenshot', 'EnlistedScreenshot'],
	["from './warframe'", "from './enlisted'"],
	["from '../data/warframe'", "from '../data/enlisted'"],
	['WarframeAuthorityLinks', 'EnlistedAuthorityLinks'],
	['Hero-matched Warframe palette', 'Hero-matched Enlisted palette'],
	['Warframe atmosphere images', 'Enlisted atmosphere images'],
	['Warframe-themed', 'Enlisted-themed'],
	['warframe-cheats', 'enlisted-cheats'],
	['Private — for warframecheats.net deployment only.', 'Private — for enlistedcheats.org deployment only.'],
	['for warframecheats.net', 'for enlistedcheats.org'],
];

const PAGE_DIR_RENAMES = [
	['warframe-cheats', 'enlisted-cheats'],
	['warframe-esp', 'enlisted-esp'],
	['warframe-aimbot', 'enlisted-aimbot'],
	['warframe-wallhack', 'enlisted-wallhack'],
	['warframe-radar', 'enlisted-radar'],
];

function walk(dir, files = []) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = join(dir, entry.name);
		if (entry.isDirectory()) walk(full, files);
		else files.push(full);
	}
	return files;
}

function apply(content) {
	let result = content;
	for (const [from, to] of REPLACEMENTS) {
		if (result.includes(from)) result = result.split(from).join(to);
	}
	return result;
}

function renamePageDirs() {
	for (const [from, to] of PAGE_DIR_RENAMES) {
		const src = join(root, 'src', 'pages', from);
		const dest = join(root, 'src', 'pages', to);
		if (existsSync(src)) {
			renameSync(src, dest);
			console.log(`Renamed page: ${from} → ${to}`);
		}
	}
}

function renameDataFile() {
	const src = join(root, 'src', 'data', 'warframe.ts');
	const dest = join(root, 'src', 'data', 'enlisted.ts');
	if (existsSync(src)) {
		let content = readFileSync(src, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
		unlinkSync(src);
		console.log('Renamed src/data/warframe.ts → enlisted.ts');
	} else if (existsSync(dest)) {
		let content = readFileSync(dest, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
	}
}

function renameComponent() {
	const src = join(root, 'src', 'components', 'WarframeAuthorityLinks.astro');
	const dest = join(root, 'src', 'components', 'EnlistedAuthorityLinks.astro');
	if (existsSync(src)) {
		let content = readFileSync(src, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
		unlinkSync(src);
		console.log('Renamed WarframeAuthorityLinks.astro → EnlistedAuthorityLinks.astro');
	} else if (existsSync(dest)) {
		let content = readFileSync(dest, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
	}
}

function renameBgVideoScript() {
	const src = join(root, 'public', 'scripts', 'warframe-cheats-bg-video.js');
	const dest = join(root, 'public', 'scripts', 'enlisted-cheats-bg-video.js');
	if (existsSync(src)) {
		let content = readFileSync(src, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
		unlinkSync(src);
		console.log('Renamed warframe-cheats-bg-video.js → enlisted-cheats-bg-video.js');
	} else if (existsSync(dest)) {
		let content = readFileSync(dest, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
	}
}

function renameImageFiles() {
	const imagesDir = join(root, 'public', 'images');
	if (!existsSync(imagesDir)) return;
	let renamed = 0;
	for (const entry of readdirSync(imagesDir)) {
		if (!entry.includes('warframe')) continue;
		const newName = apply(entry);
		if (newName !== entry) {
			renameSync(join(imagesDir, entry), join(imagesDir, newName));
			renamed++;
		}
	}
	const videosDir = join(root, 'public', 'videos');
	if (existsSync(videosDir)) {
		for (const entry of readdirSync(videosDir)) {
			if (!entry.includes('warframe')) continue;
			const newName = apply(entry);
			if (newName !== entry) {
				renameSync(join(videosDir, entry), join(videosDir, newName));
				renamed++;
			}
		}
	}
	console.log(`Renamed ${renamed} image/video files`);
}

function transformFiles() {
	const files = walk(root);
	let changed = 0;
	for (const file of files) {
		if (!TEXT_EXTENSIONS.has(extname(file))) continue;
		if (SKIP_FILES.has(file.split(/[/\\]/).pop())) continue;
		const original = readFileSync(file, 'utf8');
		const updated = apply(original);
		if (updated !== original) {
			writeFileSync(file, updated);
			changed++;
		}
	}
	console.log(`\nTransformed ${changed} files`);
}

function patchMiddlewareRedirects() {
	const file = join(root, 'functions', '_middleware.js');
	if (!existsSync(file)) return;
	let content = readFileSync(file, 'utf8');

	// Add legacy warframe domain
	if (!content.includes("'warframecheats.net'")) {
		content = content.replace(
			"'www.fortnitecheats.com',",
			"'www.fortnitecheats.com',\n\t'warframecheats.net',\n\t'www.warframecheats.net',",
		);
	}

	content = apply(content);

	const extraRedirects = {
		'/warframe-cheats': '/enlisted-cheats/',
		'/warframe-cheats/': '/enlisted-cheats/',
		'/warframe-esp': '/enlisted-esp/',
		'/warframe-esp/': '/enlisted-esp/',
		'/warframe-aimbot': '/enlisted-aimbot/',
		'/warframe-aimbot/': '/enlisted-aimbot/',
		'/warframe-wallhack': '/enlisted-wallhack/',
		'/warframe-wallhack/': '/enlisted-wallhack/',
		'/warframe-radar': '/enlisted-radar/',
		'/warframe-radar/': '/enlisted-radar/',
	};
	for (const [from, to] of Object.entries(extraRedirects)) {
		const key = `'${from}': '${to}'`;
		if (!content.includes(key)) {
			content = content.replace(
				'const PATH_REDIRECTS = {',
				`const PATH_REDIRECTS = {\n\t'${from}': '${to}',`,
			);
		}
	}
	writeFileSync(file, content);
	console.log('Patched functions/_middleware.js redirects');
}

function patchPublicRedirects() {
	const file = join(root, 'public', '_redirects');
	if (!existsSync(file)) return;
	let content = readFileSync(file, 'utf8');
	content = apply(content);
	const lines = [
		'/warframe-cheats /enlisted-cheats/ 301',
		'/warframe-cheats/ /enlisted-cheats/ 301',
		'/warframe-esp /enlisted-esp/ 301',
		'/warframe-esp/ /enlisted-esp/ 301',
		'/warframe-aimbot /enlisted-aimbot/ 301',
		'/warframe-aimbot/ /enlisted-aimbot/ 301',
		'/warframe-wallhack /enlisted-wallhack/ 301',
		'/warframe-wallhack/ /enlisted-wallhack/ 301',
		'/warframe-radar /enlisted-radar/ 301',
		'/warframe-radar/ /enlisted-radar/ 301',
	];
	for (const line of lines) {
		if (!content.includes(line.split(' ')[0])) {
			content += `\n${line}`;
		}
	}
	writeFileSync(file, content);
	console.log('Patched public/_redirects');
}

console.log('Rebranding Warframe Cheats → Enlisted Cheats...\n');
renamePageDirs();
renameDataFile();
renameComponent();
renameBgVideoScript();
renameImageFiles();
transformFiles();
patchMiddlewareRedirects();
patchPublicRedirects();
console.log('\nRebrand complete. Next: npm run generate:i18n && npm run generate:blog && npm run build:validate');
