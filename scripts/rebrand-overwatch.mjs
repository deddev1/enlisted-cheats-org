#!/usr/bin/env node
/**
 * Bulk rebrand Arc Raiders Hacks → Overwatch Hacks (overwatchhacks.com)
 */
import { readFileSync, writeFileSync, readdirSync, renameSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set(['rebrand-overwatch.mjs', 'rebrand-arc-raiders.mjs', 'adapt-rust.mjs']);

/** Longest / most specific replacements first. */
const REPLACEMENTS = [
	// Domain & email
	['https://www.arcraidershacks.net', 'https://overwatchhacks.com'],
	['https://arcraidershacks.net', 'https://overwatchhacks.com'],
	['http://www.arcraidershacks.net', 'https://overwatchhacks.com'],
	['http://arcraidershacks.net', 'https://overwatchhacks.com'],
	['https://www.arcraidershacks.com', 'https://overwatchhacks.com'],
	['https://arcraidershacks.com', 'https://overwatchhacks.com'],
	['www.arcraidershacks.net', 'www.overwatchhacks.com'],
	['arcraidershacks.net', 'overwatchhacks.com'],
	['www.arcraidershacks.com', 'www.overwatchhacks.com'],
	['arcraidershacks.com', 'overwatchhacks.com'],
	['support@arcraidershacks.net', 'support@overwatchhacks.com'],
	['support@arcraidershacks.com', 'support@overwatchhacks.com'],
	// Canonical URL paths
	['/arc-raiders-wallhack/', '/overwatch-wallhack/'],
	['/arc-raiders-aimbot/', '/overwatch-aimbot/'],
	['/arc-raiders-radar/', '/overwatch-radar/'],
	['/arc-raiders-esp/', '/overwatch-esp/'],
	['/arc-raiders-hacks/', '/overwatch-hacks/'],
	['/arc-raiders-wallhack', '/overwatch-wallhack'],
	['/arc-raiders-aimbot', '/overwatch-aimbot'],
	['/arc-raiders-radar', '/overwatch-radar'],
	['/arc-raiders-esp', '/overwatch-esp'],
	['/arc-raiders-hacks', '/overwatch-hacks'],
	// Localized slug patterns (rust → overwatch in URLs)
	['eac-bypass-rust-trucos-rust', 'eac-bypass-overwatch-trucos-overwatch'],
	['eac-bypass-rust-triche-rust', 'eac-bypass-overwatch-triche-overwatch'],
	['eac-bypass-rust-cheats-rust', 'eac-bypass-overwatch-cheats-overwatch'],
	['eac-bypass-rust-chity-rust', 'eac-bypass-overwatch-chity-overwatch'],
	['eac-bypass-rust', 'eac-bypass-overwatch'],
	['undetected-rust-cheats', 'undetected-overwatch-cheats'],
	['nedecektiruemye-chity-rust', 'nedecektiruemye-chity-overwatch'],
	['nedecektovani-chity-rust', 'nedecektovani-chity-overwatch'],
	['tespit-edilemeyen-rust-hileleri', 'tespit-edilemeyen-overwatch-hileleri'],
	['niewykrywalne-cheats-rust', 'niewykrywalne-cheats-overwatch'],
	['unentdeckte-rust-cheats', 'unentdeckte-overwatch-cheats'],
	['cheats-rust-indetectaveis', 'cheats-overwatch-indetectaveis'],
	['trucchi-rust-indetectabili', 'trucchi-overwatch-indetectabili'],
	['cheats-rust-nedetectabile', 'cheats-overwatch-nedetectabile'],
	['caracteristicas-trucos-rust', 'caracteristicas-trucos-overwatch'],
	['fonctionnalites-triche-rust', 'fonctionnalites-triche-overwatch'],
	['rust-cheats-funktionen', 'overwatch-cheats-funktionen'],
	['recursos-cheats-rust', 'recursos-cheats-overwatch'],
	['funzioni-trucchi-rust', 'funzioni-trucchi-overwatch'],
	['rust-cheats-functies', 'overwatch-cheats-functies'],
	['funkcje-cheatow-rust', 'funkcje-cheatow-overwatch'],
	['funkcii-chitov-rust', 'funkcii-chitov-overwatch'],
	['rust-hile-ozellikleri', 'overwatch-hile-ozellikleri'],
	['precios-trucos-rust', 'precios-trucos-overwatch'],
	['prix-triche-rust', 'prix-triche-overwatch'],
	['rust-cheats-preise', 'overwatch-cheats-preise'],
	['precos-cheats-rust', 'precos-cheats-overwatch'],
	['prezzi-trucchi-rust', 'prezzi-trucchi-overwatch'],
	['rust-cheats-prijzen', 'overwatch-cheats-prijzen'],
	['ceny-cheatow-rust', 'ceny-cheatow-overwatch'],
	['ceny-chitov-rust', 'ceny-chitov-overwatch'],
	['rust-hile-fiyatlari', 'overwatch-hile-fiyatlari'],
	['instalacion-trucos-rust', 'instalacion-trucos-overwatch'],
	['installation-triche-rust', 'installation-triche-overwatch'],
	['rust-cheats-installation', 'overwatch-cheats-installation'],
	['instalacao-cheats-rust', 'instalacao-cheats-overwatch'],
	['installazione-trucchi-rust', 'installazione-trucchi-overwatch'],
	['rust-cheats-installatie', 'overwatch-cheats-installatie'],
	['instalacja-cheatow-rust', 'instalacja-cheatow-overwatch'],
	['ustanovka-chitov-rust', 'ustanovka-chitov-overwatch'],
	['rust-hile-kurulum', 'overwatch-hile-kurulum'],
	['actualizaciones-trucos-rust', 'actualizaciones-trucos-overwatch'],
	['mises-a-jour-triche-rust', 'mises-a-jour-triche-overwatch'],
	['rust-cheats-updates', 'overwatch-cheats-updates'],
	['atualizacoes-cheats-rust', 'atualizacoes-cheats-overwatch'],
	['aggiornamenti-trucchi-rust', 'aggiornamenti-trucchi-overwatch'],
	['aktualizacje-cheatow-rust', 'aktualizacje-cheatow-overwatch'],
	['obnovleniya-chitov-rust', 'obnovleniya-chitov-overwatch'],
	['rust-hile-guncellemeleri', 'overwatch-hile-guncellemeleri'],
	['preguntas-trucos-rust', 'preguntas-trucos-overwatch'],
	['faq-triche-rust', 'faq-triche-overwatch'],
	['rust-cheats-faq', 'overwatch-cheats-faq'],
	['faq-cheatow-rust', 'faq-cheatow-overwatch'],
	['faq-chitov-rust', 'faq-chitov-overwatch'],
	['rust-hile-sss', 'overwatch-hile-sss'],
	['soporte-trucos-rust', 'soporte-trucos-overwatch'],
	['support-triche-rust', 'support-triche-overwatch'],
	['rust-cheats-support', 'overwatch-cheats-support'],
	['wsparcie-cheatow-rust', 'wsparcie-cheatow-overwatch'],
	['podderzhka-chitov-rust', 'podderzhka-chitov-overwatch'],
	['rust-hile-destek', 'overwatch-hile-destek'],
	['wallhack-trucos-rust', 'wallhack-trucos-overwatch'],
	['wallhack-triche-rust', 'wallhack-triche-overwatch'],
	['wallhack-cheats-rust', 'wallhack-cheats-overwatch'],
	['wallhack-trucchi-rust', 'wallhack-trucchi-overwatch'],
	['wallhack-cheatow-rust', 'wallhack-cheatow-overwatch'],
	['wallhack-chity-rust', 'wallhack-chity-overwatch'],
	['radar-hack-trucos-rust', 'radar-hack-trucos-overwatch'],
	['radar-hack-triche-rust', 'radar-hack-triche-overwatch'],
	['radar-hack-cheats-rust', 'radar-hack-cheats-overwatch'],
	['radar-hack-trucchi-rust', 'radar-hack-trucchi-overwatch'],
	['radar-hack-cheatow-rust', 'radar-hack-cheatow-overwatch'],
	['radar-hack-chity-rust', 'radar-hack-chity-overwatch'],
	['trucos-rust-2026', 'trucos-overwatch-2026'],
	['triche-rust-2026', 'triche-overwatch-2026'],
	['trucchi-rust-2026', 'trucchi-overwatch-2026'],
	['cheaty-rust-2026', 'cheaty-overwatch-2026'],
	['chity-rust-2026', 'chity-overwatch-2026'],
	['rust-hileleri-2026', 'overwatch-hileleri-2026'],
	['cheats-rust-2026', 'cheats-overwatch-2026'],
	['cheats-rust-indetectaveis', 'cheats-overwatch-indetectaveis'],
	['hacks-trucos-rust', 'hacks-trucos-overwatch'],
	['hacks-triche-rust', 'hacks-triche-overwatch'],
	['hacks-cheats-rust', 'hacks-cheats-overwatch'],
	['hacks-trucchi-rust', 'hacks-trucchi-overwatch'],
	['hacks-cheatow-rust', 'hacks-cheatow-overwatch'],
	['haksy-chity-rust', 'haksy-chity-overwatch'],
	['rust-hile-hacks', 'overwatch-hile-hacks'],
	['descarga-trucos-rust', 'descarga-trucos-overwatch'],
	['telechargement-triche-rust', 'telechargement-triche-overwatch'],
	['download-cheats-rust', 'download-cheats-overwatch'],
	['download-trucchi-rust', 'download-trucchi-overwatch'],
	['pobieranie-cheatow-rust', 'pobieranie-cheatow-overwatch'],
	['skachat-chity-rust', 'skachat-chity-overwatch'],
	['rust-hile-indir', 'overwatch-hile-indir'],
	['menu-mod-trucos-rust', 'menu-mod-trucos-overwatch'],
	['menu-mod-triche-rust', 'menu-mod-triche-overwatch'],
	['menu-mod-cheats-rust', 'menu-mod-cheats-overwatch'],
	['menu-mod-trucchi-rust', 'menu-mod-trucchi-overwatch'],
	['menu-mod-cheatow-rust', 'menu-mod-cheatow-overwatch'],
	['mod-menu-chity-rust', 'mod-menu-chity-overwatch'],
	['soft-aim-trucos-rust', 'soft-aim-trucos-overwatch'],
	['soft-aim-triche-rust', 'soft-aim-triche-overwatch'],
	['soft-aim-cheats-rust', 'soft-aim-cheats-overwatch'],
	['soft-aim-trucchi-rust', 'soft-aim-trucchi-overwatch'],
	['soft-aim-cheatow-rust', 'soft-aim-cheatow-overwatch'],
	['soft-aim-chity-rust', 'soft-aim-chity-overwatch'],
	['mejores-trucos-rust', 'mejores-trucos-overwatch'],
	['meilleures-triches-rust', 'meilleures-triches-overwatch'],
	['beste-rust-cheats', 'beste-overwatch-cheats'],
	['melhores-cheats-rust', 'melhores-cheats-overwatch'],
	['migliori-trucchi-rust', 'migliori-trucchi-overwatch'],
	['najlepsze-cheats-rust', 'najlepsze-cheats-overwatch'],
	['luchshie-chity-rust', 'luchshie-chity-overwatch'],
	['en-iyi-rust-hileleri', 'en-iyi-overwatch-hileleri'],
	['naykrashchi-chity-rust', 'naykrashchi-chity-overwatch'],
	['nejlepsi-rust-cheats', 'nejlepsi-overwatch-cheats'],
	['cele-mai-bune-cheats-rust', 'cele-mai-bune-cheats-overwatch'],
	['basta-rust-cheats', 'basta-overwatch-cheats'],
	['aimbot-hack-trucos-rust', 'aimbot-hack-trucos-overwatch'],
	['aimbot-hack-triche-rust', 'aimbot-hack-triche-overwatch'],
	['aimbot-hack-cheats-rust', 'aimbot-hack-cheats-overwatch'],
	['aimbot-hack-trucchi-rust', 'aimbot-hack-trucchi-overwatch'],
	['aimbot-hack-cheatow-rust', 'aimbot-hack-cheatow-overwatch'],
	['aimbot-hack-chity-rust', 'aimbot-hack-chity-overwatch'],
	['esp-hack-trucos-rust', 'esp-hack-trucos-overwatch'],
	['esp-hack-triche-rust', 'esp-hack-triche-overwatch'],
	['esp-hack-cheats-rust', 'esp-hack-cheats-overwatch'],
	['esp-hack-trucchi-rust', 'esp-hack-trucchi-overwatch'],
	['esp-hack-cheatow-rust', 'esp-hack-cheatow-overwatch'],
	['esp-hack-chity-rust', 'esp-hack-chity-overwatch'],
	['unlock-all-trucos-rust', 'unlock-all-trucos-overwatch'],
	['unlock-all-triche-rust', 'unlock-all-triche-overwatch'],
	['unlock-all-cheats-rust', 'unlock-all-cheats-overwatch'],
	['unlock-all-trucchi-rust', 'unlock-all-trucchi-overwatch'],
	['unlock-all-cheatow-rust', 'unlock-all-cheatow-overwatch'],
	['unlock-all-chity-rust', 'unlock-all-chity-overwatch'],
	['trucos-rust-esp', 'trucos-overwatch-esp'],
	['triche-rust-esp', 'triche-overwatch-esp'],
	['cheats-rust-esp', 'cheats-overwatch-esp'],
	['trucchi-rust-esp', 'trucchi-overwatch-esp'],
	['cheaty-rust-esp', 'cheaty-overwatch-esp'],
	['chity-rust-esp', 'chity-overwatch-esp'],
	['rust-esp-chity', 'overwatch-esp-chity'],
	['rust-esp-hile', 'overwatch-esp-hile'],
	['trucos-rust-aimbot', 'trucos-overwatch-aimbot'],
	['triche-rust-aimbot', 'triche-overwatch-aimbot'],
	['cheats-rust-aimbot', 'cheats-overwatch-aimbot'],
	['trucchi-rust-aimbot', 'trucchi-overwatch-aimbot'],
	['cheaty-rust-aimbot', 'cheaty-overwatch-aimbot'],
	['chity-rust-aimbot', 'chity-overwatch-aimbot'],
	['rust-aimbot-chity', 'overwatch-aimbot-chity'],
	['rust-aimbot-hile', 'overwatch-aimbot-hile'],
	['rust-radar-hack', 'overwatch-radar-hack'],
	['rust-aimbot-hack', 'overwatch-aimbot-hack'],
	['rust-esp-hack', 'overwatch-esp-hack'],
	['rust-cheat-download', 'overwatch-cheat-download'],
	['rust-mod-menu', 'overwatch-mod-menu'],
	['rust-soft-aim', 'overwatch-soft-aim'],
	['best-rust-cheats', 'best-overwatch-cheats'],
	['rust-unlock-all', 'overwatch-unlock-all'],
	['rust-cheats-2026', 'overwatch-cheats-2026'],
	['rust-wallhack', 'overwatch-wallhack'],
	['rust-aimbot', 'overwatch-aimbot'],
	['rust-esp', 'overwatch-esp'],
	['rust-hacks', 'overwatch-hacks'],
	['rust-cheats', 'overwatch-cheats'],
	['trucos-rust', 'trucos-overwatch'],
	['triche-rust', 'triche-overwatch'],
	['cheats-rust', 'cheats-overwatch'],
	['trucchi-rust', 'trucchi-overwatch'],
	['cheaty-rust', 'cheaty-overwatch'],
	['chity-rust', 'chity-overwatch'],
	['chitov-rust', 'chitov-overwatch'],
	['chitiv-rust', 'chitiv-overwatch'],
	['cheatow-rust', 'cheatow-overwatch'],
	['hile-rust', 'hile-overwatch'],
	['rust-hile', 'overwatch-hile'],
	// Review slugs
	['arc-raiders-soft-aim-review', 'overwatch-soft-aim-review'],
	['arc-raiders-esp-zero-build-review', 'overwatch-esp-ranked-review'],
	['arc-raiders-cloud-dma-review', 'overwatch-cloud-dma-review'],
	['arc-raiders-controller-soft-aim-review', 'overwatch-controller-soft-aim-review'],
	['arc-raiders-hack-setup-review', 'overwatch-hack-setup-review'],
	['arc-raiders-loot-esp-review', 'overwatch-health-esp-review'],
	['arc-raiders-soft-aim-ranked-review', 'overwatch-soft-aim-ranked-review'],
	['arc-raiders-radar-hack-review', 'overwatch-radar-hack-review'],
	['arc-raiders-eac-update-review', 'overwatch-anti-cheat-update-review'],
	['arc-raiders-sniper-soft-aim-review', 'overwatch-sniper-soft-aim-review'],
	// Checkout & external
	['/products/arc-raiders-cheats', '/products/overwatch-cheats'],
	['https://rust.arcraiders.com/competitive', 'https://overwatch.blizzard.com/en-us/'],
	['https://rust.arcraiders.com/', 'https://overwatch.blizzard.com/en-us/'],
	['https://www.arcraiders.com/', 'https://overwatch.blizzard.com/en-us/'],
	['https://www.arcraiders.com', 'https://overwatch.blizzard.com/en-us'],
	['arcraiders.com', 'overwatch.blizzard.com'],
	['Embark Rust status', 'Blizzard Overwatch status'],
	['Embark Rust', 'Blizzard Overwatch'],
	['Easy Anti-Cheat', 'Blizzard anti-cheat'],
	['EAC bypass', 'anti-cheat bypass'],
	['EAC maintenance', 'anti-cheat maintenance'],
	['EAC patches', 'anti-cheat patches'],
	['EAC or game', 'anti-cheat or game'],
	[' after EAC ', ' after anti-cheat '],
	[' with EAC ', ' with anti-cheat '],
	[' for EAC ', ' for anti-cheat '],
	// Game lore → Overwatch
	['ARC machine threat outlines before they breach your position', 'enemy ultimate threat outlines before they breach your position'],
	['ARC machine threat', 'enemy ultimate threat'],
	['ARC machines', 'enemy ults'],
	['ARC machine', 'enemy ult'],
	['ARC patrol routes', 'flank routes'],
	['ARC patrol pushes', 'flank pushes'],
	['ARC patrol', 'flank route'],
	['ARC units and raiders', 'enemies and support heroes'],
	['ARC units', 'enemy heroes'],
	['targeting ARC machines', 'targeting enemy heroes'],
	['on ARC machines', 'on enemy heroes'],
	['industrial ruins', 'map sightlines'],
	['collapsed city zone', 'control point push'],
	['collapsed districts', 'map objectives'],
	['extraction zones and collapsed districts', 'control points and map objectives'],
	['extraction zones and raids', 'control points and ranked'],
	['extraction zones', 'control points'],
	['extraction zone', 'control point'],
	['extraction runs', 'ranked matches'],
	['extraction run', 'ranked match'],
	['extraction rotations', 'map rotations'],
	['extraction rotation', 'map rotation'],
	['extraction pushes', 'team pushes'],
	['extraction push', 'team push'],
	['extraction pressure', 'ranked pressure'],
	['extraction combat', 'team fight combat'],
	['extraction and PvP', 'competitive and Quick Play'],
	['squad extractions', 'team pushes'],
	['squad extraction', 'team push'],
	['Enemy raider ESP', 'Enemy hero ESP'],
	['enemy raiders', 'enemy heroes'],
	['enemy raider', 'enemy hero'],
	['raider ESP', 'enemy ESP'],
	['Raider ESP', 'Enemy ESP'],
	['raiders outside', 'enemies outside'],
	['nearby raiders', 'nearby enemies'],
	['arc raids', 'ranked matches'],
	['container markers', 'ability cooldown markers'],
	['Loot and container markers', 'Health pack and ability cooldown markers'],
	['loot markers', 'health pack markers'],
	['loot ESP', 'health pack ESP'],
	['Loot ESP', 'Health pack ESP'],
	['oil-rig', 'payload route'],
	['oil rig', 'payload route'],
	['monuments', 'control points'],
	['monument rotations', 'map rotations'],
	['monument', 'control point'],
	['wipe pressure', 'ranked pressure'],
	['wipe-cycle raids', 'ranked seasons'],
	['Facepunch Rust', 'Overwatch'],
	['Chapter 7', 'Season 16'],
	['zero build', 'Quick Play'],
	['Zero Build', 'Quick Play'],
	['Battle Royale island', 'Overwatch maps'],
	['battle royale', 'competitive'],
	['Battle Royale', 'Competitive'],
	['reboot van', 'respawn wave'],
	['reboot rounds', 'overtime rounds'],
	['BR-critical', 'ranked-critical'],
	['BR and Zero Build', 'Competitive and Quick Play'],
	['BR & Zero Build', 'Competitive & Quick Play'],
	['PVE and PVP', 'Quick Play and Competitive'],
	['survival', 'competitive'],
	// Brand strings (order: longest first)
	['ArcRaiders Hacks', 'Overwatch Hacks'],
	['Arc Raiders Hacks', 'Overwatch Hacks'],
	['Arc Raiders ESP', 'Overwatch ESP'],
	['Arc Raiders Aimbot', 'Overwatch Aimbot'],
	['Arc Raiders wallhack', 'Overwatch wallhack'],
	['Arc Raiders Wallhack', 'Overwatch Wallhack'],
	['Arc Raiders Radar', 'Overwatch Radar'],
	['Arc Raiders radar', 'Overwatch radar'],
	['Arc Raiders hacks', 'Overwatch hacks'],
	['Arc Raiders Hacks', 'Overwatch Hacks'],
	['Arc Raiders hack', 'Overwatch hack'],
	['Arc Raiders cheat', 'Overwatch cheat'],
	['Arc Raiders cheats', 'Overwatch cheats'],
	['Arc Raiders soft aim', 'Overwatch soft aim'],
	['Arc Raiders loot', 'Overwatch health packs'],
	['Arc Raiders maps', 'Overwatch maps'],
	['Arc Raiders punishes', 'Overwatch punishes'],
	['Arc Raiders mixes', 'Overwatch mixes'],
	['Arc Raiders\'', 'Overwatch\''],
	["Arc Raiders'", "Overwatch'"],
	['Arc Raiders', 'Overwatch'],
	['arc raiders cheats', 'overwatch cheats'],
	['arc raiders esp', 'overwatch esp'],
	['arc raiders aimbot', 'overwatch aimbot'],
	['arc raiders wallhack', 'overwatch wallhack'],
	['arc raiders hacks', 'overwatch hacks'],
	['undetected arc raiders hacks', 'undetected overwatch hacks'],
	['arc raiders hacks 2026', 'overwatch hacks 2026'],
	['arc raiders', 'overwatch'],
	['ArcRaiders', 'Overwatch'],
	// Project identifiers
	['project-name=arcraidershacks', 'project-name=overwatchhacks'],
	['name = "arcraidershacks"', 'name = "overwatchhacks"'],
	['"arcraiders-hacks"', '"overwatch-hacks"'],
	['arcraiders-hacks', 'overwatch-hacks'],
	['Arc Raiders update log', 'Overwatch update log'],
	['Arc Raiders Intel', 'Overwatch Intel'],
	['rust intel', 'overwatch intel'],
	['Rust Intel', 'Overwatch Intel'],
	['Buy Arc Raiders Hacks', 'Buy Overwatch Hacks'],
	['Buy ArcRaiders Hacks', 'Buy Overwatch Hacks'],
	// Middleware hosts
	["const APEX_HOST = 'arcraidershacks.net'", "const APEX_HOST = 'overwatchhacks.com'"],
	["const WWW_HOST = 'www.arcraidershacks.net'", "const WWW_HOST = 'www.overwatchhacks.com'"],
	["const CANONICAL_ORIGIN = 'https://arcraidershacks.net'", "const CANONICAL_ORIGIN = 'https://overwatchhacks.com'"],
	// seo.ts helper
	["if (lead.toLowerCase().includes('arc raiders'))", "if (lead.toLowerCase().includes('overwatch'))"],
	['return `Arc Raiders hacks — ${lead}`', 'return `Overwatch hacks — ${lead}`'],
	['optimized for arcraidershacks.net', 'optimized for overwatchhacks.com'],
	['| arcraidershacks.net', '| overwatchhacks.com'],
	['| Arc Raiders Hacks', '| Overwatch Hacks'],
	// Short internal brand
	["shortName: 'Arc'", "shortName: 'OW'"],
	["game: 'Arc Raiders'", "game: 'Overwatch'"],
	['Arc Raiders Hacks logo', 'Overwatch Hacks logo'],
];

const PAGE_DIR_RENAMES = [
	['arc-raiders-hacks', 'overwatch-hacks'],
	['arc-raiders-esp', 'overwatch-esp'],
	['arc-raiders-aimbot', 'overwatch-aimbot'],
	['arc-raiders-wallhack', 'overwatch-wallhack'],
	['arc-raiders-radar', 'overwatch-radar'],
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
			console.log('Updated', file.replace(root + '/', '').replace(root + '\\', ''));
		}
	}
	console.log(`\nTransformed ${changed} files`);
}

function patchMiddlewareRedirects() {
	const file = join(root, 'functions', '_middleware.js');
	let content = readFileSync(file, 'utf8');
	const legacyBlock = `'arcraidershacks.net',
\t'www.arcraidershacks.net',
\t'arcraidershacks.com',
\t'www.arcraidershacks.com',`;
	if (!content.includes("'overwatchhacks.com'")) {
		content = content.replace(
			legacyBlock,
			`${legacyBlock}
\t'overwatchhacks.com',
\t'www.overwatchhacks.com',`,
		);
	}
	const extraRedirects = {
		'/arc-raiders-hacks': '/overwatch-hacks/',
		'/arc-raiders-hacks/': '/overwatch-hacks/',
		'/arc-raiders-esp': '/overwatch-esp/',
		'/arc-raiders-esp/': '/overwatch-esp/',
		'/arc-raiders-aimbot': '/overwatch-aimbot/',
		'/arc-raiders-aimbot/': '/overwatch-aimbot/',
		'/arc-raiders-wallhack': '/overwatch-wallhack/',
		'/arc-raiders-wallhack/': '/overwatch-wallhack/',
		'/arc-raiders-radar': '/overwatch-radar/',
		'/arc-raiders-radar/': '/overwatch-radar/',
	};
	for (const [from, to] of Object.entries(extraRedirects)) {
		const key = `'${from}': '${to}'`;
		if (!content.includes(key)) {
			content = content.replace(
				"const PATH_REDIRECTS = {",
				`const PATH_REDIRECTS = {\n\t'${from}': '${to}',`,
			);
		}
	}
	writeFileSync(file, content);
	console.log('Patched functions/_middleware.js redirects');
}

function patchValidateSitemaps() {
	const file = join(root, 'scripts', 'validate-sitemaps.mjs');
	let content = readFileSync(file, 'utf8');
	content = apply(content);
	content = content.replace(
		"const ENGLISH_PATHS = [\n\t'/',\n\t'/arc-raiders-hacks/',",
		"const ENGLISH_PATHS = [\n\t'/',\n\t'/overwatch-hacks/',",
	);
	writeFileSync(file, content);
	console.log('Patched validate-sitemaps.mjs');
}

function patchPublicRedirects() {
	const file = join(root, 'public', '_redirects');
	let content = readFileSync(file, 'utf8');
	const lines = [
		'/arc-raiders-hacks /overwatch-hacks/ 301',
		'/arc-raiders-hacks/ /overwatch-hacks/ 301',
		'/arc-raiders-esp /overwatch-esp/ 301',
		'/arc-raiders-esp/ /overwatch-esp/ 301',
		'/arc-raiders-aimbot /overwatch-aimbot/ 301',
		'/arc-raiders-aimbot/ /overwatch-aimbot/ 301',
		'/arc-raiders-wallhack /overwatch-wallhack/ 301',
		'/arc-raiders-wallhack/ /overwatch-wallhack/ 301',
		'/arc-raiders-radar /overwatch-radar/ 301',
		'/arc-raiders-radar/ /overwatch-radar/ 301',
	];
	for (const line of lines) {
		if (!content.includes(line.split(' ')[0])) {
			content += `\n${line}`;
		}
	}
	writeFileSync(file, content);
	console.log('Patched public/_redirects');
}

console.log('Rebranding Arc Raiders → Overwatch Hacks...\n');
renamePageDirs();
transformFiles();
patchMiddlewareRedirects();
patchValidateSitemaps();
patchPublicRedirects();
console.log('\nRebrand complete. Next: npm run generate:i18n && node scripts/generate-blog-posts.mjs');
