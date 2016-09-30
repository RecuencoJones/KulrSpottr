import color from 'color';

export default class Color {
    constructor(h = 0, s = 0, l = 0) {
        this.color = color({h: h, s: s, l: l})
    }

    toRGB() {
        return this.color.hexString();
    }

    offset(luminosityOffset, direction) {
        if (direction) {
            this.color.darken(luminosityOffset / 100);
        } else {
            this.color.lighten(luminosityOffset / 100);
        }
        return this.color;
    }

}
