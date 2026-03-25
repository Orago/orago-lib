import { BufferInput, BufferReader, BufferWriter } from "./buffer.js";

enum OraPackTypes {
	nil = 0xc0,
	false = 0xc2,
	true = 0xc3,
	positive_int = 0x7f,
	negative_int = 0xe0,
	// ints
	i8 = 0xd0,
	i16 = 0xd1,
	i32 = 0xd2,
	i64 = 0xd3,
	f32 = 0xca,
	f64 = 0xcb,
	str8 = 0xd9,
	str16 = 0xda,
	str32 = 0xdb,
	array16 = 0xdc,
	array32 = 0xdd,
	map16 = 0xde,
	map32 = 0xdf,
	fixmap_a = 0x80,
	fixmap_b = 0x8f,
	fixarray_a = 0x90,
	fixarray_b = 0x9f,
	fixstr_a = 0xa0,
	fixstr_b = 0xbf,
}

class OraPackWriter extends BufferWriter {
	packNil() {
		super.write_char(0xc0);
		return this;
	}

	packBool(value: boolean) {
		super.write_char(value ? 0xc3 : 0xc2);
		return this;
	}

	packInt(value: number | bigint) {
		if (typeof value === "bigint") {
			// int64
			super.write_char(0xd3);

			super.write_double(Number(value));
			return this;
		}

		if (value >= 0 && value <= 0x7f) {
			// positive fixint
			super.write_char(value);
		} else if (value >= -32 && value < 0) {
			// negative fixint
			super.write_char(0xe0 | (value + 32));
		} else if (value >= -128 && value <= 127) {
			// int8
			super.write_char(0xd0);
			super.write_char(value & 0xff);
		} else if (value >= -32768 && value <= 32767) {
			// int16
			super.write_char(0xd1);
			super.write_short(value);
		} else if (value >= -2147483648 && value <= 2147483647) {
			// int32
			super.write_char(0xd2);
			super.write_int(value);
		} else {
			// int64 (approximate with double)
			super.write_char(0xd3);
			super.write_double(value);
		}
		return this;
	}

	packFloat(value: number) {
		super.write_char(0xca);
		super.write_float(value);
		return this;
	}

	packDouble(value: number) {
		super.write_char(0xcb);
		super.write_double(value);
		return this;
	}

	packString(value: string) {
		const bytes = new TextEncoder().encode(value);
		const len = bytes.length;

		if (len <= 31) {
			// fixstr
			super.write_char(0xa0 | len);
		} else if (len <= 255) {
			// str8
			super.write_char(0xd9).write_char(len);
		} else if (len <= 65535) {
			// str16
			super.write_char(0xda).write_short(len);
		} else {
			// str32
			super.write_char(0xdb).write_int(len);
		}

		this._ensure(len);
		this.chunk.set(bytes, this.index);
		this.index += len;
		return this;
	}

	packUint8Array(bytes: Uint8Array) {
		this.write_char(0xd8); // ext 13
		this.write_int(bytes.length);
		this.write_bytes(bytes);
		return this;
	}

	packArray(arr: any[]) {
		this.arrayLength(arr.length);
		for (const item of arr) this.pack(item);
		return this;
	}

	packMap(obj: Record<string, any>) {
		const keys = Object.keys(obj);
		this.mapLength(keys.length);
		for (const key of keys) {
			this.pack(key);
			this.pack(obj[key]);
		}
		return this;
	}

	arrayLength(len: number) {
		if (len <= 15) {
			// fixarray
			super.write_char(0x90 | len);
		} else if (len <= 65535) {
			// array16
			super.write_char(0xdc).write_short(len);
		} else {
			// array32
			super.write_char(0xdd).write_int(len);
		}
		return this;
	}

	mapLength(len: number) {
		if (len <= 15) {
			// fixmap
			super.write_char(0x80 | len);
		} else if (len <= 65535) {
			// map16
			super.write_char(0xde).write_short(len);
		} else {
			// map32
			super.write_char(0xdf).write_int(len);
		}
		return this;
	}

	pack(value: any) {
		if (value === null || value === undefined) return this.packNil();
		if (typeof value === "boolean") return this.packBool(value);
		if (typeof value === "number") {
			if (Number.isInteger(value)) return this.packInt(value);
			else return this.packDouble(value);
		}
		if (typeof value === "bigint") return this.packInt(value);
		if (typeof value === "string") return this.packString(value);
		if (value instanceof Uint8Array) return this.packUint8Array(value);
		if (Array.isArray(value)) return this.packArray(value);
		if (typeof value === "object") return this.packMap(value);
		throw new Error(`Unsupported type: ${typeof value}`);
	}
}

class OraPackReader extends BufferReader {
	constructor(buffer: Uint8Array) {
		super(buffer);
	}

	private readUint8(): number {
		return this.view.getUint8(this.index++);
	}

	private readInt8(): number {
		return this.view.getInt8(this.index++);
	}

	private readUint16(): number {
		const val = this.view.getUint16(this.index, true);
		this.index += 2;
		return val;
	}

	private readInt16(): number {
		const val = this.view.getInt16(this.index, true);
		this.index += 2;
		return val;
	}

	private readUint32(): number {
		const val = this.view.getUint32(this.index, true);
		this.index += 4;
		return val;
	}

	private readInt32(): number {
		const val = this.view.getInt32(this.index, true);
		this.index += 4;
		return val;
	}

	private readFloat32(): number {
		const val = this.view.getFloat32(this.index, true);
		this.index += 4;
		return val;
	}

	private readFloat64(): number {
		const val = this.view.getFloat64(this.index, true);
		this.index += 8;
		return val;
	}

	private readString(len: number): string {
		const bytes = new Uint8Array(this.view.buffer, this.index, len);
		this.index += len;
		return new TextDecoder().decode(bytes);
	}

	private readArray(len: number): any[] {
		const arr = [];
		for (let i = 0; i < len; i++) {
			arr.push(this.parse());
		}
		return arr;
	}

	private readMap(len: number): Record<string, any> {
		const obj: Record<string, any> = {};
		for (let i = 0; i < len; i++) {
			const key = this.parse();
			const value = this.parse();
			obj[key] = value;
		}
		return obj;
	}

	private readUint8Array(): BufferInput {
		const size = this.readInt32();
		const bytes = this.bytes(size);
		return bytes;
	}

	parse(): any {
		const byte = this.readUint8();

		// nil
		if (byte === 0xc0) return null;

		// booleans
		if (byte === 0xc2) return false;
		if (byte === 0xc3) return true;

		// fixint
		if (byte <= 0x7f) return byte; // positive
		if (byte >= 0xe0) return byte - 0x100; // negative

		// uint/int
		switch (byte) {
			case 0xd0:
				return this.readInt8();
			case 0xd1:
				return this.readInt16();
			case 0xd2:
				return this.readInt32();
			case 0xd3:
				return this.readFloat64(); // JS can't handle int64 precisely
			case 0xca:
				return this.readFloat32();
			case 0xcb:
				return this.readFloat64();
			case 0xd9:
				return this.readString(this.readUint8()); // str8
			case 0xda:
				return this.readString(this.readUint16()); // str16
			case 0xdb:
				return this.readString(this.readUint32()); // str32
			case 0xdc:
				return this.readArray(this.readUint16()); // array16
			case 0xdd:
				return this.readArray(this.readUint32()); // array32
			case 0xde:
				return this.readMap(this.readUint16()); // map16
			case 0xdf:
				return this.readMap(this.readUint32()); // map32

			case 0xd8:
				return this.readUint8Array();
		}

		// fixmap 0x80 - 0x8f
		if (byte >= 0x80 && byte <= 0x8f) return this.readMap(byte & 0x0f);
		// fixarray 0x90 - 0x9f
		if (byte >= 0x90 && byte <= 0x9f) return this.readArray(byte & 0x0f);
		// fixstr 0xa0 - 0xbf
		if (byte >= 0xa0 && byte <= 0xbf) return this.readString(byte & 0x1f);

		throw new Error(`Unsupported byte: 0x${byte.toString(16)}`);
	}
}

export class OraPack {
	static Writer = OraPackWriter;
	static Reader = OraPackReader;

	static encode(data: any): Uint8Array {
		return new OraPackWriter().pack(data).getBuffer();
	}

	static decode(buffer: Uint8Array): any {
		return new OraPackReader(buffer).parse();
	}
}
