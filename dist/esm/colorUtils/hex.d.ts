import { RgbArray } from "./rgb.js";
export type HexadecimalValue = string;
export default class HexColor {
    static toDecimal(hex: HexadecimalValue): number;
    static toRGB(hex: HexadecimalValue): RgbArray;
}
