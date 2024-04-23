import { rgbArray } from '../colors.js';
import RgbColor from './rgb.js';

export default class DecimalColor {
	static fromRGB(rgb: rgbArray) { return RgbColor.toDecimal(rgb); }

	static toRGB(decimal: number): rgbArray {
		return [
			(decimal >> 16) & 255,
			(decimal >> 8) & 255,
			decimal & 255
		];
	}
}
