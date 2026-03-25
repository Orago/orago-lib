export const clamp = (value: number, min = -Infinity, max = Infinity): number =>
	Math.min(Math.max(value, min), max);

/**
 * Flips between two custom values (e.g., -1 and 1, or a and b) while looping through a range.
 * @param {number} input - The input value to map.
 * @param {number} [total=360] - The maximum value for the range.
 * @param {number} [min=-1] - The lower bound of the output range.
 * @param {number} [max=1] - The upper bound of the output range.
 * @returns {number} - The flipped and rotated output value.
 */
export function flipRotate(
	input: number,
	total: number = 360,
	min: number = -1,
	max: number = 1
): number {
	// Ensure input is non-negative and mapped into the [0, max] range
	if (input < 0) input = -input + total / 2;
	const normalized = (input % total) / (total / 2);
	const flipped = normalized <= 1 ? normalized : 2 - normalized;
	return min + flipped * (max - min);
}


/** Returns a random integer between two values */
export const random = (min: number = 0, max: number = 50): number =>
	Math.floor(Math.random() * (max + 1 - min) + min);

/** Returns the distance between two values */
export const difference = (first: number, second: number): number =>
	first - second > 0 ? first - second : (first - second) * -1;

/** Returns the radial distance between 4 values / 2 points */
export const getRadialDistance = (
	x1: number,
	y1: number,
	x2: number,
	y2: number
): number => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
