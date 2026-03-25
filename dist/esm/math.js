export const random = (min = 0, max = 50) => Math.floor(Math.random() * (max + 1 - min) + min);
export const difference = (first, second) => first - second > 0 ? first - second : (first - second) * -1;
export const getRadialDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
export const clamp = (number, { min = -Infinity, max = Infinity } = {}) => Math.min(Math.max(number, min), max);
export function flipRotate(input, max = 360, minValue = -1, maxValue = 1) {
    if (input < 0)
        input = -input + max / 2;
    const normalized = (input % max) / (max / 2);
    const flippedValue = normalized <= 1 ? normalized : 2 - normalized;
    const range = maxValue - minValue;
    return minValue + flippedValue * range;
}
export const twoPlaces = (input) => Math.floor(input * 100) / 100;
export class OraLib_Math {
    static random = random;
    static difference = difference;
    static getRadialDifference = getRadialDistance;
    static clamp = clamp;
    static flipRotate = flipRotate;
    static twoPlaces = twoPlaces;
}
