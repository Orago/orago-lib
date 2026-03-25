"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decimal_js_1 = require("../color-utility/decimal.js");
const hex_js_1 = require("./hex.js");
const hsl_js_1 = require("./hsl.js");
const rgb_js_1 = require("../color-utility/rgb.js");
class Color {
    value;
    constructor(value) {
        this.value = value;
    }
    static RGB = rgb_js_1.default;
    static HEX = hex_js_1.default;
    static HSL = hsl_js_1.default;
    static Decimal = decimal_js_1.default;
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
exports.default = Color;
