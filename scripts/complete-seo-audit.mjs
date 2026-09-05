#!/usr/bin/env node
/**
 * Completes enlisted-cheats SEO audit: add missing pages, fix leftovers, strip Zadeyo from meta.
 * Run: node scripts/complete-seo-audit.mjs
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NODE = 'C:\\Program Files\\nodejs\\node.exe';

const EXTRA_PAGES = [
	{ id: 'hacks', dir: 'enlisted-cheats', pageId: 'hacks' },
	{ id: 'cheat-download', dir: 'enlisted-cheat-download', pageId: 'cheat-download' },
	{ id: 'mod-menu', dir: 'enlisted-mod-menu', pageId: 'mod-menu' },
	{ id: 'soft-aim', dir: 'enlisted-soft-aim', pageId: 'soft-aim' },
	{ id: 'best-cheats', dir: 'best-enlisted-cheats', pageId: 'best-cheats' },
	{ id: 'aimbot-hack', dir: 'enlisted-aimbot-hack', pageId: 'aimbot-hack' },
	{ id: 'esp-hack', dir: 'enlisted-esp-hack', pageId: 'esp-hack' },
	{ id: 'unlock-all', dir: 'enlisted-unlock-all', pageId: 'unlock-all' },
];

const GLOBAL_REPLACEMENTS = [
	[/warzone-warzone/g, 'rust'],
	[/eac-bypass-enlisted-warzone/g, 'eac-bypass-enlisted'],
	[/Call of Duty: Warzone/g, 'Enlisted'],
	[/Call of Duty Warzone/g, 'Enlisted'],
	[/Call of Duty/g, 'Enlisted'],
	[/Warzone Wallhack/g, 'Enlisted Wallhack'],
	[/Warzone Radar Hack/g, 'Enlisted Radar Hack'],
	[/Warzone Cheat Features/g, 'Enlisted Cheat Features'],
	[/Warzone Cheat Pricing/g, 'Enlisted Cheat Pricing'],
	[/Warzone Cheat Setup/g, 'Enlisted Cheat Setup'],
	[/Warzone Cheat Status/g, 'Enlisted Cheat Status'],
	[/Warzone Cheat Support/g, 'Enlisted Cheat Support'],
	[/Warzone squad fight/g, 'Enlisted squad fight'],
	[/Warzone squad builder/g, 'Enlisted loadout builder'],
	[/Warzone store header/g, 'Enlisted header'],
	[/Warzone wasteland combat/g, 'Enlisted frontline campaigns combat'],
	[/Warzone loadout builder/g, 'Enlisted loadout builder'],
	[/Warzone pricing/g, 'Enlisted pricing'],
	[/Warzone Darkflow Software anti-cheat/g, 'Enlisted Darkflow Software anti-cheat'],
	[/on Warzone/g, 'on Enlisted'],
	[/for Warzone/g, 'for Enlisted'],
	[/Warzone guides/g, 'Enlisted guides'],
	[/Warzone guide/g, 'Enlisted guide'],
	[/Warzone hileleri/g, 'Enlisted hileleri'],
	[/Warzone hile/g, 'Enlisted hile'],
	[/Warzone hileleri/g, 'Enlisted hileleri'],
	[/cheatów Warzone/g, 'cheatów Enlisted'],
	[/cheat Warzone/g, 'cheat Enlisted'],
	[/cheats Warzone/g, 'cheats Enlisted'],
	[/trucos Warzone/g, 'trucos Enlisted'],
	[/triche Warzone/g, 'triche Enlisted'],
	[/trucchi Warzone/g, 'trucchi Enlisted'],
	[/Wallhack Warzone/g, 'Enlisted Wallhack'],
	[/cheat Warzone undetected/g, 'cheat Enlisted undetected'],
	[/cheats Warzone undetected/g, 'cheats Enlisted undetected'],
	[/Verdansk beams/g, 'long-range AR beams'],
	[/Resurgence room clears/g, 'close-quarters room clears'],
	[/Verdansk and Urzikstan/g, 'Enlisted and mission objectives'],
	[/Verdansk, Urzikstan/g, 'Enlisted, mission objectives'],
	[/frontline campaigns and Resurgence/g, 'frontline campaigns and mission objectives'],
	[/Activision's anti-cheat/g, "Embark' anti-cheat"],
	[/Activision anti-cheat/g, 'Embark anti-cheat'],
	[/Activision ships/g, 'Embark ships'],
	[/Activision security/g, 'Embark security'],
	[/Activision bans/g, 'Embark bans'],
	[/Activision/g, 'Embark'],
	[/ricochet/gi, 'eac'],
	[/Ricochet/g, 'Darkflow Software anti-cheat (EAC)'],
	[/call-of-duty-warzone-cheats/g, 'enlisted-cheats'],
	[/call-of-duty-warzone/g, 'rust'],
	[/Undetected Wallhack for Call of Duty/g, 'Undetected Wallhack for Enlisted'],
	[/How ESP wallhack, radar, and Aimbot rebuild after Call of Duty anti-cheat/g,
		'How ESP wallhack, radar, and Aimbot rebuild after Enlisted anti-cheat'],
];

/** Remove Zadeyo from meta description/title strings only */
function stripZadeyoFromMeta(text) {
	return text
		.replace(/\s*[—–-]\s*checkout via Zadeyo\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout en Zadeyo\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout via Zadeyo\.?/gi, '.')
		.replace(/\s*with Zadeyo checkout\.?/gi, '.')
		.replace(/\s*via Zadeyo checkout\.?/gi, '.')
		.replace(/\s*Checkout via Zadeyo\.?/gi, '')
		.replace(/\s*Zadeyo checkout,?\s*/gi, ' ')
		.replace(/\s*Zadeyo delivery\.?/gi, 'instant digital delivery.')
		.replace(/\s*and Zadeyo delivery\.?/gi, ' and instant digital delivery.')
		.replace(/\|\s*Instant Zadeyo Delivery/g, '| Instant Digital Delivery')
		.replace(/Buy on Zadeyo/g, 'Buy Enlisted Cheats')
		.replace(/\s{2,}/g, ' ')
		.trim();
}

async function walkFiles(dir, exts, files = []) {
	const entries = await import('node:fs/promises').then((fs) => fs.readdir(dir, { withFileTypes: true }));
	for (const e of entries) {
		if (e.name === 'node_modules' || e.name === 'dist' || e.name === '.git') continue;
		const full = path.join(dir, e.name);
		if (e.isDirectory()) await walkFiles(full, exts, files);
		else if (exts.some((x) => e.name.endsWith(x))) files.push(full);
	}
	return files;
}

async function applyGlobalFixes() {
	const targets = await walkFiles(path.join(ROOT, 'src'), ['.ts', '.astro']);
	targets.push(
		path.join(ROOT, 'scripts', 'i18n-data', 'pages-en.mjs'),
		path.join(ROOT, 'scripts', 'i18n-data', 'pages-i18n.mjs'),
		path.join(ROOT, 'scripts', 'i18n-data', 'ui-strings-part1.mjs'),
		path.join(ROOT, 'scripts', 'i18n-data', 'ui-strings-part2.mjs'),
		path.join(ROOT, 'scripts', 'i18n-data', 'phrases.mjs'),
		path.join(ROOT, 'scripts', 'i18n-data', 'gallery-ui.ts'),
		path.join(ROOT, 'src', 'data', 'i18n', 'gallery-ui.ts'),
		path.join(ROOT, 'functions', '_middleware.js'),
	);

	for (const file of targets) {
		try {
			await access(file);
		} catch {
			continue;
		}
		let content = await readFile(file, 'utf8');
		const original = content;
		for (const [pattern, replacement] of GLOBAL_REPLACEMENTS) {
			content = content.replace(pattern, replacement);
		}
		if (file.endsWith('pages-en.mjs')) {
			// Strip Zadeyo from description: and title: lines
			content = content.replace(/(description:\s*['"])([^'"]+)(['"])/g, (_, pre, body, post) =>
				pre + stripZadeyoFromMeta(body) + post,
			);
			content = content.replace(/(title:\s*['"])([^'"]+)(['"])/g, (_, pre, body, post) =>
				pre + stripZadeyoFromMeta(body) + post,
			);
		}
		if (content !== original) {
			await writeFile(file, content, 'utf8');
			console.log(`Fixed: ${path.relative(ROOT, file)}`);
		}
	}
}

async function createExtraPages() {
	const template = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="PAGE_ID" />
`;
	for (const page of EXTRA_PAGES) {
		const dir = path.join(ROOT, 'src', 'pages', page.dir);
		await mkdir(dir, { recursive: true });
		const file = path.join(dir, 'index.astro');
		try {
			await access(file);
		} catch {
			await writeFile(file, template.replace('PAGE_ID', page.pageId), 'utf8');
			console.log(`Created page: src/pages/${page.dir}/index.astro`);
		}
	}
}

async function fixLocalesBlogUi() {
	const file = path.join(ROOT, 'src', 'data', 'i18n', 'locales.ts');
	let content = await readFile(file, 'utf8');
	content = content.replace(/Warzone guides/g, 'Enlisted guides');
	content = content.replace(/Warzone guide/g, 'Enlisted guide');
	content = content.replace(/Warzone hileleri/g, 'Enlisted hileleri');
	content = content.replace(/Warzone hile/g, 'Enlisted hile');
	content = content.replace(/cheat Warzone/g, 'cheat Enlisted');
	content = content.replace(/cheats Warzone/g, 'cheats Enlisted');
	content = content.replace(/trucos Warzone/g, 'trucos Enlisted');
	content = content.replace(/triche Warzone/g, 'triche Enlisted');
	content = content.replace(/trucchi Warzone/g, 'trucchi Enlisted');
	content = content.replace(/cheatów Warzone/g, 'cheatów Enlisted');
	content = content.replace(/читов Warzone/g, 'читов Enlisted');
	content = content.replace(/читів Warzone/g, 'читів Enlisted');
	content = content.replace(/Warzoneチート/g, 'Enlistedチート');
	content = content.replace(/Warzone 치트/g, 'Enlisted 치트');
	content = content.replace(/Warzone作弊/g, 'Enlisted作弊');
	content = content.replace(/Warzone rehberleri/g, 'Enlisted rehberleri');
	content = content.replace(/Warzone gidsen/g, 'Enlisted gidsen');
	content = content.replace(/Warzone průvodce/g, 'Enlisted průvodce');
	content = content.replace(/Warzone guider/g, 'Enlisted guider');
	content = content.replace(/Warzone related/g, 'Enlisted related');
	content = content.replace(/Warzone ガイド/g, 'Enlisted ガイド');
	content = content.replace(/Warzone 가이드/g, 'Enlisted 가이드');
	content = content.replace(/Warzone指南/g, 'Enlisted指南');
	content = content.replace(/Warzone गाइड/g, 'Enlisted गाइड');
	content = content.replace(/Warzone panduan/g, 'Enlisted panduan');
	content = content.replace(/Warzone คู่มือ/g, 'Enlisted คู่มือ');
	content = content.replace(/Warzone hướng dẫn/g, 'Enlisted hướng dẫn');
	await writeFile(file, content, 'utf8');
	console.log('Fixed locales.ts blogUi');
}

console.log('=== Enlisted Cheats SEO completion ===\n');
await applyGlobalFixes();
await createExtraPages();
await fixLocalesBlogUi();
console.log('\nDone. Next: update routing.ts manually, then run generate:i18n, fetch:images, build:validate');
