export const clamp = (value, min = -Infinity, max = Infinity) => Math.min(Math.max(value, min), max);
export function flipRotate(input, total = 360, min = -1, max = 1) {
    if (input < 0)
        input = -input + total / 2;
    const normalized = (input % total) / (total / 2);
    const flipped = normalized <= 1 ? normalized : 2 - normalized;
    return min + flipped * (max - min);
}
export const random = (min = 0, max = 50) => Math.floor(Math.random() * (max + 1 - min) + min);
export const difference = (first, second) => first - second > 0 ? first - second : (first - second) * -1;
export const getRadialDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
