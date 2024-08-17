import { RgbArray } from './rgb.js';
import RgbColor from './rgb.js';

export default class DecimalColor {
	static fromRGB(rgb: RgbArray) {
		return RgbColor.toDecimal(rgb);
	}

	static toRGB(decimal: number): RgbArray {
		return [
			(decimal >> 16) & 255,
			(decimal >> 8) & 255,
			decimal & 255
		];
	}
}
