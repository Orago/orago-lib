export default class RgbColor {
    static isDark(rgb) {
        return 128 > ((rgb[0] * 2126 +
            rgb[1] * 7152 +
            rgb[2] * 722) / 10000);
    }
    static isLight(rgb) {
        return this.isDark(rgb) != true;
    }
    static inverted(rgb) {
        return rgb.map(n => 255 - n);
    }
    static grayscale(rgb) {
        const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
        return [value, value, value];
    }
    static luminosity(rgb) {
        const lum = [];
        for (const [i, element] of rgb.entries()) {
            const chan = element / 255;
            lum[i] = (chan <= 0.04045) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
        }
        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    }
    static contrast(rgbOne, rgbTwo) {
        const lum1 = this.luminosity(rgbOne);
        const lum2 = this.luminosity(rgbTwo);
        if (lum1 > lum2) {
            return (lum1 + 0.05) / (lum2 + 0.05);
        }
        return (lum2 + 0.05) / (lum1 + 0.05);
    }
    static toDecimal(rgb) {
        return rgb[0] << 16 | rgb[1] << 8 | rgb[2];
    }
    static toHex(rgb) {
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
    static toHue(rgb) {
        let [red, green, blue] = rgb;
        red /= 255;
        green /= 255;
        blue /= 255;
        let max = Math.max(red, green, blue);
        let min = Math.min(red, green, blue);
        let c = max - min;
        let hue = 0;
        let segment, shift;
        if (c == 0) {
            hue = 0;
        }
        else {
            switch (max) {
                case red:
                    segment = (green - blue) / c;
                    shift = 0 / 60;
                    if (segment < 0) {
                        shift = 360 / 60;
                    }
                    hue = segment + shift;
                    break;
                case green:
                    segment = (blue - red) / c;
                    shift = 120 / 60;
                    hue = segment + shift;
                    break;
                case blue:
                    segment = (red - green) / c;
                    shift = 240 / 60;
                    hue = segment + shift;
                    break;
            }
        }
        return hue * 60;
    }
    static toHSL(rgb) {
        let [r, g, b] = rgb;
        r /= 255;
        g /= 255;
        b /= 255;
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        }
        else {
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
    static mix(color1, color2, weight) {
        const p = weight === undefined ? 0.5 : weight;
        const w = 2 * p - 1;
        const w1 = (((w === -1) ? w : w / (1 + w)) + 1) / 2;
        const w2 = 1 - w1;
        return [
            w1 * color1[0] + w2 * color2[0],
            w1 * color1[1] + w2 * color2[1],
            w1 * color1[2] + w2 * color2[2]
        ];
    }
}
