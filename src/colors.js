// Define a mapping of word colors to their corresponding RGB values
class $A {
	static Full = 255;
	static Half = 128;
	static None = 0;
}

/**
 * @type {{[color: string]: rgbArray}}
 */
export const wordsToRgb = {
	red: [$A.Full, $A.None, $A.None],
	orange: [$A.Full, $A.Half, $A.None],
	yellow: [$A.Full, $A.Full, $A.None],
	lime: [$A.Half, $A.Full, $A.None],
	green: [$A.None, $A.Full, $A.None],
	aqua: [$A.None, $A.Full, $A.Half],
	cyan: [$A.None, $A.Full, $A.Full],
	azure: [$A.None, $A.Half, $A.Full],
	blue: [$A.None, $A.None, $A.Full],
	purple: [$A.Half, $A.None, $A.Full],
	violet: [$A.Full, $A.None, $A.Full],
	rose: [$A.Full, $A.None, $A.Half],

	black: [$A.None, $A.None, $A.None],
	gray: [$A.Half, $A.Half, $A.Half],
	white: [$A.Full, $A.Full, $A.Full],
	brown: [165, 42, 42]
	// Add more colors as needed
};

/**
 * @typedef {[
 *  red: number,
 *  green: number,
 *  blue: number
 * ]} rgbArray
 */

/** @type {rgbArray} */
export let rgbArray;

/**
 * Checks if an input is a valid wordColor
 * @param {string} input 
 * @returns {boolean}
 */
export function isWordColor(input) {
	return wordsToRgb.hasOwnProperty(input);
}

/** 
 * Checks if all items in an array match
 * Faster yet slightly different version of badlyColorImage
 * -
 * @param {string} input
 * @returns {[
 *  red: number,
 *  green: number,
 *  blue: number
 * ]}
 */
export function convertWordColorToRGB(input) {
	/* Convert the word color to lowercase for case-insensitive matching */
	const wordColor = (input + '').toLowerCase();

	/* Check if the word color exists in the color map */
	if (wordsToRgb.hasOwnProperty(wordColor)) {
		return wordsToRgb[wordColor];
	}
	else return [0, 0, 0];
}

/** 
 * Tests with regex whether a string fits a hex code with hashtag
 * @param {string} hexcode
 * @returns {boolean}
 */
export function isHexadecimal(hexcode) {
	// Regular expression to match hexadecimal color patterns: # followed by 3 or 6 hexadecimal digits
	// Check if the input matches the hexadecimal pattern
	return /^#([0-9a-fA-F]{3}){1,2}$/.test(hexcode);
}

/** 
 * Returns an rgb array based off a hex code string with hashtag
 * @param {string} hexColor
 * @returns {[
 *  red: number,
 *  green: number,
 *  blue: number
 * ]}
 */
export function convertHexToRGB(hexColor) {
	// Remove the "#" symbol if present
	const hex = hexColor.replace('#', '');

	// Split the hexadecimal color code into red, green, and blue components
	const red = parseInt(
		hex.substring(0, 2),
		16
	);

	const green = parseInt(
		hex.substring(2, 4),
		16
	);

	const blue = parseInt(
		hex.substring(4, 6),
		16
	);

	return [red, green, blue];
}


const rgbStringRegex =
	/^rgb\(\s*((1?[0-9]{1,2}|2([0-4][0-9]|5[0-5])),\s*){2}(1?[0-9]{1,2}|2([0-4][0-9]|5[0-5]))\s*\)$/;

/** 
 * Checks if a string is a css RGB code ('rgb(255, 255, 255)')
 * @param {string} rgbString
 * @returns {boolean}
 */
export function isRGB(rgbString) {
	// Regular expression to match RGB color patterns: rgb(x, y, z) where x, y, and z are integers between 0 and 255
	// Check if the input matches the RGB pattern
	return rgbStringRegex.test(rgbString);
}

/** 
 * Checks if a string is a css RGB code ('rgb(255, 255, 255)')
 * -
 * @param {string} input
 * @returns {rgbArray}
 */
export function getRGBValues(input) {
	/**
	 * Check if the input matches the RGB pattern
	 * Extract the RGB values from the input, then return the RGB values as an array
	 */
	if (isRGB(input)) {
		const matched = input
			.match(/\d+/g);

		if (Array.isArray(matched) && matched.length === 3) {
			const [
				r,
				g,
				b
			] = matched.map(Number);
			
			return [r, g, b];
		}

		return [0, 0, 0];
	}

	/* Return [0, 0, 0] for non-RGB colors */
	else return [0, 0, 0];
}

/**
 * Attempts to return an array of rgb color values
 * @param  {string | rgbArray} input 
 * @returns {rgbArray?}
 */
export function tryRgb(input) {

	/* If array of 3 */
	if (Array.isArray(input) && input.length === 3) {
		const [
			r = 0,
			g = 0,
			b = 0
		] = input;

		return [r, g, b];
	}

	/* Input is string type */
	else if (typeof input === 'string') {

		/* If Hexadecimal */
		if (isHexadecimal(input)) {
			return convertHexToRGB(input);
		}

		/* If Word Color */
		else if (isWordColor(input)) {
			return convertWordColorToRGB(input);
		}

		/* If RGB String */
		else if (
			typeof input === 'string' &&
			isRGB(input)
		) {
			return getRGBValues(input);
		}

	}

	return null;
}

/**
 * Always returns an array of rgb color values
 * @param  {string | [red: number, green: number, blue: number]} input 
 * @returns {rgbArray}
 */
export function forceRgb(input) {
	return tryRgb(input) ?? [0, 0, 0];
}

/**
 * @type {{[property: string]: rgbArray | null}}
 */
const cache = {

};

/**
 * 
 * @param {...any} inputs 
 * @returns {ReturnType<tryRgb>}
 */
export function tryRGB_Cached(inputs) {
	const stringified = JSON.stringify(inputs);

	return cache[stringified] ??= tryRgb(inputs);
}

/**
 * Converts RGB values to a Hue
 * @param {number} red Brightness
 * @param {number} green Brightness
 * @param {number} blue Brightness
 * @returns {number} Hue
 */
export function rgbToHue(red, green, blue) {
	red /= 255;
	green /= 255;
	blue /= 255;

	let max = Math.max(red, green, blue);
	let min = Math.min(red, green, blue);
	let c = max - min;

	/**
	 * @type {number}
	 */
	let hue = 0;
	let segment, shift;

	if (c == 0) {
		hue = 0;
	}
	else {
		switch (max) {
			case red:
				segment = (green - blue) / c;
				shift = 0 / 60;       // R° / (360° / hex sides)
				if (segment < 0) {    // hue > 180, full rotation
					shift = 360 / 60;   // R° / (360° / hex sides)
				}
				hue = segment + shift;
				break;
			case green:
				segment = (blue - red) / c;
				shift = 120 / 60;     // G° / (360° / hex sides)
				hue = segment + shift;
				break;
			case blue:
				segment = (red - green) / c;
				shift = 240 / 60;     // B° / (360° / hex sides)
				hue = segment + shift;
				break;
		}
	}

	return hue * 60; // hue is in [0,6], scale it up
}

/**
 * @param {string} str 
 * @returns {[
 *  red: number,
 *  green: number,
 *  blue: number
 * ]}
 */
export function stringToRGBArray(str) {
	// Simple hash function to generate a numeric hash code
	let hash = 0;

	str = str + '';

	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	/* Use bitwise AND with 0xFFFFFF to ensure it fits into an RGB range */
	const color = (hash & 0xFFFFFF).toString(16).toUpperCase();

	/* Pad the color string with zeros if it's less than 6 characters */
	const paddedColor = `000000${color}`.slice(-6);

	/* Split the color into RGB components */
	const r = parseInt(paddedColor.substring(0, 2), 16);
	const g = parseInt(paddedColor.substring(2, 4), 16);
	const b = parseInt(paddedColor.substring(4, 6), 16);

	return [r, g, b];
}