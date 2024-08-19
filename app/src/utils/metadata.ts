import pkg from "~/package.json";
import merge from "lodash.mergewith";
import type { Metadata } from "next";

const LOCAL_APP = process.env.NEXT_PUBLIC_APP_ENV === "development";
const LOCAL_DEV = process.env.NODE_ENV === "development";
const LOCAL_API = process.env.API_ENV === "development";
const PREVIEW_MODE = process.env.PREVIEW_MODE === "true";

const LOCAL_PREFIX = LOCAL_DEV
	? `${LOCAL_APP ? "🌑" : "🌕"}${LOCAL_API ? "⚪" : "🟢"}${PREVIEW_MODE ? "<👀" : ""} `
	: "";

const customMerge = (objValue: unknown, srcValue: unknown, key: string) => {
	// Check if we're dealing with the specific keys we want to merge
	if (["title", "siteName"].includes(key)) {
		// If both values are strings, concatenate them
		if (typeof objValue === "string" && typeof srcValue === "string") {
			return `${LOCAL_PREFIX}${srcValue}${objValue ? ` ${objValue}` : ""}`;
		}
	}
	return undefined;
};

const setMetadata = (metadata: Metadata): Metadata => {
	return merge(
		{},
		{
			title: "",
			keywords: "",
			description: "",
			creator: pkg.details.author.name,
			authors: [{ name: pkg.details.author.name }],
			metadataBase: `https://${pkg.details.hostname}.${LOCAL_APP ? "local" : "com"}`,
			alternates: {
				canonical: metadata?.alternates?.canonical || "/",
			},
			openGraph: {
				title: metadata.title,
				images: [],
				description: metadata.description,
				type: "website",
				locale: "en_US",
				logo: "/favicon.ico",
				siteName: "",
				url: metadata?.alternates?.canonical || "/",
			},
		},
		metadata,
		customMerge,
	);
};

export default setMetadata;
