/**
 * Site-wide SEO keyword cluster — optimized for enlistedcheats.org
 */
export const primaryKeyword = 'Enlisted Cheats';

export const siteBrand = 'Enlisted Cheats';
export const siteDomain = 'enlistedcheats.org';
export const siteOrigin = `https://${siteDomain}`;

/** Core keyword targets (title, meta, schema). */
export const metaKeywords = [
	'Enlisted Cheats',
	'enlisted cheats',
	'enlisted hacks',
	'enlisted cheat',
	'enlisted esp',
	'enlisted aimbot',
	'enlisted wallhack',
	'enlisted radar hack',
	'undetected enlisted cheats',
	'enlisted cheats 2026',
	'enlisted cheats pc',
	'enlisted soft aim',
	'enlisted mod menu',
	'buy enlisted cheats',
] as const;

export const metaKeywordsContent = metaKeywords.join(', ');

export const defaultTitle = 'Enlisted Cheats 2026 | ESP, Aimbot & Hacks for PC';
export const defaultDescription =
	'Enlisted cheats for Windows PC — ESP, aimbot, wallhack & radar. $35/mo or $150 lifetime. Setup guides, patch updates & buyer reviews.';

/** Append brand + domain to page titles when under the SEO limit. */
export function buildPageTitle(topic: string): string {
	const withBrand = `${topic} | Enlisted Cheats`;
	if (withBrand.length <= 60) return withBrand;
	const short = `${topic} | enlistedcheats.org`;
	return short.length <= 60 ? short : topic.slice(0, 60);
}

/** Clamp meta description with primary keyword near the front. */
export function buildPageDescription(body: string): string {
	const lead = body.trim();
	if (lead.toLowerCase().includes('enlisted')) return lead.slice(0, 160);
	return `Enlisted cheats — ${lead}`.slice(0, 160);
}
