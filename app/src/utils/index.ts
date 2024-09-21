export { default as cn } from "./class-name";

export const kebabToTitleCase = (str: string) =>
	str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
