#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const srcDir = path.join(root, 'src');

const IMAGE_RE = /\/images\/[a-zA-Z0-9._/-]+\.(?:webp|png|jpg|jpeg|svg)/g;

function walk(dir, files = []) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(full, files);
		else if (/\.(astro|ts|tsx|js|mjs|css|json)$/.test(entry.name)) files.push(full);
	}
	return files;
}

function collectReferences() {
	const refs = new Set();
	for (const file of walk(srcDir)) {
		const text = readFileSync(file, 'utf8');
		for (const match of text.matchAll(IMAGE_RE)) refs.add(match[0]);
	}
	return [...refs].sort();
}

function resolveLocal(webPath) {
	return path.join(publicDir, webPath.replace(/^\//, ''));
}

const refs = collectReferences();
const missing = [];
const ok = [];

for (const ref of refs) {
	const local = resolveLocal(ref);
	if (existsSync(local)) ok.push(ref);
	else missing.push(ref);
}

console.log(`Checked ${refs.length} local /images references`);
console.log(`OK: ${ok.length}`);
if (missing.length) {
	console.log(`MISSING: ${missing.length}`);
	for (const ref of missing) console.log(`  - ${ref}`);
	process.exit(1);
}

console.log('All referenced local images exist.');
