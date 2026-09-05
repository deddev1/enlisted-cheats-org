/**
 * Re-attach apex only and probe DNS write with clearer errors.
 */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ACCOUNT_ID = '002527a31814aabc946cce93095ec7a5';
const ZONE_ID = '19b024cbc6f2e427a849d1b1af8b6fc7';
const SCRIPT = 'islecheat';
const TARGET = 'islecheat.notfaadi.workers.dev';
const APEX_DOMAIN_ID = '6aed124334c270780b24750eff520820a11345ee';

function getToken() {
	const configPath = join(
		homedir(),
		'AppData',
		'Roaming',
		'xdg.config',
		'.wrangler',
		'config',
		'default.toml',
	);
	const raw = readFileSync(configPath, 'utf8');
	const match = raw.match(/^oauth_token\s*=\s*"([^"]+)"/m);
	if (!match) throw new Error('No oauth_token');
	return match[1];
}

async function api(path, opts = {}) {
	const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
		method: opts.method || 'GET',
		headers: {
			Authorization: `Bearer ${getToken()}`,
			'Content-Type': 'application/json',
		},
		body: opts.body ? JSON.stringify(opts.body) : undefined,
	});
	return { status: res.status, json: await res.json() };
}

async function main() {
	// Delete + recreate apex worker domain (forces DNS provisioning)
	console.log('Deleting apex worker domain...');
	let r = await api(`/accounts/${ACCOUNT_ID}/workers/domains/${APEX_DOMAIN_ID}`, {
		method: 'DELETE',
	});
	console.log(JSON.stringify(r.json, null, 2));

	console.log('Re-attaching apex...');
	r = await api(`/accounts/${ACCOUNT_ID}/workers/domains`, {
		method: 'PUT',
		body: {
			hostname: 'enlistedcheats.org',
			service: SCRIPT,
			environment: 'production',
			zone_id: ZONE_ID,
		},
	});
	console.log(JSON.stringify(r.json, null, 2));

	// Try DNS create again
	console.log('Trying DNS CNAME create...');
	r = await api(`/zones/${ZONE_ID}/dns_records`, {
		method: 'POST',
		body: {
			type: 'CNAME',
			name: '@',
			content: TARGET,
			proxied: true,
			ttl: 1,
		},
	});
	console.log(JSON.stringify(r.json, null, 2));

	r = await api(`/zones/${ZONE_ID}/dns_records`, {
		method: 'POST',
		body: {
			type: 'CNAME',
			name: 'enlistedcheats.org',
			content: TARGET,
			proxied: true,
			ttl: 1,
		},
	});
	console.log(JSON.stringify(r.json, null, 2));
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
