import RgbColor from "./rgb.js";
export default class DecimalColor {
    static fromRGB(rgb) {
        return RgbColor.toDecimal(rgb);
    }
    static toRGB(decimal) {
        return [(decimal >> 16) & 255, (decimal >> 8) & 255, decimal & 255];
    }
}
