import { RgbArray } from "./rgb.js";

export type HslArray = [hue: number, saturation: number, light: number];

export default class HslColor {
	static toRGB(hsl: HslArray): RgbArray {
		const [h, s, l] = hsl;
		const a = s * Math.min(l, 1 - l);
		const f = (n: number, k = (n + h / 30) % 12) =>
			Math.floor((l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)) * 255);

		return [f(0), f(8), f(4)];
	}
}
