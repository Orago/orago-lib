"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferReader = exports.BufferWriter = void 0;
class BinaryWriter {
}
class BufferWriter extends BinaryWriter {
    chunks = [];
    chunk;
    view;
    index = 0;
    constructor(initialSize = 64) {
        super();
        this.chunk = new Uint8Array(initialSize);
        this.view = new DataView(this.chunk.buffer);
    }
    _ensure(size) {
        if (this.index + size > this.chunk.length) {
            this.chunks.push(this.chunk.subarray(0, this.index));
            const new_size = Math.max(this.chunk.length * 2, size);
            this.chunk = new Uint8Array(new_size);
            this.view = new DataView(this.chunk.buffer);
            this.index = 0;
        }
    }
    write_bytes(data) {
        this._ensure(data.length);
        this.chunk.set(data, this.index);
        this.index += data.length;
        return this;
    }
    write_short(val) {
        this._ensure(2);
        this.view.setUint16(this.index, val, true);
        this.index += 2;
        return this;
    }
    write_int(val, l = 4) {
        this._ensure(l);
        this.view.setInt32(this.index, val, true);
        this.index += l;
        return this;
    }
    write_char(val) {
        this._ensure(1);
        this.view.setUint8(this.index, val);
        this.index += 1;
        return this;
    }
    write_float(val) {
        this._ensure(4);
        this.view.setFloat32(this.index, val, true);
        this.index += 4;
        return this;
    }
    write_double(val) {
        this._ensure(8);
        this.view.setFloat64(this.index, val, true);
        this.index += 8;
        return this;
    }
    write_string(val) {
        const bytes = new TextEncoder().encode(val);
        this.write_short(bytes.length);
        this._ensure(bytes.length);
        this.chunk.set(bytes, this.index);
        this.index += bytes.length;
        return this;
    }
    getBuffer() {
        this.chunks.push(this.chunk.subarray(0, this.index));
        if (this.chunks.length === 1)
            return this.chunks[0];
        const total = this.chunks.reduce((n, c) => n + c.length, 0);
        const result = new Uint8Array(total);
        let offset = 0;
        for (const c of this.chunks) {
            result.set(c, offset);
            offset += c.length;
        }
        return result;
    }
}
exports.BufferWriter = BufferWriter;
class BinaryReader {
}
class BufferReader extends BinaryReader {
    view;
    index = 0;
    constructor(buffer) {
        super();
        if (buffer instanceof Uint8Array) {
            buffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
        }
        this.view = new DataView(buffer);
    }
    bytes(length) {
        const bytes = this.view.buffer.slice(this.index, this.index + length);
        this.index += length;
        return bytes;
    }
    read_short() {
        const val = this.view.getUint16(this.index, true);
        this.index += 2;
        return val;
    }
    read_int(l = 4) {
        const val = this.view.getInt32(this.index, true);
        this.index += l;
        return val;
    }
    read_char() {
        const val = this.view.getUint8(this.index);
        this.index += 1;
        return val;
    }
    read_float() {
        const val = this.view.getFloat32(this.index, true);
        this.index += 4;
        return val;
    }
    read_double() {
        const val = this.view.getFloat64(this.index, true);
        this.index += 8;
        return val;
    }
    read_string() {
        const length = this.read_short();
        const bytes = new Uint8Array(this.view.buffer, this.index, length);
        const decoder = new TextDecoder();
        const str = decoder.decode(bytes);
        this.index += length;
        return str;
    }
}
exports.BufferReader = BufferReader;
