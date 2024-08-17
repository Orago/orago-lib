import DecimalColor from './decimal.js';
import HexColor, { HexadecimalValue } from './hex.js';
import HslColor from './hsl.js';
import RgbColor, { RgbArray } from './rgb.js';
export default class Color {
    value: number;
    constructor(value: number);
    static RGB: typeof RgbColor;
    static HEX: typeof HexColor;
    static HSL: typeof HslColor;
    static Decimal: typeof DecimalColor;
    static fromRGB(rgb: RgbArray): Color;
    static fromHex(hex: HexadecimalValue): Color;
    _set(decimal: number): this;
    red(): number;
    green(): number;
    blue(): number;
    rgb(): RgbArray;
    hsl(): import("./hsl.js").HslArray;
    hex(): string;
    invert(): this;
    grayscale(): this;
    lighten(ratio: number): this;
    darken(ratio: number): this;
    saturate(ratio: number): this;
    mix(color1: RgbArray, color2: RgbArray, weight?: number): this;
}
