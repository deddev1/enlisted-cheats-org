import { onRequest } from './functions/_middleware.js';

/**
 * Cloudflare Workers entry — runs edge middleware (HTTPS/www/legacy redirects,
 * path redirects, locale detection, security headers) before static assets.
 */
export default {
	async fetch(request, env) {
		return onRequest({
			request,
			next: () => env.ASSETS.fetch(request),
		});
	},
};
