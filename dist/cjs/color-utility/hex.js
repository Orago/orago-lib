"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rgb_js_1 = require("./rgb.js");
class HexColor {
    static toDecimal(hex) {
        return rgb_js_1.default.toDecimal(this.toRGB(hex));
    }
    static toRGB(hex) {
        hex = hex.replace(/^#/, "");
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
exports.default = HexColor;
