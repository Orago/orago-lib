import { rgbArray } from '../colors.js';
export default class DecimalColor {
    static fromRGB(rgb: rgbArray): number;
    static toRGB(decimal: number): rgbArray;
}
