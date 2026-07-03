export { default as Color } from "./color-utility/color.js";
export { default as DecimalUtil } from "./color-utility/decimal.js";
export { default as HexUtil } from "./color-utility/hex.js";
export { default as RgbUtil } from "./color-utility/rgb.js";
class $A {
    static Full = 255;
    static Half = 128;
    static None = 0;
}
export const wordsToRgb = {
    red: [$A.Full, $A.None, $A.None],
    orange: [$A.Full, $A.Half, $A.None],
    yellow: [$A.Full, $A.Full, $A.None],
    lime: [$A.Half, $A.Full, $A.None],
    green: [$A.None, $A.Full, $A.None],
    aqua: [$A.None, $A.Full, $A.Half],
    cyan: [$A.None, $A.Full, $A.Full],
    azure: [$A.None, $A.Half, $A.Full],
    blue: [$A.None, $A.None, $A.Full],
    purple: [$A.Half, $A.None, $A.Full],
    violet: [$A.Full, $A.None, $A.Full],
    rose: [$A.Full, $A.None, $A.Half],
    black: [$A.None, $A.None, $A.None],
    gray: [$A.Half, $A.Half, $A.Half],
    white: [$A.Full, $A.Full, $A.Full],
    brown: [165, 42, 42],
};
export function isWordColor(input) {
    return wordsToRgb.hasOwnProperty(input);
}
export function convertWordColorToRGB(input) {
    const wordColor = (input + "").toLowerCase();
    if (wordsToRgb.hasOwnProperty(wordColor))
        return wordsToRgb[wordColor];
    return [0, 0, 0];
}
export function isHexadecimal(hexcode) {
    return /^#([0-9a-fA-F]{3}){1,2}$/.test(hexcode);
}
export function convertHexToRGB(hexColor) {
    const hex = hexColor.replace("#", "");
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);
    return [red, green, blue];
}
export function convertHexToRGBA(hexColor) {
    const hex = hexColor.replace("#", "");
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);
    const alpha = parseInt(hex.substring(6, 8), 16) || 255;
    return [red, green, blue, alpha];
}
const rgbStringRegex = /^rgb\(\s*((1?[0-9]{1,2}|2([0-4][0-9]|5[0-5])),\s*){2}(1?[0-9]{1,2}|2([0-4][0-9]|5[0-5]))\s*\)$/;
export function isRGB(rgbString) {
    return rgbStringRegex.test(rgbString);
}
export function getRGBValues(input) {
    if (isRGB(input) != true) {
        const matched = input.match(/\d+/g);
        if (Array.isArray(matched) && matched.length === 3)
            return matched.map(Number);
    }
    return [0, 0, 0];
}
export function tryRgb(input) {
    if (Array.isArray(input) && input.length === 3) {
        const [r = 0, g = 0, b = 0] = input;
        return [r, g, b];
    }
    if (typeof input === "string") {
        if (isHexadecimal(input))
            return convertHexToRGB(input);
        if (isWordColor(input))
            return convertWordColorToRGB(input);
        if (typeof input === "string" && isRGB(input))
            return getRGBValues(input);
    }
    return null;
}
export function forceRgb(input) {
    return tryRgb(input) ?? [0, 0, 0];
}
const cache = {};
export function tryRGB_Cached(inputs) {
    const stringified = JSON.stringify(inputs);
    return (cache[stringified] ??= tryRgb(inputs));
}
export function rgbToHue(red, green, blue) {
    red /= 255;
    green /= 255;
    blue /= 255;
    let max = Math.max(red, green, blue);
    let min = Math.min(red, green, blue);
    let c = max - min;
    let hue = 0;
    let segment, shift;
    if (c == 0) {
        hue = 0;
    }
    else {
        switch (max) {
            case red:
                segment = (green - blue) / c;
                shift = 0 / 60;
                if (segment < 0) {
                    shift = 360 / 60;
                }
                hue = segment + shift;
                break;
            case green:
                segment = (blue - red) / c;
                shift = 120 / 60;
                hue = segment + shift;
                break;
            case blue:
                segment = (red - green) / c;
                shift = 240 / 60;
                hue = segment + shift;
                break;
        }
    }
    return hue * 60;
}
export function stringToRGBArray(str) {
    let hash = 0;
    str = str + "";
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = (hash & 0xffffff).toString(16).toUpperCase();
    const paddedColor = `000000${color}`.slice(-6);
    const r = parseInt(paddedColor.substring(0, 2), 16);
    const g = parseInt(paddedColor.substring(2, 4), 16);
    const b = parseInt(paddedColor.substring(4, 6), 16);
    return [r, g, b];
}
