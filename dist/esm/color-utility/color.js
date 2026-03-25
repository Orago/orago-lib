import DecimalColor from "../color-utility/decimal.js";
import HexColor from "./hex.js";
import HslColor from "./hsl.js";
import RgbColor from "../color-utility/rgb.js";
export default class Color {
    value;
    constructor(value) {
        this.value = value;
    }
    static RGB = RgbColor;
    static HEX = HexColor;
    static HSL = HslColor;
    static Decimal = DecimalColor;
    static fromRGB(rgb) {
        return new Color(RgbColor.toDecimal(rgb));
    }
    static fromHex(hex) {
        return new Color(HexColor.toDecimal(hex));
    }
    _set(decimal) {
        this.value = decimal;
        return this;
    }
    red() {
        return DecimalColor.toRGB(this.value)[0];
    }
    green() {
        return DecimalColor.toRGB(this.value)[1];
    }
    blue() {
        return DecimalColor.toRGB(this.value)[2];
    }
    rgb() {
        return DecimalColor.toRGB(this.value);
    }
    hsl() {
        return RgbColor.toHSL(this.rgb());
    }
    hex() {
        return RgbColor.toHex(this.rgb());
    }
    invert() {
        return this._set(DecimalColor.fromRGB(RgbColor.inverted(this.rgb())));
    }
    grayscale() {
        return this._set(DecimalColor.fromRGB(RgbColor.grayscale(this.rgb())));
    }
    lighten(ratio) {
        const hsl = this.hsl();
        hsl[2] += hsl[2] * ratio;
        return this._set(DecimalColor.fromRGB(HslColor.toRGB(hsl)));
    }
    darken(ratio) {
        const hsl = this.hsl();
        hsl[2] -= hsl[2] * ratio;
        return this._set(DecimalColor.fromRGB(HslColor.toRGB(hsl)));
    }
    saturate(ratio) {
        const hsl = this.hsl();
        hsl[1] += hsl[1] * ratio;
        return this._set(DecimalColor.fromRGB(HslColor.toRGB(hsl)));
    }
    mix(color1, color2, weight) {
        return this._set(DecimalColor.fromRGB(HslColor.toRGB(RgbColor.mix(color1, color2, weight))));
    }
}
