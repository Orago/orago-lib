"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rgb_js_1 = __importDefault(require("./rgb.js"));
class DecimalColor {
    static fromRGB(rgb) { return rgb_js_1.default.toDecimal(rgb); }
    static toRGB(decimal) {
        return [
            (decimal >> 16) & 255,
            (decimal >> 8) & 255,
            decimal & 255
        ];
    }
}
exports.default = DecimalColor;
