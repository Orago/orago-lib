/**
 * Returns a random integer between two values
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export const random = ( min = 0, max = 50 ) =>
	Math.floor( Math.random() * ( max + 1 - min ) + min );

/**
 * Returns the distance between two values
 * @param {number} first 
 * @param {number} second 
 * @returns {number}
 */
export const difference = (first, second) =>
	first - second > 0 ? first - second : (first - second) * -1;

/**
 * Returns the radial distance between 4 values / 2 points
 * @param {number} x1 Point 1
 * @param {number} y1 Point 1
 * @param {number} x2 Point 2
 * @param {number} y2 Point 2
 * @returns {number}
 */
export const getRadialDistance = (x1, y1, x2, y2) =>
	Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

/**
 * 
 * @param {number} number Input
 * @param {object} param1 and Maximum values
 * @param {number} [param1.min]
 * @param {number} [param1.max]
 * @returns {number}
 */
export const clamp = (number, { min = -Infinity, max = Infinity } = {}) =>
	Math.min(Math.max(number, min), max);

/**
 * Acts similar to the % (remainder) operator but instead of resetting,
 * it starts subtracting until it reaches the opposite maximum value and restarts again at the middle
 * @param {number} input 
 * @param {number} [max]
 * @returns {number}
 */
export function flipRotate (input, max = 360) {
	if (input < 0) input = -input + 180;

	const val = Math.floor((input % max / (max / 2)) * 100) / 100;
	const scaleForwards = (val <= .5 ? val : 1 - val) * 2;
	const scaleBackwards = (val <= 1.5 ? val - 1 : 1 - (val - 1)) * -2;

	return val <= 1 ? scaleForwards : scaleBackwards;
}

/**
 * Rounds to the nearest two places
 * @param {number} input 
 * @returns {number}
 */
export const twoPlaces = input => Math.floor(input * 100) / 100;