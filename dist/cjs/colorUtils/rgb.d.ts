import { HexadecimalValue } from "./hex.js";
import { HslArray } from "./hsl.js";
export type RgbArray = [red: number, green: number, blue: number];
export default class RgbColor {
    static isDark(rgb: RgbArray): boolean;
    static isLight(rgb: RgbArray): boolean;
    static inverted(rgb: RgbArray): RgbArray;
    static grayscale(rgb: RgbArray): RgbArray;
    static luminosity(rgb: RgbArray): number;
    static contrast(rgbOne: RgbArray, rgbTwo: RgbArray): number;
    static toDecimal(rgb: RgbArray): number;
    static toHex(rgb: RgbArray): HexadecimalValue;
    static toHue(rgb: RgbArray): number;
    static toHSL(rgb: RgbArray): HslArray;
    static mix(color1: RgbArray, color2: RgbArray, weight?: number): RgbArray;
}
