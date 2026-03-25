import RgbColor from "./rgb.js";
export default class HexColor {
    static toDecimal(hex) {
        return RgbColor.toDecimal(this.toRGB(hex));
    }
    static toRGB(hex) {
        // Remove '#' if present
        hex = hex.replace(/^#/, "");
        // Expand shortened hexadecimal color codes
        if (hex.length === 3) {
            hex = hex.replace(/(.)/g, "$1$1");
        }
        return [
            parseInt(hex.substring(0, 2), 16),
            parseInt(hex.substring(2, 4), 16),
            parseInt(hex.substring(4, 6), 16),
        ];
    }
}
