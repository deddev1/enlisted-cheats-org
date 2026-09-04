export type GuideSection = {
	h2: string;
	paragraphs: string[];
};

export type ExternalGuidePost = {
	id: string;
	slug: string;
	gameId: string;
	gameName: string;
	externalUrl: string;
	anchorText: string;
	published: string;
	updated: string;
	title: string;
	metaDescription: string;
	h1: string;
	intro: string;
	keywords: string[];
	sections: GuideSection[];
};

export type ResolvedExternalGuide = ExternalGuidePost & {
	imageSrc: string;
	imageAlt: string;
	canonicalPath: string;
};
