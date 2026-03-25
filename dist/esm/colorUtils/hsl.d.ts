import { RgbArray } from "./rgb.js";
export type HslArray = [hue: number, saturation: number, light: number];
export default class HslColor {
    static toRGB(hsl: HslArray): RgbArray;
}
