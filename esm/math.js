export const random = (min = 0, max = 50) => Math.floor(Math.random() * (max + 1 - min) + min);
export const difference = (first, second) => first - second > 0 ? first - second : (first - second) * -1;
export const getRadialDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
export const clamp = (number, { min = -Infinity, max = Infinity } = {}) => Math.min(Math.max(number, min), max);
export function flipRotate(input, max = 360) {
    if (input < 0)
        input = -input + 180;
    const val = Math.floor((input % max / (max / 2)) * 100) / 100;
    const scaleForwards = (val <= .5 ? val : 1 - val) * 2;
    const scaleBackwards = (val <= 1.5 ? val - 1 : 1 - (val - 1)) * -2;
    return val <= 1 ? scaleForwards : scaleBackwards;
}
export const twoPlaces = (input) => Math.floor(input * 100) / 100;
