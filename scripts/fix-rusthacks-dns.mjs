/**
 * Attach enlistedcheats.org to Worker islecheat and create DNS CNAMEs.
 * Uses wrangler OAuth token from local config.
 */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ACCOUNT_ID = '002527a31814aabc946cce93095ec7a5';
const ZONE_ID = '19b024cbc6f2e427a849d1b1af8b6fc7';
const SCRIPT = 'islecheat';
const TARGET = 'islecheat.notfaadi.workers.dev';
const DOMAINS = ['enlistedcheats.org', 'www.enlistedcheats.org'];

function getToken() {
	const configPath = join(
		process.env.XDG_CONFIG_HOME || join(homedir(), 'AppData', 'Roaming', 'xdg.config'),
		'.wrangler',
		'config',
		'default.toml',
	);
	const raw = readFileSync(configPath, 'utf8');
	const match = raw.match(/^oauth_token\s*=\s*"([^"]+)"/m);
	if (!match) throw new Error('No oauth_token — run: npx wrangler login');
	return match[1];
}

async function api(path, { method = 'GET', body } = {}) {
	const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
		method,
		headers: {
			Authorization: `Bearer ${getToken()}`,
			'Content-Type': 'application/json',
		},
		body: body ? JSON.stringify(body) : undefined,
	});
	const json = await res.json();
	return { status: res.status, json };
}

function logResult(label, json) {
	console.log(`\n=== ${label} ===`);
	if (!json.success) {
		console.log('FAILED:', JSON.stringify(json.errors ?? json, null, 2));
		return false;
	}
	console.log('OK');
	if (json.result) console.log(JSON.stringify(json.result, null, 2));
	return true;
}

async function listDns() {
	const { json } = await api(`/zones/${ZONE_ID}/dns_records?per_page=100`);
	console.log('\n=== Current DNS ===');
	console.log(
		JSON.stringify(
			{
				success: json.success,
				errors: json.errors,
				records: (json.result ?? []).map((r) => ({
					id: r.id,
					type: r.type,
					name: r.name,
					content: r.content,
					proxied: r.proxied,
				})),
			},
			null,
			2,
		),
	);
	return json.result ?? [];
}

async function ensureCname(name, content) {
	const fqdn = name.includes('.') ? name : `${name}.enlistedcheats.org`;
	const existing = await listDns();
	const hit = existing.find(
		(r) => r.name === fqdn || r.name === name || (name === '@' && r.name === 'enlistedcheats.org'),
	);
	if (hit) {
		if (hit.type === 'CNAME' && hit.content === content && hit.proxied) {
			console.log(`DNS OK already: ${hit.type} ${hit.name} -> ${hit.content}`);
			return;
		}
		console.log(`Updating DNS ${hit.name} (${hit.type} ${hit.content})...`);
		const { json } = await api(`/zones/${ZONE_ID}/dns_records/${hit.id}`, {
			method: 'PUT',
			body: { type: 'CNAME', name: hit.name, content, proxied: true, ttl: 1 },
		});
		logResult(`Update ${hit.name}`, json);
		return;
	}

	const recordName = name === 'enlistedcheats.org' || name === '@' ? 'enlistedcheats.org' : name;
	console.log(`Creating CNAME ${recordName} -> ${content}`);
	const { json } = await api(`/zones/${ZONE_ID}/dns_records`, {
		method: 'POST',
		body: { type: 'CNAME', name: recordName, content, proxied: true, ttl: 1 },
	});
	logResult(`Create ${recordName}`, json);
}

async function attachWorkerDomain(hostname) {
	// Workers custom domains API
	const { json: listed } = await api(
		`/accounts/${ACCOUNT_ID}/workers/domains?hostname=${encodeURIComponent(hostname)}`,
	);
	console.log(`\n=== Lookup worker domain ${hostname} ===`);
	console.log(JSON.stringify(listed, null, 2));

	const { json } = await api(`/accounts/${ACCOUNT_ID}/workers/domains`, {
		method: 'PUT',
		body: {
			hostname,
			service: SCRIPT,
			environment: 'production',
			zone_id: ZONE_ID,
		},
	});
	logResult(`Attach worker domain ${hostname}`, json);
}

async function main() {
	console.log('Worker live check target:', TARGET);
	console.log('Script:', SCRIPT);

	const { json: scripts } = await api(`/accounts/${ACCOUNT_ID}/workers/scripts`);
	console.log(
		'\n=== Scripts ===',
		(scripts.result ?? []).map((s) => s.id).join(', ') || JSON.stringify(scripts.errors),
	);

	await ensureCname('enlistedcheats.org', TARGET);
	await ensureCname('www', TARGET);

	for (const host of DOMAINS) {
		await attachWorkerDomain(host);
	}

	await listDns();

	const { json: domains } = await api(`/accounts/${ACCOUNT_ID}/workers/domains`);
	console.log('\n=== All worker domains ===');
	console.log(JSON.stringify(domains, null, 2));
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
