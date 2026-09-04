/**
 * Retry Pages custom domain validation.
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
  for (const domain of DOMAINS) {
    console.log(`Retry validation for ${domain}...`);
    try {
      const result = await api(
        `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/domains/${domain}`,
        { method: 'PATCH', body: {} },
      );
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error(`  Error: ${err.message}`);
    }
  }
}

main();
