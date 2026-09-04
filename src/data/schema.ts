/** Page-specific FAQ clusters for FAQ rich results on pillar landing pages. */
export const pageFaqClusters: Partial<
	Record<import('./i18n/routing').PageId, ReadonlyArray<{ question: string; answer: string }>>
> = {
	hacks: [
		{
			question: 'What are Enlisted cheats?',
			answer:
				'Enlisted cheats are Windows PC tools for Enlisted with ESP, wallhack, and aimbot controls. Enlisted Cheats licenses include anti-cheat maintenance updates and setup support.',
		},
		{
			question: 'Are Enlisted cheats permanently undetected?',
			answer:
				'No package can promise that. We rebuild after anti-cheat and game patches and post status on Updates. Check there before you load in.',
		},
		{
			question: 'What is included in the Enlisted Cheats package?',
			answer:
				'Enemy ESP, medkit markers, radar cues, and configurable aimbot in one license. See Features, ESP, and Aimbot for control detail.',
		},
	],
	'enlisted-esp': [
		{
			question: 'What is a Enlisted wallhack?',
			answer:
				'A Enlisted wallhack is an ESP overlay that shows enemy units and enemy vehicles, heavy attacks, and loot through cover. Enlisted Cheats wallhack includes distance readouts, team colours, and toggleable categories for campaign missions and large-scale battles.',
		},
		{
			question: 'Does Enlisted Cheats include a radar hack?',
			answer:
				'Yes. Enlisted Cheats includes 2D radar-style overlays that highlight nearby threats outside your direct view — useful for reading flanks during team pushes.',
		},
		{
			question: 'Does this fit campaign missions and large-scale battles runs?',
			answer:
				'Yes. ESP and radar help you read nearby enemies and loot; aimbot covers the firefight. Tuned for solo and team push play.',
		},
	],
	'enlisted-aimbot': [
		{
			question: 'What is Enlisted aimbot?',
			answer:
				'Enlisted aimbot is configurable aim assist with smoothness, FOV, and bone priority controls. It ships bundled with ESP and radar in the Enlisted Cheats license for Windows PC.',
		},
		{
			question: 'Can I use Enlisted aimbot with a controller?',
			answer:
				'Yes. Enlisted Cheats supports controller play on Windows PC. Tune FOV and smoothness per weapon profile after setup.',
		},
		{
			question: 'Are Enlisted cheats permanently undetected?',
			answer:
				'No package can promise that. We rebuild after anti-cheat and game patches and post status on Updates. Check there before you load in.',
		},
	],
	pricing: [
		{
			question: 'How are Enlisted Cheats licenses delivered?',
			answer:
				'Digitally after payment confirmation. Timing can vary by payment method — keep your order confirmation if you contact support.',
		},
		{
			question: 'What does the $35/month plan include?',
			answer:
				'The monthly license includes ESP, wallhack overlays, radar, and aimbot controls with anti-cheat maintenance updates for Enlisted on Windows PC.',
		},
		{
			question: 'Is the $150 lifetime license worth it?',
			answer:
				'Lifetime pays off if you play Enlisted across multiple seasons. It includes the same feature stack as monthly with long-term maintenance after patches.',
		},
	],
	features: [
		{
			question: 'What is included in Enlisted Cheats?',
			answer:
				'Enemy ESP, medkit markers, radar cues, and configurable aimbot in one license. See Features, ESP, and Aimbot for control detail.',
		},
		{
			question: 'Does Enlisted Cheats work on Windows PC?',
			answer:
				'Yes — Enlisted Cheats is built for Enlisted on Windows 10 and 11 with in-client toggles for ESP, radar, and aimbot.',
		},
		{
			question: 'How does anti-cheat affect Enlisted Cheats?',
			answer:
				'Anti-cheat monitors Enlisted on Windows PC. Enlisted Cheats publishes maintenance notes after patches that may require a rebuild. Read the maintenance guide page for how updates are handled.',
		},
	],
};

import { productInfo, siteConfig } from './site';
import type { PageId } from './i18n/routing';

const priceValidUntil = '2027-12-31';

/** Plain text for FAQ rich results — schema.org Answer.text must not contain HTML. */
function stripHtml(html: string): string {
	return html
		.replace(/<[^>]+>/g, '')
		.replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export function buildAggregateOffer(canonicalURL: string) {
	return {
		'@type': 'AggregateOffer',
		lowPrice: Math.min(...productInfo.plans.map((p) => p.price)).toFixed(2),
		highPrice: Math.max(...productInfo.plans.map((p) => p.price)).toFixed(2),
		priceCurrency: productInfo.currency,
		offerCount: productInfo.plans.length,
		url: canonicalURL,
		offers: productInfo.plans.map((plan) => ({
			'@type': 'Offer',
			name: `${productInfo.name} ${plan.label}`,
			price: plan.price.toFixed(2),
			priceCurrency: productInfo.currency,
			priceValidUntil,
			availability: 'https://schema.org/InStock',
			url: siteConfig.checkoutUrl,
			seller: { '@id': `${siteConfig.url}/#organization` },
		})),
	};
}

export function buildSoftwareApplicationSchema(canonicalURL: string, heroImage: string) {
	return {
		'@type': 'SoftwareApplication',
		'@id': `${canonicalURL}#software`,
		name: productInfo.name,
		applicationCategory: 'GameApplication',
		operatingSystem: 'Windows',
		description: productInfo.summary,
		url: canonicalURL,
		image: heroImage,
		brand: { '@type': 'Brand', name: productInfo.brand },
		offers: buildAggregateOffer(canonicalURL),
	};
}

export function buildFaqSchemaNode(
	canonicalURL: string,
	faqs: ReadonlyArray<{ question: string; answer: string }>,
) {
	return {
		'@type': 'FAQPage',
		'@id': `${canonicalURL}#faq`,
		mainEntity: faqs.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.answer) },
		})),
	};
}

const schemaRichPages = new Set<PageId>([
	'hacks',
	'enlisted-esp',
	'enlisted-aimbot',
	'pricing',
	'features',
	'faq',
]);

export function buildPageExtraGraph(
	pageId: PageId,
	canonicalURL: string,
	heroImage: string,
	allFaqs: ReadonlyArray<{ question: string; answer: string }>,
): Record<string, unknown>[] {
	if (!schemaRichPages.has(pageId)) return [];

	const nodes: Record<string, unknown>[] = [];

	if (pageId !== 'faq') {
		nodes.push(buildSoftwareApplicationSchema(canonicalURL, heroImage));
	}

	const faqs = pageId === 'faq' ? allFaqs : (pageFaqClusters[pageId] ?? []);
	if (faqs.length > 0) {
		nodes.push(buildFaqSchemaNode(canonicalURL, faqs));
	}

	return nodes;
}
