#!/usr/bin/env node
/**
 * Cloudflare Workers Builds entry point.
 * Finds the project root, installs dependencies, builds Astro to dist/, and validates output.
 */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function hasProjectFiles(dir) {
	return existsSync(join(dir, 'package.json')) && existsSync(join(dir, 'wrangler.toml'));
}

function findProjectRoot(startDir) {
	let dir = resolve(startDir);

	while (dir !== dirname(dir)) {
		if (hasProjectFiles(dir)) return dir;
		dir = dirname(dir);
	}

	dir = resolve(startDir);
	if (!existsSync(dir)) return null;

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
		const candidate = join(dir, entry.name);
		if (hasProjectFiles(candidate)) return candidate;
	}

	return null;
}

function listDir(dir) {
	try {
		return readdirSync(dir).join(', ');
	} catch {
		return '(unreadable)';
	}
}

const startDir = process.cwd();
const projectRoot = findProjectRoot(startDir);

if (!projectRoot) {
	console.error(`[cloudflare-build] Could not find package.json + wrangler.toml`);
	console.error(`[cloudflare-build] Started in: ${startDir}`);
	console.error(`[cloudflare-build] Contents: ${listDir(startDir)}`);
	console.error(
		'[cloudflare-build] Fix: Cloudflare Settings > Build > Root directory must be blank (repo root).',
	);
	console.error(
		'[cloudflare-build] Also verify the connected Git repo is notfaadi/theislehacks on branch main.',
	);
	process.exit(1);
}

if (projectRoot !== startDir) {
	console.log(`[cloudflare-build] Switching to project root: ${projectRoot}`);
	process.chdir(projectRoot);
}

console.log(`[cloudflare-build] Project root: ${projectRoot}`);
console.log('[cloudflare-build] Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

console.log('[cloudflare-build] Building site...');
execSync('npm run build', { stdio: 'inherit' });

if (!existsSync('dist/index.html')) {
	console.error('[cloudflare-build] dist/index.html was not created. Build failed.');
	process.exit(1);
}

console.log('[cloudflare-build] Build complete.');

const redirectsPath = 'dist/_redirects';
if (existsSync(redirectsPath)) {
	const seen = new Map();
	const redirectErrors = [];
	for (const [index, line] of readFileSync(redirectsPath, 'utf8').split('\n').entries()) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const [from, to] = trimmed.split(/\s+/);
		if (from === to) redirectErrors.push(`line ${index + 1}: self-redirect ${from}`);
		if (seen.has(from)) redirectErrors.push(`line ${index + 1}: duplicate ${from}`);
		else seen.set(from, index + 1);
	}
	if (redirectErrors.length) {
		console.error('[cloudflare-build] Invalid _redirects:');
		for (const error of redirectErrors) console.error(`  - ${error}`);
		process.exit(1);
	}
	console.log(`[cloudflare-build] Validated ${seen.size} redirect rules.`);
}

let buildId = 'unknown';
try {
	buildId = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
} catch {
	buildId = new Date().toISOString();
}

writeFileSync(
	'dist/build-version.json',
	JSON.stringify(
		{
			builtAt: new Date().toISOString(),
			commit: buildId,
			site: 'https://enlistedcheats.org',
		},
		null,
		2,
	) + '\n',
);
console.log(`[cloudflare-build] build-version.json → ${buildId}`);
