import { rgbArray } from '../colors.js';
import HexColor, { HexadecimalValue } from './hex.js';
import RgbColor from './rgb.js';
export default class Color {
    value: number;
    constructor(value: number);
    static RGB: typeof RgbColor;
    static HEX: typeof HexColor;
    static fromRGB(rgb: rgbArray): Color;
    static fromHex(hex: HexadecimalValue): Color;
    red(): number;
    green(): number;
    blue(): number;
    rgb(): rgbArray;
    hsl(): any[];
    hex(): string;
    invert(): this;
    grayscale(): this;
}
