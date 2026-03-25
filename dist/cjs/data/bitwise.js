"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WiseBit = exports.BitOp = void 0;
class BitOp {
    static hasFlag(value, flag) {
        return (value & flag) === flag;
    }
    static addFlag(value, flag) {
        return value | flag;
    }
    static removeFlag(value, flag) {
        return value & ~flag;
    }
    static toggleFlag(value, flag) {
        return value ^ flag;
    }
}
exports.BitOp = BitOp;
class WiseBit {
    dict;
    static dict(array) {
        const R = {};
        array.forEach((key, i) => (R[key] = 1 << i));
        return R;
    }
    value = 0;
    constructor(dict) {
        this.dict = dict;
    }
    hasFlags(...names) {
        const bits = names.reduce((_, name) => _ | this.dict[name], 0);
        return (this.value & bits) === bits;
    }
    addFlags(...names) {
        this.value = names.reduce((bits, name) => bits | this.dict[name], this.value);
        return this;
    }
    removeFlags(...names) {
        this.value = names.reduce((bits, name) => bits & ~this.dict[name], this.value);
        return this;
    }
    toggleFlags(...names) {
        this.value = names.reduce((bits, name) => bits ^ this.dict[name], this.value);
        return this;
    }
    clear() {
        this.value = 0;
        return this;
    }
}
exports.WiseBit = WiseBit;
