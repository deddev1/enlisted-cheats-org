#!/usr/bin/env node
/**
 * Generate dark tactical cheat-UI mockups (ESP / aimbot / menu / status).
 * Not combat stock photos — product/HUD visuals for Enlisted Cheats SEO filenames.
 */
import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');
const publicDir = path.resolve('public');

const W = 1600;
const H = 900;

/** Simple SEO filenames — hacks/cheats only. */
const ASSETS = {
	'enlisted-cheats-hero.webp': heroSvg,
	'enlisted-cheats-cover.webp': coverSvg,
	'enlisted-esp-overlay.webp': espSvg,
	'enlisted-aimbot-ui.webp': aimbotSvg,
	'enlisted-wallhack-ui.webp': wallhackSvg,
	'enlisted-cheats-menu.webp': menuSvg,
	'enlisted-cheats-status.webp': statusSvg,
	'enlisted-radar-ui.webp': radarSvg,
	'enlisted-soft-aim-ui.webp': softAimSvg,
	'enlisted-cheats-panel.webp': panelSvg,
	'enlisted-cheats-dashboard.webp': dashboardSvg,
	'enlisted-cheats-logo.webp': null, // derived from hero
};

function esc(s) {
	return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function frame(title, body) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0d0f"/>
      <stop offset="55%" stop-color="#14181c"/>
      <stop offset="100%" stop-color="#1a1510"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1c2228"/>
      <stop offset="100%" stop-color="#12161a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8f4520"/>
      <stop offset="100%" stop-color="#e08c48"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${W}" height="4" fill="url(#accent)"/>
  <text x="48" y="56" fill="#d4a574" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3">${esc(title)}</text>
  ${body}
</svg>`;
}

function heroSvg() {
	return frame(
		'Enlisted Cheats',
		`
  <rect x="48" y="100" width="720" height="720" rx="12" fill="url(#panel)" stroke="#c4784033" stroke-width="2"/>
  <text x="80" y="160" fill="#f2ebe3" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="800">ESP · AIMBOT · WALLHACK</text>
  <text x="80" y="210" fill="#b8aea2" font-family="Segoe UI, Arial, sans-serif" font-size="24">Undetected package UI for Windows PC</text>
  <rect x="80" y="260" width="280" height="48" rx="8" fill="#c47840"/>
  <text x="120" y="292" fill="#fff" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700">BUY Enlisted Cheats</text>
  <g transform="translate(860,140)">
    <rect width="680" height="620" rx="14" fill="#0f1317" stroke="#c4784044" stroke-width="2"/>
    <text x="28" y="44" fill="#e08c48" font-family="Consolas, monospace" font-size="18">overlay.esp</text>
    <rect x="40" y="80" width="120" height="90" fill="none" stroke="#34d399" stroke-width="2"/>
    <text x="48" y="100" fill="#34d399" font-family="Consolas, monospace" font-size="14">PLAYER</text>
    <text x="48" y="122" fill="#9ae6b4" font-family="Consolas, monospace" font-size="13">142m</text>
    <rect x="220" y="160" width="100" height="70" fill="none" stroke="#f6ad55" stroke-width="2"/>
    <text x="228" y="180" fill="#f6ad55" font-family="Consolas, monospace" font-size="14">LOOT</text>
    <line x1="340" y1="310" x2="520" y2="240" stroke="#c47840" stroke-width="2" stroke-dasharray="6 4"/>
    <circle cx="340" cy="310" r="8" fill="none" stroke="#e08c48" stroke-width="2"/>
    <circle cx="340" cy="310" r="2" fill="#e08c48"/>
    <text x="28" y="560" fill="#8f8578" font-family="Consolas, monospace" font-size="14">status: maintained · eac sync</text>
  </g>`,
	);
}

function coverSvg() {
	return frame(
		'Enlisted Cheats PACKAGE',
		`
  <rect x="200" y="180" width="1200" height="520" rx="16" fill="url(#panel)" stroke="#c4784055" stroke-width="2"/>
  <text x="260" y="300" fill="#f2ebe3" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="800">Enlisted Cheats</text>
  <text x="260" y="370" fill="#d4a574" font-family="Segoe UI, Arial, sans-serif" font-size="32">ESP · Aimbot · Wallhack · Radar</text>
  <rect x="260" y="420" width="180" height="36" rx="6" fill="#243028"/>
  <text x="285" y="444" fill="#7a9e8a" font-family="Consolas, monospace" font-size="16">STATUS: ONLINE</text>
  <rect x="460" y="420" width="220" height="36" rx="6" fill="#2a2018"/>
  <text x="480" y="444" fill="#e08c48" font-family="Consolas, monospace" font-size="16">EAC MAINTENANCE</text>`,
	);
}

function espSvg() {
	return frame(
		'RUST ESP OVERLAY',
		`
  <rect x="80" y="120" width="1440" height="700" rx="12" fill="#0e1216" stroke="#c4784033"/>
  <rect x="180" y="220" width="140" height="200" fill="none" stroke="#34d399" stroke-width="2"/>
  <text x="190" y="245" fill="#34d399" font-family="Consolas, monospace" font-size="16">ENEMY</text>
  <text x="190" y="270" fill="#9ae6b4" font-family="Consolas, monospace" font-size="15">87m</text>
  <rect x="520" y="300" width="110" height="90" fill="none" stroke="#63b3ed" stroke-width="2"/>
  <text x="530" y="325" fill="#63b3ed" font-family="Consolas, monospace" font-size="15">CHEST</text>
  <rect x="900" y="250" width="130" height="170" fill="none" stroke="#fc8181" stroke-width="2"/>
  <text x="910" y="275" fill="#fc8181" font-family="Consolas, monospace" font-size="15">SQUAD</text>
  <text x="910" y="300" fill="#feb2b2" font-family="Consolas, monospace" font-size="14">214m</text>
  <line x1="800" y1="450" x2="965" y2="340" stroke="#c47840aa" stroke-width="1.5"/>
  <rect x="80" y="120" width="260" height="700" fill="#12181ecc" stroke="#c4784022"/>
  <text x="110" y="180" fill="#e08c48" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700">ESP TOGGLES</text>
  <text x="110" y="230" fill="#f2ebe3" font-family="Consolas, monospace" font-size="16">[x] Players</text>
  <text x="110" y="270" fill="#f2ebe3" font-family="Consolas, monospace" font-size="16">[x] Loot</text>
  <text x="110" y="310" fill="#f2ebe3" font-family="Consolas, monospace" font-size="16">[x] Distance</text>
  <text x="110" y="350" fill="#b8aea2" font-family="Consolas, monospace" font-size="16">[ ] Snaplines</text>`,
	);
}

function aimbotSvg() {
	return frame(
		'RUST AIMBOT UI',
		`
  <rect x="100" y="140" width="900" height="640" rx="12" fill="#0e1216" stroke="#c4784033"/>
  <line x1="520" y1="300" x2="520" y2="560" stroke="#e08c4888" stroke-width="1"/>
  <line x1="390" y1="430" x2="650" y2="430" stroke="#e08c4888" stroke-width="1"/>
  <circle cx="520" cy="430" r="70" fill="none" stroke="#c47840" stroke-width="2"/>
  <circle cx="520" cy="430" r="4" fill="#e08c48"/>
  <text x="470" y="620" fill="#d4a574" font-family="Consolas, monospace" font-size="18">FOV 42 · SMOOTH 28</text>
  <rect x="1060" y="140" width="440" height="640" rx="12" fill="url(#panel)" stroke="#c4784044"/>
  <text x="1100" y="200" fill="#f2ebe3" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">Aimbot</text>
  <text x="1100" y="260" fill="#b8aea2" font-family="Consolas, monospace" font-size="16">Bone: Head</text>
  <text x="1100" y="300" fill="#b8aea2" font-family="Consolas, monospace" font-size="16">Target: Closest</text>
  <text x="1100" y="340" fill="#b8aea2" font-family="Consolas, monospace" font-size="16">Hotkey: Mouse4</text>
  <rect x="1100" y="400" width="360" height="12" rx="6" fill="#2a2018"/>
  <rect x="1100" y="400" width="220" height="12" rx="6" fill="#c47840"/>
  <text x="1100" y="450" fill="#8f8578" font-family="Consolas, monospace" font-size="14">smoothness</text>`,
	);
}

function wallhackSvg() {
	return frame(
		'RUST WALLHACK UI',
		`
  <rect x="80" y="120" width="1440" height="700" rx="12" fill="#0c1014"/>
  <rect x="300" y="240" width="160" height="280" fill="none" stroke="#68d391" stroke-width="2" stroke-dasharray="8 6" opacity="0.95"/>
  <rect x="700" y="280" width="140" height="240" fill="none" stroke="#fc8181" stroke-width="2" stroke-dasharray="8 6"/>
  <rect x="1050" y="260" width="150" height="260" fill="none" stroke="#f6e05e" stroke-width="2" stroke-dasharray="8 6"/>
  <text x="320" y="230" fill="#68d391" font-family="Consolas, monospace" font-size="16">THROUGH WALL</text>
  <text x="720" y="270" fill="#fc8181" font-family="Consolas, monospace" font-size="16">HOSTILE</text>
  <text x="1070" y="250" fill="#f6e05e" font-family="Consolas, monospace" font-size="16">TEAM</text>
  <text x="100" y="780" fill="#b8aea2" font-family="Segoe UI, Arial, sans-serif" font-size="20">Wallhack-style ESP boxes — toggle per category</text>`,
	);
}

function menuSvg() {
	return frame(
		'RUST CHEATS MENU',
		`
  <rect x="280" y="150" width="1040" height="620" rx="14" fill="url(#panel)" stroke="#c4784055" stroke-width="2"/>
  <rect x="280" y="150" width="240" height="620" rx="14" fill="#10151a"/>
  <text x="320" y="210" fill="#e08c48" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700">MENU</text>
  <text x="320" y="270" fill="#f2ebe3" font-family="Consolas, monospace" font-size="18">ESP</text>
  <text x="320" y="320" fill="#c47840" font-family="Consolas, monospace" font-size="18">› Aimbot</text>
  <text x="320" y="370" fill="#f2ebe3" font-family="Consolas, monospace" font-size="18">Radar</text>
  <text x="320" y="420" fill="#f2ebe3" font-family="Consolas, monospace" font-size="18">Misc</text>
  <text x="560" y="230" fill="#f2ebe3" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">Aimbot controls</text>
  <text x="560" y="300" fill="#b8aea2" font-family="Consolas, monospace" font-size="18">Enabled ............ ON</text>
  <text x="560" y="350" fill="#b8aea2" font-family="Consolas, monospace" font-size="18">FOV ................ 38</text>
  <text x="560" y="400" fill="#b8aea2" font-family="Consolas, monospace" font-size="18">Smooth ............. 24</text>
  <text x="560" y="450" fill="#b8aea2" font-family="Consolas, monospace" font-size="18">Bone ............... Head</text>`,
	);
}

function statusSvg() {
	return frame(
		'Enlisted Cheats STATUS',
		`
  <rect x="360" y="220" width="880" height="420" rx="16" fill="url(#panel)" stroke="#7a9e8a66" stroke-width="2"/>
  <circle cx="480" cy="360" r="48" fill="#1a2a22" stroke="#7a9e8a" stroke-width="3"/>
  <circle cx="480" cy="360" r="18" fill="#7a9e8a"/>
  <text x="560" y="340" fill="#f2ebe3" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="800">MAINTAINED</text>
  <text x="560" y="390" fill="#b8aea2" font-family="Segoe UI, Arial, sans-serif" font-size="22">EAC rebuild posted · check Updates</text>
  <text x="560" y="460" fill="#8f8578" font-family="Consolas, monospace" font-size="16">No permanent undetected guarantee</text>
  <text x="560" y="520" fill="#d4a574" font-family="Consolas, monospace" font-size="16">Enlisted Cheats · status panel</text>`,
	);
}

function radarSvg() {
	return frame(
		'RUST RADAR UI',
		`
  <circle cx="800" cy="470" r="280" fill="#0e1216" stroke="#c4784044" stroke-width="2"/>
  <circle cx="800" cy="470" r="180" fill="none" stroke="#c4784033" stroke-width="1"/>
  <circle cx="800" cy="470" r="90" fill="none" stroke="#c4784022" stroke-width="1"/>
  <circle cx="800" cy="470" r="6" fill="#e08c48"/>
  <circle cx="720" cy="360" r="7" fill="#fc8181"/>
  <circle cx="900" cy="400" r="7" fill="#fc8181"/>
  <circle cx="760" cy="560" r="7" fill="#68d391"/>
  <text x="120" y="200" fill="#f2ebe3" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">2D radar</text>
  <text x="120" y="250" fill="#b8aea2" font-family="Consolas, monospace" font-size="18">Range: 180m · Hostiles: 2</text>`,
	);
}

function softAimSvg() {
	return frame(
		'RUST SOFT AIM UI',
		`
  <rect x="120" y="160" width="1360" height="620" rx="12" fill="#0e1216" stroke="#c4784033"/>
  <path d="M500 470 Q 700 350 980 420" fill="none" stroke="#e08c48" stroke-width="3"/>
  <circle cx="500" cy="470" r="8" fill="#e08c48"/>
  <circle cx="980" cy="420" r="10" fill="none" stroke="#34d399" stroke-width="2"/>
  <text x="160" y="230" fill="#f2ebe3" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700">Soft aim curve</text>
  <text x="160" y="280" fill="#b8aea2" font-family="Consolas, monospace" font-size="18">Natural tracking · FOV limited · per-weapon profiles</text>`,
	);
}

function panelSvg() {
	return frame(
		'Enlisted Cheats PANEL',
		`
  <rect x="120" y="160" width="420" height="560" rx="12" fill="url(#panel)" stroke="#c4784044"/>
  <rect x="580" y="160" width="420" height="560" rx="12" fill="url(#panel)" stroke="#c4784044"/>
  <rect x="1040" y="160" width="420" height="560" rx="12" fill="url(#panel)" stroke="#c4784044"/>
  <text x="160" y="230" fill="#e08c48" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700">ESP</text>
  <text x="160" y="290" fill="#b8aea2" font-family="Consolas, monospace" font-size="16">Players · Loot · Distance</text>
  <text x="620" y="230" fill="#e08c48" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700">AIMBOT</text>
  <text x="620" y="290" fill="#b8aea2" font-family="Consolas, monospace" font-size="16">Smooth · FOV · Bones</text>
  <text x="1080" y="230" fill="#e08c48" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700">SETUP</text>
  <text x="1080" y="290" fill="#b8aea2" font-family="Consolas, monospace" font-size="16">License · Launch · Hotkeys</text>`,
	);
}

function dashboardSvg() {
	return frame(
		'RUST CHEATS DASHBOARD',
		`
  <rect x="80" y="120" width="1440" height="120" rx="10" fill="url(#panel)" stroke="#c4784033"/>
  <text x="120" y="190" fill="#f2ebe3" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">Enlisted Cheats dashboard</text>
  <text x="1100" y="190" fill="#7a9e8a" font-family="Consolas, monospace" font-size="18">ONLINE</text>
  <rect x="80" y="280" width="460" height="480" rx="12" fill="url(#panel)" stroke="#c4784033"/>
  <rect x="580" y="280" width="460" height="480" rx="12" fill="url(#panel)" stroke="#c4784033"/>
  <rect x="1080" y="280" width="440" height="480" rx="12" fill="url(#panel)" stroke="#c4784033"/>
  <text x="120" y="340" fill="#d4a574" font-family="Consolas, monospace" font-size="18">LICENSE</text>
  <text x="120" y="400" fill="#f2ebe3" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="700">Lifetime</text>
  <text x="620" y="340" fill="#d4a574" font-family="Consolas, monospace" font-size="18">MODULES</text>
  <text x="620" y="400" fill="#f2ebe3" font-family="Consolas, monospace" font-size="20">ESP · Aimbot · Radar</text>
  <text x="1120" y="340" fill="#d4a574" font-family="Consolas, monospace" font-size="18">UPDATES</text>
  <text x="1120" y="400" fill="#f2ebe3" font-family="Consolas, monospace" font-size="20">EAC sync ready</text>`,
	);
}

async function removeOldKeywordImages() {
	const files = await readdir(imagesDir).catch(() => []);
	const keep = new Set([
		...Object.keys(ASSETS),
		'zadeyo-logo.webp',
		'zadeyo-logo.png',
		'zadeyo-logo-full.webp',
	]);
	for (const file of files) {
		if (!file.endsWith('.webp') && !file.endsWith('.png')) continue;
		const base = file.replace(/-\d+w\.webp$/i, '.webp');
		const isVariant = /-\d+w\.webp$/i.test(file);
		const keepBase = keep.has(file) || keep.has(base) || (isVariant && keep.has(base));
		// Always remove old complex / scenery names
		const isLegacy =
			/battle-royale|zero-build|reboot|squad-fight|loadout|header-art|player-esp|cheats-hero|cheats-cover|cheats-package|cheats-aimbot|cheats-esp|cheats-logo/i.test(
				file,
			) ||
			(/^rust-/.test(file) && !keep.has(file) && !Object.keys(ASSETS).some((k) => file.startsWith(k.replace('.webp', ''))));
		if (isLegacy && !keep.has(file)) {
			await unlink(path.join(imagesDir, file));
			console.log(`Removed ${file}`);
		}
	}
}

async function writeWebp(file, svgFactory) {
	const svg = Buffer.from(svgFactory());
	const webp = await sharp(svg).resize(W, H).webp({ quality: 82, effort: 6 }).toBuffer();
	await writeFile(path.join(imagesDir, file), webp);
	console.log(`Wrote ${file} (${webp.length} bytes)`);
	return webp;
}

await mkdir(imagesDir, { recursive: true });
await removeOldKeywordImages();

let heroBuf = null;
for (const [file, factory] of Object.entries(ASSETS)) {
	if (!factory) continue;
	const buf = await writeWebp(file, factory);
	if (file === 'enlisted-cheats-hero.webp') heroBuf = buf;
}

if (heroBuf) {
	const logo = await sharp(heroBuf).extract({ left: 860, top: 140, width: 512, height: 512 }).resize(512, 512).webp({ quality: 88 }).toBuffer();
	await writeFile(path.join(imagesDir, 'enlisted-cheats-logo.webp'), logo);

	for (const { name, size } of [
		{ name: 'favicon-16x16.png', size: 16 },
		{ name: 'favicon-32x32.png', size: 32 },
		{ name: 'apple-touch-icon.png', size: 180 },
		{ name: 'favicon.png', size: 192 },
	]) {
		await writeFile(path.join(publicDir, name), await sharp(logo).resize(size, size).png().toBuffer());
	}
	await writeFile(path.join(publicDir, 'favicon.ico'), await sharp(logo).resize(32, 32).png().toBuffer());
	console.log('Wrote enlisted-cheats-logo.webp + favicons');
}

console.log('Done — cheat UI assets with simple hacks filenames.');
