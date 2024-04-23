export { default as Color } from './colorUtils/color.js';
export { default as DecimalUtil } from './colorUtils/decimal.js';
export { default as HexUtil } from './colorUtils/hex.js';
export { default as RgbUtil } from './colorUtils/rgb.js';
export type rgbArray = [
    red: number,
    green: number,
    blue: number
];
export declare const wordsToRgb: {
    [color: string]: rgbArray;
};
export declare function isWordColor(input: string): boolean;
export declare function convertWordColorToRGB(input: string): [
    red: number,
    green: number,
    blue: number
];
export declare function isHexadecimal(hexcode: string): boolean;
export declare function convertHexToRGB(hexColor: string): [
    red: number,
    green: number,
    blue: number
];
export declare function isRGB(rgbString: string): boolean;
export declare function getRGBValues(input: string): rgbArray;
export declare function tryRgb(input: string | rgbArray): rgbArray | null;
export declare function forceRgb(input: string | [red: number, green: number, blue: number]): rgbArray;
export declare function tryRGB_Cached(inputs: string | rgbArray): ReturnType<typeof tryRgb>;
export declare function rgbToHue(red: number, green: number, blue: number): number;
export declare function stringToRGBArray(str: string): [
    red: number,
    green: number,
    blue: number
];
