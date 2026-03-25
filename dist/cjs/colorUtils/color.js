"use strict";
// Using code from
// https://github.com/Qix-/color
// I was too tired to relearn half of this
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decimal_js_1 = __importDefault(require("./decimal.js"));
const hex_js_1 = __importDefault(require("./hex.js"));
const hsl_js_1 = __importDefault(require("./hsl.js"));
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
    _set(decimal) {
        this.value = decimal;
        return this;
    }
    red() {
        return decimal_js_1.default.toRGB(this.value)[0];
    }
    green() {
        return decimal_js_1.default.toRGB(this.value)[1];
    }
    blue() {
        return decimal_js_1.default.toRGB(this.value)[2];
    }
    rgb() {
        return decimal_js_1.default.toRGB(this.value);
    }
    hsl() {
        return rgb_js_1.default.toHSL(this.rgb());
    }
    hex() {
        return rgb_js_1.default.toHex(this.rgb());
    }
    invert() {
        return this._set(decimal_js_1.default.fromRGB(rgb_js_1.default.inverted(this.rgb())));
    }
    grayscale() {
        return this._set(decimal_js_1.default.fromRGB(rgb_js_1.default.grayscale(this.rgb())));
    }
    lighten(ratio) {
        const hsl = this.hsl();
        hsl[2] += hsl[2] * ratio;
        return this._set(decimal_js_1.default.fromRGB(hsl_js_1.default.toRGB(hsl)));
    }
    darken(ratio) {
        const hsl = this.hsl();
        hsl[2] -= hsl[2] * ratio;
        return this._set(decimal_js_1.default.fromRGB(hsl_js_1.default.toRGB(hsl)));
    }
    saturate(ratio) {
        const hsl = this.hsl();
        hsl[1] += hsl[1] * ratio;
        return this._set(decimal_js_1.default.fromRGB(hsl_js_1.default.toRGB(hsl)));
    }
    mix(color1, color2, weight) {
        return this._set(decimal_js_1.default.fromRGB(hsl_js_1.default.toRGB(rgb_js_1.default.mix(color1, color2, weight))));
    }
}
Color.RGB = rgb_js_1.default;
Color.HEX = hex_js_1.default;
Color.HSL = hsl_js_1.default;
Color.Decimal = decimal_js_1.default;
exports.default = Color;
