import DecimalColor from './decimal.js';
import HexColor from './hex.js';
import RgbColor from './rgb.js';
class Color {
    constructor(value) {
        this.value = value;
    }
    static fromRGB(rgb) {
        return new Color(RgbColor.toDecimal(rgb));
    }
    static fromHex(hex) {
        return new Color(HexColor.toDecimal(hex));
    }
    red() { return DecimalColor.toRGB(this.value)[0]; }
    green() { return DecimalColor.toRGB(this.value)[1]; }
    blue() { return DecimalColor.toRGB(this.value)[2]; }
    rgb() { return DecimalColor.toRGB(this.value); }
    hsl() { return RgbColor.toHSL(this.rgb()); }
    hex() { return RgbColor.toHex(this.rgb()); }
    invert() {
        this.value = DecimalColor.fromRGB(RgbColor.inverted(this.rgb()));
        return this;
    }
    grayscale() {
        this.value = DecimalColor.fromRGB(RgbColor.grayscale(this.rgb()));
        return this;
    }
}
Color.RGB = RgbColor;
Color.HEX = HexColor;
export default Color;
