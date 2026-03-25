"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OraPack = void 0;
const buffer_js_1 = require("./buffer.js");
var OraPackTypes;
(function (OraPackTypes) {
    OraPackTypes[OraPackTypes["nil"] = 192] = "nil";
    OraPackTypes[OraPackTypes["false"] = 194] = "false";
    OraPackTypes[OraPackTypes["true"] = 195] = "true";
    OraPackTypes[OraPackTypes["positive_int"] = 127] = "positive_int";
    OraPackTypes[OraPackTypes["negative_int"] = 224] = "negative_int";
    OraPackTypes[OraPackTypes["i8"] = 208] = "i8";
    OraPackTypes[OraPackTypes["i16"] = 209] = "i16";
    OraPackTypes[OraPackTypes["i32"] = 210] = "i32";
    OraPackTypes[OraPackTypes["i64"] = 211] = "i64";
    OraPackTypes[OraPackTypes["f32"] = 202] = "f32";
    OraPackTypes[OraPackTypes["f64"] = 203] = "f64";
    OraPackTypes[OraPackTypes["str8"] = 217] = "str8";
    OraPackTypes[OraPackTypes["str16"] = 218] = "str16";
    OraPackTypes[OraPackTypes["str32"] = 219] = "str32";
    OraPackTypes[OraPackTypes["array16"] = 220] = "array16";
    OraPackTypes[OraPackTypes["array32"] = 221] = "array32";
    OraPackTypes[OraPackTypes["map16"] = 222] = "map16";
    OraPackTypes[OraPackTypes["map32"] = 223] = "map32";
    OraPackTypes[OraPackTypes["fixmap_a"] = 128] = "fixmap_a";
    OraPackTypes[OraPackTypes["fixmap_b"] = 143] = "fixmap_b";
    OraPackTypes[OraPackTypes["fixarray_a"] = 144] = "fixarray_a";
    OraPackTypes[OraPackTypes["fixarray_b"] = 159] = "fixarray_b";
    OraPackTypes[OraPackTypes["fixstr_a"] = 160] = "fixstr_a";
    OraPackTypes[OraPackTypes["fixstr_b"] = 191] = "fixstr_b";
})(OraPackTypes || (OraPackTypes = {}));
class OraPackWriter extends buffer_js_1.BufferWriter {
    packNil() {
        super.write_char(0xc0);
        return this;
    }
    packBool(value) {
        super.write_char(value ? 0xc3 : 0xc2);
        return this;
    }
    packInt(value) {
        if (typeof value === "bigint") {
            super.write_char(0xd3);
            super.write_double(Number(value));
            return this;
        }
        if (value >= 0 && value <= 0x7f) {
            super.write_char(value);
        }
        else if (value >= -32 && value < 0) {
            super.write_char(0xe0 | (value + 32));
        }
        else if (value >= -128 && value <= 127) {
            super.write_char(0xd0);
            super.write_char(value & 0xff);
        }
        else if (value >= -32768 && value <= 32767) {
            super.write_char(0xd1);
            super.write_short(value);
        }
        else if (value >= -2147483648 && value <= 2147483647) {
            super.write_char(0xd2);
            super.write_int(value);
        }
        else {
            super.write_char(0xd3);
            super.write_double(value);
        }
        return this;
    }
    packFloat(value) {
        super.write_char(0xca);
        super.write_float(value);
        return this;
    }
    packDouble(value) {
        super.write_char(0xcb);
        super.write_double(value);
        return this;
    }
    packString(value) {
        const bytes = new TextEncoder().encode(value);
        const len = bytes.length;
        if (len <= 31) {
            super.write_char(0xa0 | len);
        }
        else if (len <= 255) {
            super.write_char(0xd9).write_char(len);
        }
        else if (len <= 65535) {
            super.write_char(0xda).write_short(len);
        }
        else {
            super.write_char(0xdb).write_int(len);
        }
        this._ensure(len);
        this.chunk.set(bytes, this.index);
        this.index += len;
        return this;
    }
    packUint8Array(bytes) {
        this.write_char(0xd8);
        this.write_int(bytes.length);
        this.write_bytes(bytes);
        return this;
    }
    packArray(arr) {
        this.arrayLength(arr.length);
        for (const item of arr)
            this.pack(item);
        return this;
    }
    packMap(obj) {
        const keys = Object.keys(obj);
        this.mapLength(keys.length);
        for (const key of keys) {
            this.pack(key);
            this.pack(obj[key]);
        }
        return this;
    }
    arrayLength(len) {
        if (len <= 15) {
            super.write_char(0x90 | len);
        }
        else if (len <= 65535) {
            super.write_char(0xdc).write_short(len);
        }
        else {
            super.write_char(0xdd).write_int(len);
        }
        return this;
    }
    mapLength(len) {
        if (len <= 15) {
            super.write_char(0x80 | len);
        }
        else if (len <= 65535) {
            super.write_char(0xde).write_short(len);
        }
        else {
            super.write_char(0xdf).write_int(len);
        }
        return this;
    }
    pack(value) {
        if (value === null || value === undefined)
            return this.packNil();
        if (typeof value === "boolean")
            return this.packBool(value);
        if (typeof value === "number") {
            if (Number.isInteger(value))
                return this.packInt(value);
            else
                return this.packDouble(value);
        }
        if (typeof value === "bigint")
            return this.packInt(value);
        if (typeof value === "string")
            return this.packString(value);
        if (value instanceof Uint8Array)
            return this.packUint8Array(value);
        if (Array.isArray(value))
            return this.packArray(value);
        if (typeof value === "object")
            return this.packMap(value);
        throw new Error(`Unsupported type: ${typeof value}`);
    }
}
class OraPackReader extends buffer_js_1.BufferReader {
    constructor(buffer) {
        super(buffer);
    }
    readUint8() {
        return this.view.getUint8(this.index++);
    }
    readInt8() {
        return this.view.getInt8(this.index++);
    }
    readUint16() {
        const val = this.view.getUint16(this.index, true);
        this.index += 2;
        return val;
    }
    readInt16() {
        const val = this.view.getInt16(this.index, true);
        this.index += 2;
        return val;
    }
    readUint32() {
        const val = this.view.getUint32(this.index, true);
        this.index += 4;
        return val;
    }
    readInt32() {
        const val = this.view.getInt32(this.index, true);
        this.index += 4;
        return val;
    }
    readFloat32() {
        const val = this.view.getFloat32(this.index, true);
        this.index += 4;
        return val;
    }
    readFloat64() {
        const val = this.view.getFloat64(this.index, true);
        this.index += 8;
        return val;
    }
    readString(len) {
        const bytes = new Uint8Array(this.view.buffer, this.index, len);
        this.index += len;
        return new TextDecoder().decode(bytes);
    }
    readArray(len) {
        const arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(this.parse());
        }
        return arr;
    }
    readMap(len) {
        const obj = {};
        for (let i = 0; i < len; i++) {
            const key = this.parse();
            const value = this.parse();
            obj[key] = value;
        }
        return obj;
    }
    readUint8Array() {
        const size = this.readInt32();
        const bytes = this.bytes(size);
        return bytes;
    }
    parse() {
        const byte = this.readUint8();
        if (byte === 0xc0)
            return null;
        if (byte === 0xc2)
            return false;
        if (byte === 0xc3)
            return true;
        if (byte <= 0x7f)
            return byte;
        if (byte >= 0xe0)
            return byte - 0x100;
        switch (byte) {
            case 0xd0:
                return this.readInt8();
            case 0xd1:
                return this.readInt16();
            case 0xd2:
                return this.readInt32();
            case 0xd3:
                return this.readFloat64();
            case 0xca:
                return this.readFloat32();
            case 0xcb:
                return this.readFloat64();
            case 0xd9:
                return this.readString(this.readUint8());
            case 0xda:
                return this.readString(this.readUint16());
            case 0xdb:
                return this.readString(this.readUint32());
            case 0xdc:
                return this.readArray(this.readUint16());
            case 0xdd:
                return this.readArray(this.readUint32());
            case 0xde:
                return this.readMap(this.readUint16());
            case 0xdf:
                return this.readMap(this.readUint32());
            case 0xd8:
                return this.readUint8Array();
        }
        if (byte >= 0x80 && byte <= 0x8f)
            return this.readMap(byte & 0x0f);
        if (byte >= 0x90 && byte <= 0x9f)
            return this.readArray(byte & 0x0f);
        if (byte >= 0xa0 && byte <= 0xbf)
            return this.readString(byte & 0x1f);
        throw new Error(`Unsupported byte: 0x${byte.toString(16)}`);
    }
}
class OraPack {
    static Writer = OraPackWriter;
    static Reader = OraPackReader;
    static encode(data) {
        return new OraPackWriter().pack(data).getBuffer();
    }
    static decode(buffer) {
        return new OraPackReader(buffer).parse();
    }
}
exports.OraPack = OraPack;
