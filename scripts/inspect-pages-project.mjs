/**
 * Inspect Cloudflare Pages project source/build config and domain status.
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

async function api(path) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const json = await res.json();
  if (!json.success) throw new Error(JSON.stringify(json.errors ?? json));
  return json.result;
}

async function main() {
  const project = await api(`/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}`);
  console.log('Project:', JSON.stringify({
    name: project.name,
    subdomain: project.subdomain,
    production_branch: project.production_branch,
    source: project.source,
    build_config: project.build_config,
    deployment_configs: project.deployment_configs,
    latest_deployment: project.latest_deployment?.url,
  }, null, 2));

  const domains = await api(`/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/domains`);
  console.log('\nDomains:', JSON.stringify(domains, null, 2));
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
