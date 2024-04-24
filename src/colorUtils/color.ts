// Using code from
// https://github.com/Qix-/color
// I was too tired to relearn half of this

import DecimalColor from './decimal.js';
import HexColor, { HexadecimalValue } from './hex.js';
import HslColor from './hsl.js';
import RgbColor, { RgbArray } from './rgb.js';

enum colorTypes {
	RGB,
	HSL,
	HEX,
	Decimal,
}

const neighborsTo = {
	[colorTypes.RGB]: [colorTypes.HSL, colorTypes.HEX, colorTypes.Decimal],
	[colorTypes.HSL]: [colorTypes.RGB],
	[colorTypes.HEX]: [colorTypes.RGB],
	[colorTypes.Decimal]: [colorTypes.RGB],
}


type ColorFormat = 'rgb' | 'hsl' | 'hex' | 'decimal';

const formatMap = {
	rgb: colorTypes.RGB,
	hsl: colorTypes.HSL,
	hex: colorTypes.HEX,
	decimal: colorTypes.Decimal
}

export default class Color {
	value: number;

	constructor(value: number) {
		this.value = value;
	}

	static RGB = RgbColor;
	static HEX = HexColor;


	static fromRGB(rgb: RgbArray) {
		return new Color(RgbColor.toDecimal(rgb));
	}

	static fromHex(hex: HexadecimalValue) {
		return new Color(HexColor.toDecimal(hex));
	}

	_set(decimal: number) {
		this.value = decimal;
		return this;
	}

	red() { return DecimalColor.toRGB(this.value)[0]; }
	green() { return DecimalColor.toRGB(this.value)[1]; }
	blue() { return DecimalColor.toRGB(this.value)[2]; }

	rgb() { return DecimalColor.toRGB(this.value); }
	hsl() { return RgbColor.toHSL(this.rgb()); }
	hex() { return RgbColor.toHex(this.rgb()); }

	invert() {
		return this._set(
			DecimalColor.fromRGB(
				RgbColor.inverted(
					this.rgb()
				)
			)
		);
	}

	grayscale() {
		return this._set(
			DecimalColor.fromRGB(
				RgbColor.grayscale(
					this.rgb()
				)
			)
		);
	}

	lighten(ratio: number) {
		const hsl = this.hsl();
		hsl[2] += hsl[2] * ratio;
		return this._set(
			DecimalColor.fromRGB(HslColor.toRGB(hsl))
		);
	}

	darken(ratio: number) {
		const hsl = this.hsl();
		hsl[2] -= hsl[2] * ratio;
		return this._set(
			DecimalColor.fromRGB(HslColor.toRGB(hsl))
		);
	}

	saturate(ratio: number) {
		const hsl = this.hsl();
		hsl[1] += hsl[1] * ratio;

		return this._set(
			DecimalColor.fromRGB(HslColor.toRGB(hsl))
		);
	};
}
