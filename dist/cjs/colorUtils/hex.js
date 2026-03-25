"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rgb_js_1 = __importDefault(require("./rgb.js"));
class HexColor {
    static toDecimal(hex) {
        return rgb_js_1.default.toDecimal(this.toRGB(hex));
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
exports.default = HexColor;
