import { rgbArray } from '../colors.js';
import { HexadecimalValue } from './hex.js';

export default class RgbColor {
	static isDark(rgb: rgbArray): boolean {
		return 128 > (
			(
				rgb[0] * 2126 +
				rgb[1] * 7152 +
				rgb[2] * 722
			) / 10000
		);
	}

	static isLight(rgb: rgbArray): boolean {
		return this.isDark(rgb) != true;
	}

	static inverted(rgb: rgbArray): rgbArray {
		return <rgbArray>rgb.map(n => 255 - n);
	}

	static grayscale(rgb: rgbArray): rgbArray {
		const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;

		return [value, value, value];
	}

	static luminosity(rgb: rgbArray) {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		const lum = [];

		for (const [i, element] of rgb.entries()) {
			const chan = element / 255;

			lum[i] = (chan <= 0.04045) ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	}

	static contrast(rgbOne: rgbArray, rgbTwo: rgbArray): number {
		const lum1 = this.luminosity(rgbOne);
		const lum2 = this.luminosity(rgbTwo);

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	}

	static toDecimal(rgb: rgbArray): number {
		return rgb[0] << 16 | rgb[1] << 8 | rgb[2];
	}

	static toHex(rgb: rgbArray): HexadecimalValue {
		let [red, green, blue] = rgb;

		red = Math.max(0, Math.min(255, red));
		green = Math.max(0, Math.min(255, green));
		blue = Math.max(0, Math.min(255, blue));

		const redHex = red.toString(16).padStart(2, '0');
		const greenHex = green.toString(16).padStart(2, '0');
		const blueHex = blue.toString(16).padStart(2, '0');
		const hexColor = '#' + redHex + greenHex + blueHex;

		return hexColor.toUpperCase();
	}

	static toHue(rgb: rgbArray) {
		let [red, green, blue] = rgb;

		red /= 255;
		green /= 255;
		blue /= 255;

		let max = Math.max(red, green, blue);
		let min = Math.min(red, green, blue);
		let c = max - min;

		let hue: number = 0;
		let segment, shift;

		if (c == 0) {
			hue = 0;
		}
		else {
			switch (max) {
				case red:
					segment = (green - blue) / c;
					shift = 0 / 60; // R° / (360° / hex sides)
					if (segment < 0) { // hue > 180, full rotation
						shift = 360 / 60; // R° / (360° / hex sides)
					}
					hue = segment + shift;
					break;
				case green:
					segment = (blue - red) / c;
					shift = 120 / 60; // G° / (360° / hex sides)
					hue = segment + shift;
					break;
				case blue:
					segment = (red - green) / c;
					shift = 240 / 60; // B° / (360° / hex sides)
					hue = segment + shift;
					break;
			}
		}

		return hue * 60; // hue is in [0,6], scale it up
	}

	static toHSL(rgb: rgbArray){
		let [r, g, b] = rgb;

		// Normalize RGB values
		r /= 255;
		g /= 255;
		b /= 255;

		// Find maximum and minimum values
		let max = Math.max(r, g, b);
		let min = Math.min(r, g, b);
		let h: any, s, l = (max + min) / 2;

		if (max === min) {
			h = s = 0; // achromatic
		} else {
			let d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return [h, s, l];
	}
}
