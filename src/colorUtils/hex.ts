import { RgbArray } from './rgb.js';
import RgbColor from './rgb.js';

export type HexadecimalValue = string;

export default class HexColor {
	static toDecimal(hex: HexadecimalValue): number {
		return RgbColor.toDecimal(this.toRGB(hex));
	}

	static toRGB(hex: HexadecimalValue): RgbArray {
		// Remove '#' if present
		hex = hex.replace(/^#/, '');

		// Expand shortened hexadecimal color codes
		if (hex.length === 3) {
			hex = hex.replace(/(.)/g, '$1$1');
		}

		return <[number, number, number]>[
			parseInt(hex.substring(0, 2), 16),
			parseInt(hex.substring(2, 4), 16),
			parseInt(hex.substring(4, 6), 16),
		];
	}
}