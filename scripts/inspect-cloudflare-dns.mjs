/**
 * Inspect enlistedcheats.org zone DNS and Pages domain status.
 */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ACCOUNT_ID = '002527a31814aabc946cce93095ec7a5';
const PROJECT = 'rusthacks';

function getToken() {
  const configPath = join(
    process.env.XDG_CONFIG_HOME || join(homedir(), 'AppData', 'Roaming', 'xdg.config'),
    '.wrangler',
    'config',
    'default.toml',
  );
  const raw = readFileSync(configPath, 'utf8');
  const match = raw.match(/^oauth_token\s*=\s*"([^"]+)"/m);
  if (!match) throw new Error('No oauth_token in wrangler config');
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
  if (!json.success) {
    throw new Error(JSON.stringify(json.errors ?? json, null, 2));
  }
  return json.result;
}

async function main() {
  const zones = await api('/zones?name=enlistedcheats.org');
  console.log('Zone:', zones[0]?.id, zones[0]?.name, zones[0]?.status);

  if (zones[0]?.id) {
    const records = await api(`/zones/${zones[0].id}/dns_records`);
    console.log('\nDNS records:');
    if (!records.length) console.log('  (none)');
    for (const r of records) {
      console.log(`  ${r.type} ${r.name} -> ${r.content} (proxied=${r.proxied})`);
    }
  }

  const domains = await api(`/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/domains`);
  console.log('\nPages domains:');
  for (const d of domains) {
    console.log(JSON.stringify(d, null, 2));
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
