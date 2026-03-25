"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OraLib_Math = exports.twoPlaces = exports.flipRotate = exports.clamp = exports.getRadialDistance = exports.difference = exports.random = void 0;
const random = (min = 0, max = 50) => Math.floor(Math.random() * (max + 1 - min) + min);
exports.random = random;
const difference = (first, second) => first - second > 0 ? first - second : (first - second) * -1;
exports.difference = difference;
const getRadialDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
exports.getRadialDistance = getRadialDistance;
const clamp = (number, { min = -Infinity, max = Infinity } = {}) => Math.min(Math.max(number, min), max);
exports.clamp = clamp;
function flipRotate(input, max = 360, minValue = -1, maxValue = 1) {
    if (input < 0)
        input = -input + max / 2;
    const normalized = (input % max) / (max / 2);
    const flippedValue = normalized <= 1 ? normalized : 2 - normalized;
    const range = maxValue - minValue;
    return minValue + flippedValue * range;
}
exports.flipRotate = flipRotate;
const twoPlaces = (input) => Math.floor(input * 100) / 100;
exports.twoPlaces = twoPlaces;
class OraLib_Math {
    static random = exports.random;
    static difference = exports.difference;
    static getRadialDifference = exports.getRadialDistance;
    static clamp = exports.clamp;
    static flipRotate = flipRotate;
    static twoPlaces = exports.twoPlaces;
}
exports.OraLib_Math = OraLib_Math;
