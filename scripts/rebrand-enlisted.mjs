#!/usr/bin/env node
/**
 * Bulk rebrand Warframe Cheats → Enlisted Cheats (enlistedcheats.org)
 */
import { readFileSync, writeFileSync, readdirSync, renameSync, existsSync, unlinkSync, cpSync } from 'node:fs';
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
	['warframe-esp-realistic-review', 'enlisted-esp-battle-review'],
	['warframe-cloud-dma-review', 'enlisted-cloud-dma-review'],
	['warframe-controller-aimbot-review', 'enlisted-controller-aimbot-review'],
	['warframe-cheat-setup-review', 'enlisted-cheat-setup-review'],
	['warframe-ability-esp-review', 'enlisted-soldier-esp-review'],
	['warframe-aimbot-realistic-review', 'enlisted-aimbot-battle-review'],
	['warframe-radar-hack-review', 'enlisted-radar-hack-review'],
	['warframe-anti-cheat-update-review', 'enlisted-anti-cheat-update-review'],
	['warframe-sniper-aimbot-review', 'enlisted-sniper-aimbot-review'],
	// Checkout & external
	['/products/warframe-cheats', '/products/enlisted-cheats'],
	['/products/warframe', '/products/enlisted'],
	['https://www.warframe.com/game-guide', 'https://enlisted.net/en/game-guide/'],
	['https://forums.warframe.com/forum/3-pc-update-notes/', 'https://enlisted.net/en/news/'],
	['https://warframe.fandom.com/wiki/WARFRAME_Wiki', 'https://enlisted.fandom.com/wiki/Enlisted_Wiki'],
	['https://www.warframe.com/', 'https://enlisted.net/en/'],
	['https://www.digitalextremes.com/', 'https://darkflowsoftware.com/'],
	['warframe.com', 'enlisted.net'],
	// Game lore → Enlisted
	['Steel Path & Sortie presets', 'Campaign & skirmish presets'],
	['Steel Path & Sorties', 'campaigns and skirmishes'],
	['Steel Path and open world missions', 'campaign and large-scale battles'],
	['Steel Path and open world', 'campaign and large-scale battles'],
	['Steel Path and Sortie', 'campaign and skirmish'],
	['Steel Path, Sorties, and open world missions', 'campaigns, skirmishes, and large-scale battles'],
	['Steel Path, Sorties, and open world', 'campaigns, skirmishes, and large-scale battles'],
	['Steel Path missions', 'frontline campaigns'],
	['Steel Path mission', 'frontline campaign'],
	['Steel Path enemy density', 'campaign enemy density'],
	['Steel Path and Sortie modifier stacks', 'campaign and skirmish modifiers'],
	['Steel Path and Sortie', 'campaign and skirmish'],
	['Steel Path and survival runs', 'campaign and survival runs'],
	['Steel Path and defense waves', 'campaign and defense waves'],
	['Steel Path and open world bounties', 'campaign and large-scale battles'],
	['Steel Path and Sorties', 'campaigns and skirmishes'],
	['Steel Path', 'frontline campaigns'],
	['Sortie modifier stacks', 'skirmish modifier stacks'],
	['Sortie combat', 'skirmish combat'],
	['Sortie modifier', 'skirmish modifier'],
	['Sorties and open world', 'skirmishes and large-scale battles'],
	['Sorties and Steel Path', 'skirmishes and campaigns'],
	['Sorties, and open world', 'skirmishes, and large-scale battles'],
	['Sorties and', 'skirmishes and'],
	['Sorties', 'skirmishes'],
	['Sortie', 'skirmish'],
	['open world missions', 'large-scale battles'],
	['open world bounties', 'large-scale battle objectives'],
	['open world farming', 'large-scale battle farming'],
	['open world', 'large-scale battles'],
	['Plains of Eidolon, Orb Vallis, and Deimos', 'Moscow, Normandy, and Tunisia maps'],
	['Plains and Deimos', 'Moscow and Tunisia'],
	['Plains of Eidolon', 'Moscow'],
	['Orb Vallis', 'Normandy'],
	['Deimos', 'Tunisia'],
	['Grineer, Corpus & Infested ESP', 'Axis & Allied soldier ESP'],
	['Grineer, Corpus, and Infested', 'Axis and Allied soldiers'],
	['Grineer, Corpus, Infested, and Sentient', 'Axis, Allied, and elite units'],
	['Grineer, Corpus, and Infested units', 'Axis and Allied soldiers'],
	['Grineer lancers, Corpus MOAs, Infested runners', 'Axis riflemen, Allied squads, elite units'],
	['Grineer heavy unit', 'Axis heavy unit'],
	['Grineer heavies', 'Axis heavies'],
	['Grineer and Corpus enemies', 'Axis and Allied soldiers'],
	['Grineer and Corpus', 'Axis and Allied'],
	['Grineer', 'Axis'],
	['Corpus MOAs', 'Allied squads'],
	['Corpus heavy unit', 'Allied heavy unit'],
	['Corpus', 'Allied'],
	['Infested runners', 'elite units'],
	['Infested', 'enemy squads'],
	['Sentient fragments', 'heavy vehicles'],
	['Sentient units', 'heavy vehicles'],
	['Sentients', 'heavy vehicles'],
	['Sentient', 'heavy vehicle'],
	['liches, sisters of parvos, archons', 'officers, tanks, and artillery'],
	['liches, sisters, and archons', 'officers, tanks, and artillery'],
	['Boss, lich & Sentient ESP', 'Officer, tank & vehicle ESP'],
	['boss phases', 'objective phases'],
	['boss fights', 'objective fights'],
	['demolysts', 'bunkers'],
	['heavy units', 'heavy units'],
	['Frame ESP', 'Soldier ESP'],
	['frame ESP', 'soldier ESP'],
	['Warframes and Sentients', 'soldiers and vehicles'],
	['enemy Warframes and Sentients', 'enemy soldiers and vehicles'],
	['enemy Warframe', 'enemy soldier'],
	['Warframe can actually hit', 'soldier can actually hit'],
	['squad Warframes', 'squad soldiers'],
	['your Warframe', 'your soldier'],
	['Warframe mixes', 'Enlisted mixes'],
	['Warframe punishes', 'Enlisted punishes'],
	['Warframe missions', 'Enlisted battles'],
	['Warframe mission', 'Enlisted battle'],
	['Warframe patch', 'Enlisted patch'],
	['Warframe patches', 'Enlisted patches'],
	['Warframe game guides', 'Enlisted game guides'],
	['Warframe Wiki', 'Enlisted Wiki'],
	['Warframe Intel', 'Enlisted Intel'],
	['warframe intel', 'enlisted intel'],
	['Warframe update log', 'Enlisted update log'],
	['Digital Extremes Warframe status', 'Darkflow Software Enlisted status'],
	['Digital Extremes Warframe', 'Darkflow Software Enlisted'],
	['Digital Extremes and Warframe patches', 'Darkflow Software and Enlisted patches'],
	['Digital Extremes and Warframe', 'Darkflow Software and Enlisted'],
	['Digital Extremes', 'Darkflow Software'],
	['Eidolon hunts', 'sniper duels'],
	['duo arbitrations', 'duo skirmishes'],
	['arbitration runs', 'skirmish runs'],
	['defense waves', 'defense waves'],
	['defense point', 'capture point'],
	['defense or survival objective', 'capture or survival objective'],
	['defense, survival, and interception', 'defense, survival, and assault'],
	['defense, survival, and squad pushes', 'defense, survival, and squad pushes'],
	['defense missions', 'defense battles'],
	['survival runs', 'survival runs'],
	['survival missions', 'survival battles'],
	['relic missions', 'campaign missions'],
	['farm runs', 'farm runs'],
	['Star Chart', 'battle roster'],
	['parkour combat', 'infantry combat'],
	['ability barriers', 'smoke and cover'],
	['ability effects', 'smoke and cover'],
	['ability cooldown tracking', 'reload and stamina tracking'],
	['Ability cooldown tracking', 'Reload and stamina tracking'],
	['ability cooldown and health markers', 'reload and health markers'],
	['Ability cooldown and health markers', 'Reload and health markers'],
	['ability cooldowns', 'reload timers'],
	['ability timers', 'reload timers'],
	['enemy ability timers', 'enemy reload timers'],
	['your own cooldowns', 'your own reload timers'],
	['mods, and lockers', 'ammo crates, and supply points'],
	['mods, resources, and health orbs', 'ammo, supplies, and medkits'],
	['health orbs, energy pickups, and ammo', 'medkits, ammo crates, and supply points'],
	['health orb & pickup ESP', 'Medkit & supply ESP'],
	['Health orb & pickup ESP', 'Medkit & supply ESP'],
	['health pickup markers', 'medkit markers'],
	['health pickups', 'medkits'],
	['health orbs', 'medkits'],
	['Resource & locker markers', 'Ammo & supply markers'],
	['resource tracking', 'supply tracking'],
	['Resource ESP', 'Supply ESP'],
	['Resource esp', 'Supply esp'],
	['Resource', 'Supply'],
	['resource', 'supply'],
	['primaries, secondaries, and melee', 'rifles, SMGs, and melee'],
	['rifles, shotguns, and snipers', 'rifles, SMGs, and snipers'],
	['rifle, shotgun, and sniper profiles', 'rifle, SMG, and sniper profiles'],
	['rifle and shotgun profiles', 'rifle and SMG profiles'],
	['rifle and shotgun', 'rifle and SMG'],
	['shotgun profiles', 'SMG profiles'],
	['shotguns', 'SMGs'],
	['shotgun', 'SMG'],
	['sniper lanes', 'sniper lanes'],
	['sniper profile', 'sniper profile'],
	['Sniper profile', 'Sniper profile'],
	['public missions', 'public matches'],
	['public squads', 'public squads'],
	['public match', 'public match'],
	['public matches', 'public matches'],
	['squad fights', 'squad fights'],
	['squad play', 'squad play'],
	['squad pushes', 'squad pushes'],
	['squad soldiers', 'squad soldiers'],
	['squad colour coding', 'squad colour coding'],
	['Squad colour coding', 'Squad colour coding'],
	['tilesets', 'maps'],
	['tileset', 'map'],
	['alt-tabbing', 'alt-tabbing'],
	['anti-cheat bypass', 'anti-cheat bypass'],
	['anti-cheat updates', 'anti-cheat updates'],
	['anti-cheat patches', 'anti-cheat patches'],
	['after anti-cheat patches', 'after anti-cheat patches'],
	['anti-cheat', 'anti-cheat'],
	['Anti-cheat', 'Anti-cheat'],
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
	['Warframe esp', 'Enlisted esp'],
	['Warframe wallhack', 'Enlisted wallhack'],
	['undetected warframe cheats', 'undetected enlisted cheats'],
	['warframe cheats 2026', 'enlisted cheats 2026'],
	['Warframe', 'Enlisted'],
	// Project identifiers
	['project-name=warframecheats', 'project-name=enlistedcheats'],
	['name = "warframecheats"', 'name = "enlistedcheats"'],
	['name = "warframe-cheats-net"', 'name = "enlisted-cheats-org"'],
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
	['WarframeAuthorityLinks', 'EnlistedAuthorityLinks'],
	["from './warframe'", "from './enlisted'"],
	["from '../data/warframe'", "from '../data/enlisted'"],
	['fix-warframe-accuracy', 'fix-enlisted-accuracy'],
	['rebrand-warframe', 'rebrand-enlisted'],
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

function renameComponentFile() {
	const src = join(root, 'src', 'components', 'WarframeAuthorityLinks.astro');
	const dest = join(root, 'src', 'components', 'EnlistedAuthorityLinks.astro');
	if (existsSync(src)) {
		let content = readFileSync(src, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
		unlinkSync(src);
		console.log('Renamed WarframeAuthorityLinks.astro → EnlistedAuthorityLinks.astro');
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

function renameMediaFiles() {
	const imageDir = join(root, 'public', 'images');
	if (!existsSync(imageDir)) return;
	for (const entry of readdirSync(imageDir)) {
		if (!entry.includes('warframe')) continue;
		const from = join(imageDir, entry);
		const to = join(imageDir, entry.replace(/warframe/g, 'enlisted'));
		if (!existsSync(to)) {
			cpSync(from, to);
			console.log(`Copied image: ${entry} → ${entry.replace(/warframe/g, 'enlisted')}`);
		}
	}
	const videoDir = join(root, 'public', 'videos');
	if (!existsSync(videoDir)) return;
	for (const entry of readdirSync(videoDir)) {
		if (!entry.includes('warframe')) continue;
		const from = join(videoDir, entry);
		const to = join(videoDir, entry.replace(/warframe/g, 'enlisted'));
		if (!existsSync(to)) {
			cpSync(from, to);
			console.log(`Copied video: ${entry} → ${entry.replace(/warframe/g, 'enlisted')}`);
		}
	}
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
renameComponentFile();
renameBgVideoScript();
renameMediaFiles();
transformFiles();
patchMiddlewareRedirects();
patchPublicRedirects();
console.log('\nRebrand complete. Next: npm install && npm run build:validate');
