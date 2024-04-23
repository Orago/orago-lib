// Using code from
// https://github.com/Qix-/color
// I was too tired to relearn half of this

import { rgbArray } from '../colors.js';
import DecimalColor from './decimal.js';
import HexColor, { HexadecimalValue } from './hex.js';
import RgbColor from './rgb.js';


export default class Color {
	value: number;

	constructor(value: number) {
		this.value = value;
	}

	static RGB = RgbColor;
	static HEX = HexColor;

	static fromRGB (rgb: rgbArray){
		return new Color(RgbColor.toDecimal(rgb));
	}

	static fromHex (hex: HexadecimalValue){
		return new Color(HexColor.toDecimal(hex));
	}

	red() { return DecimalColor.toRGB(this.value)[0]; }
	green() { return DecimalColor.toRGB(this.value)[1]; }
	blue() { return DecimalColor.toRGB(this.value)[2]; }

	rgb() { return DecimalColor.toRGB(this.value); }
	hsl() { return RgbColor.toHSL(this.rgb()); }
	hex() { return RgbColor.toHex(this.rgb()); }

	invert() {
		this.value = DecimalColor.fromRGB(
			RgbColor.inverted(
				this.rgb()
			)
		);

		return this;
	}

	grayscale (){
		this.value = DecimalColor.fromRGB(
			RgbColor.grayscale(
				this.rgb()
			)
		);

		return this;
	}
}
