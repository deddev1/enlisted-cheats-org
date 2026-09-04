/**
 * Attach custom domains to the rusthacks Pages project using wrangler OAuth credentials.
 * Run: node scripts/add-pages-domains.mjs
 */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ACCOUNT_ID = '002527a31814aabc946cce93095ec7a5';
const PROJECT = 'rusthacks';
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
  if (!match) throw new Error('No oauth_token in wrangler config. Run: wrangler login');
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

async function listDomains() {
  return api(`/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/domains`);
}

async function addDomain(name) {
  return api(`/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/domains`, {
    method: 'POST',
    body: { name },
  });
}

async function main() {
  console.log('Existing domains:');
  const existing = await listDomains();
  for (const d of existing) console.log(`  - ${d.name} (${d.status ?? 'unknown'})`);

  for (const domain of DOMAINS) {
    if (existing.some((d) => d.name === domain)) {
      console.log(`Skip ${domain} — already attached`);
      continue;
    }
    console.log(`Adding ${domain}...`);
    const result = await addDomain(domain);
    console.log(`  OK: ${result.name} status=${result.status ?? 'pending'}`);
  }

  console.log('\nFinal domains:');
  const final = await listDomains();
  for (const d of final) console.log(`  - ${d.name} (${d.status ?? 'unknown'})`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
