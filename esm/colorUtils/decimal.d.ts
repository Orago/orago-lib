import { RgbArray } from './rgb.js';
export default class DecimalColor {
    static fromRGB(rgb: RgbArray): number;
    static toRGB(decimal: number): RgbArray;
}
