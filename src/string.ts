/**
 * a0 checks if string is anything a-z and 0-9
 * @deprecated
 */
export const a0 = (text: string): boolean =>
	text == undefined || /[^a-z0-9]/i.test(text);

/**
 * @deprecated
 */
export const isA0 = (text: string): boolean =>
	!(text == undefined || /[^a-z0-9]/i.test(text));

/**
 * Checks if a string contains only alphanumeric characters (a-z, 0-9).
 */
export function isAlphanumeric(text?: string): boolean {
	if (text == null) {
		return false;
	}
	return /^[a-z0-9]+$/i.test(text);
}

/** Makes the first letter uppercase */
export const caps = (text: string): string =>
	text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

export const toTitleCase = (str: string): string => str.replace(/\w\S*/g, caps);

const genCharacters: string =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const genCharLength: number = genCharacters.length;

export function genString(length: number): string {
	let result: string = "";

	for (let i = 0; i < length; i++) {
		result += genCharacters.charAt(
			Math.floor(Math.random() * genCharLength)
		);
	}

	return result;
}

export function joinPaths(parts: string[]): string {
	const mapped = parts
		.map((part, i) =>
			i === 0 ? part.replace(/\/+$/, "") : part.replace(/^\/+|\/+$/g, "")
		)
		.join("/");

	const segments: string[] = [];

	for (const part of mapped.split("/")) {
		if (part === "..") segments.pop();
		else if (part !== ".") segments.push(part);
	}
	return segments.join("/");
}
