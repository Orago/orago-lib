"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rgb_js_1 = require("./rgb.js");
class DecimalColor {
    static fromRGB(rgb) {
        return rgb_js_1.default.toDecimal(rgb);
    }
    static toRGB(decimal) {
        return [(decimal >> 16) & 255, (decimal >> 8) & 255, decimal & 255];
    }
}
exports.default = DecimalColor;
