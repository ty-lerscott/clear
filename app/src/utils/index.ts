export { default as cn } from "./class-name";

export const kebabToTitleCase = (str: string) =>
	str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");

export const camelToSentenceCase = (text: string) => {
	const result = text.replace(/([A-Z])/g, " $1");
	return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
};
