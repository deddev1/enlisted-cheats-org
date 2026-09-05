import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { enlistedImages } from '../data/enlisted';

export interface ResponsiveWidth {
	src: string;
	width: number;
}

const publicImagesDir = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	'../../public/images',
);

/** Build a srcset string from width-tagged image paths. */
export function buildSrcSet(widths: ResponsiveWidth[]): string {
	return widths.map(({ src, width }) => `${src} ${width}w`).join(', ');
}

function parseWebpBase(baseSrc: string): { dir: string; name: string } | undefined {
	const match = baseSrc.match(/^(.+\/)(.+)\.webp$/i);
	if (!match) return undefined;

	const [, dir, name] = match;
	if (
		name.endsWith('-480w') ||
		name.endsWith('-640w') ||
		name.endsWith('-960w') ||
		name.endsWith('-1400w')
	) {
		return undefined;
	}

	return { dir, name };
}

function localImagePath(webPath: string): string | undefined {
	if (!webPath.startsWith('/images/')) return undefined;
	return path.join(publicImagesDir, webPath.slice('/images/'.length));
}

function variantWebPath(baseSrc: string, width: number): string {
	const parsed = parseWebpBase(baseSrc);
	if (!parsed) return baseSrc;
	return `${parsed.dir}${parsed.name}-${width}w.webp`;
}

function variantExists(baseSrc: string, width: number): boolean {
	const localPath = localImagePath(variantWebPath(baseSrc, width));
	return localPath ? existsSync(localPath) : false;
}

function masterExists(baseSrc: string): boolean {
	const localPath = localImagePath(baseSrc);
	return localPath ? existsSync(localPath) : false;
}

/** True for remote URLs (Supabase gameplay captures, etc.). */
export function isExternalImage(src: string): boolean {
	return /^https?:\/\//i.test(src);
}

/** Build srcset for content images that have responsive variants on disk. */
export function contentSrcSet(baseSrc: string): string | undefined {
	if (isExternalImage(baseSrc)) return undefined;

	const parsed = parseWebpBase(baseSrc);
	if (!parsed) return undefined;

	const variants = contentWidths
		.filter((width) => variantExists(baseSrc, width))
		.map((width) => ({
			src: variantWebPath(baseSrc, width),
			width,
		}));

	if (!variants.length) return undefined;
	return buildSrcSet(variants);
}

/**
 * Fallback `src` for responsive stills — use the largest existing variant,
 * otherwise the master file so small gameplay captures never 404.
 */
export function contentSrc(baseSrc: string): string {
	if (isExternalImage(baseSrc)) return baseSrc;

	const parsed = parseWebpBase(baseSrc);
	if (!parsed) return baseSrc;

	for (const width of [...contentWidths].reverse()) {
		if (variantExists(baseSrc, width)) {
			return variantWebPath(baseSrc, width);
		}
	}

	return masterExists(baseSrc) ? baseSrc : baseSrc;
}

export const heroResponsive: ResponsiveWidth[] = [
	{ src: '/images/enlisted-cheats-hero-480w.webp', width: 480 },
	{ src: '/images/enlisted-cheats-hero-640w.webp', width: 640 },
	{ src: '/images/enlisted-cheats-hero-960w.webp', width: 960 },
	{ src: '/images/enlisted-cheats-hero-1400w.webp', width: 1400 },
];

/** Desktop srcset (mobile uses a dedicated `<picture>` source — see Hero.astro). */
export const heroDesktopResponsive: ResponsiveWidth[] = heroResponsive.filter((v) => v.width >= 640);

/** Mobile-first fallback `src` — forced via `<picture>` so DPR cannot pull 960/1400. */
export const heroImageSrc = enlistedImages.hero;
export const heroIsExternal = heroImageSrc.startsWith('http');
export const heroSrc = heroIsExternal ? heroImageSrc : heroResponsive[0].src;
export const heroSrcSet = heroIsExternal ? undefined : buildSrcSet(heroDesktopResponsive);
export const heroSizes = '100vw';

/** Mobile LCP preload — only the 480w file (no imagesrcset upscaling). */
export const heroPreloadSrc = heroIsExternal ? heroImageSrc : heroResponsive[0].src;

/** Responsive widths for below-fold content images. */
export const contentWidths = [480, 640, 960] as const;

export const galleryFeaturedSizes = '(max-width: 560px) 100vw, (max-width: 900px) 90vw, 640px';
export const galleryTileSizes = '(max-width: 560px) 100vw, (max-width: 900px) 45vw, 320px';
export const productMainSizes = '(max-width: 900px) 100vw, 640px';
export const productThumbSizes = '160px';
