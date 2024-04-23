"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decimal_js_1 = __importDefault(require("./decimal.js"));
const hex_js_1 = __importDefault(require("./hex.js"));
const rgb_js_1 = __importDefault(require("./rgb.js"));
class Color {
    constructor(value) {
        this.value = value;
    }
    static fromRGB(rgb) {
        return new Color(rgb_js_1.default.toDecimal(rgb));
    }
    static fromHex(hex) {
        return new Color(hex_js_1.default.toDecimal(hex));
    }
    red() { return decimal_js_1.default.toRGB(this.value)[0]; }
    green() { return decimal_js_1.default.toRGB(this.value)[1]; }
    blue() { return decimal_js_1.default.toRGB(this.value)[2]; }
    rgb() { return decimal_js_1.default.toRGB(this.value); }
    hsl() { return rgb_js_1.default.toHSL(this.rgb()); }
    hex() { return rgb_js_1.default.toHex(this.rgb()); }
    invert() {
        this.value = decimal_js_1.default.fromRGB(rgb_js_1.default.inverted(this.rgb()));
        return this;
    }
    grayscale() {
        this.value = decimal_js_1.default.fromRGB(rgb_js_1.default.grayscale(this.rgb()));
        return this;
    }
}
Color.RGB = rgb_js_1.default;
Color.HEX = hex_js_1.default;
exports.default = Color;
