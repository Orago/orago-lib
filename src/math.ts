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
): number =>
	Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export const clamp = (number: number, { min = -Infinity, max = Infinity }: { min?: number; max?: number; } = {}): number =>
	Math.min(Math.max(number, min), max);

/**
 * Acts similar to the % (remainder) operator but instead of resetting,
 * it starts subtracting until it reaches the opposite maximum value and restarts again at the middle
 */
export function flipRotate(input: number, max: number = 360): number {
	if (input < 0) input = -input + 180;

	const val = Math.floor((input % max / (max / 2)) * 100) / 100;
	const scaleForwards = (val <= .5 ? val : 1 - val) * 2;
	const scaleBackwards = (val <= 1.5 ? val - 1 : 1 - (val - 1)) * -2;

	return val <= 1 ? scaleForwards : scaleBackwards;
}

/** Rounds to the nearest two places */
export const twoPlaces = (input: number): number => Math.floor(input * 100) / 100;