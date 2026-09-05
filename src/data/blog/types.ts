import type { LocaleCode } from '../i18n/locales';

export type BlogImageKey =
	| 'hero'
	| 'espWallhack'
	| 'aimbotCombat'
	| 'squadFight'
	| 'headerArt'
	| 'cheatsPackage'
	| 'playerEsp'
	| 'rebootFight'
	| 'battleRoyaleCombat'
	| 'battleRoyaleIslandMap';

export type BlogSection = {
	h2: string;
	paragraphs: string[];
};

export type BlogTranslation = {
	slug: string;
	title: string;
	metaDescription: string;
	h1: string;
	intro: string;
	keywords: string[];
	imageAlt: string;
	sections: BlogSection[];
};

export type BlogPostDefinition = {
	id: string;
	imageKey: BlogImageKey;
	published: string;
	updated: string;
	category: string;
	featured?: boolean;
	/** Prefer full locale map; helpers clone `en` into any missing locales. */
	translations: Partial<Record<LocaleCode, BlogTranslation>> & { en: BlogTranslation };
};

export type ResolvedBlogPost = BlogPostDefinition & {
	locale: LocaleCode;
	translation: BlogTranslation;
	imageSrc: string;
	canonicalPath: string;
};
