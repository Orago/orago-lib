import { rgbArray } from '../colors.js';
import { HexadecimalValue } from './hex.js';
export default class RgbColor {
    static isDark(rgb: rgbArray): boolean;
    static isLight(rgb: rgbArray): boolean;
    static inverted(rgb: rgbArray): rgbArray;
    static grayscale(rgb: rgbArray): rgbArray;
    static luminosity(rgb: rgbArray): number;
    static contrast(rgbOne: rgbArray, rgbTwo: rgbArray): number;
    static toDecimal(rgb: rgbArray): number;
    static toHex(rgb: rgbArray): HexadecimalValue;
    static toHue(rgb: rgbArray): number;
    static toHSL(rgb: rgbArray): any[];
}
