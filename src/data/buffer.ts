abstract class BinaryWriter {
	abstract write_short(value: number): this;
	abstract write_int(value: number): this;
	abstract write_char(value: number): this;
	abstract write_float(value: number): this;
	abstract write_double(value: number): this;
	abstract write_string(value: string): this;
}

export type BufferInput = ArrayBuffer | Uint8Array | SharedArrayBuffer;

export class BufferWriter extends BinaryWriter {
	protected chunks: Uint8Array[] = [];
	protected chunk: Uint8Array;
	protected view: DataView;
	public index = 0;

	constructor(initialSize = 64) {
		super();
		this.chunk = new Uint8Array(initialSize);
		this.view = new DataView(this.chunk.buffer);
	}

	protected _ensure(size: number) {
		if (this.index + size > this.chunk.length) {
			this.chunks.push(this.chunk.subarray(0, this.index));
			const new_size = Math.max(this.chunk.length * 2, size);
			this.chunk = new Uint8Array(new_size);
			this.view = new DataView(this.chunk.buffer);
			this.index = 0;
		}
	}

	write_bytes(data: Uint8Array) {
		this._ensure(data.length);
		this.chunk.set(data, this.index);
		this.index += data.length;
		return this;
	}

	write_short(val: number) {
		this._ensure(2);
		this.view.setUint16(this.index, val, true);
		this.index += 2;
		return this;
	}

	write_int(val: number, l: number = 4) {
		this._ensure(l);
		this.view.setInt32(this.index, val, true);
		this.index += l;
		return this;
	}

	write_char(val: number) {
		this._ensure(1);
		this.view.setUint8(this.index, val);
		this.index += 1;
		return this;
	}

	write_float(val: number) {
		this._ensure(4);
		this.view.setFloat32(this.index, val, true);
		this.index += 4;
		return this;
	}

	write_double(val: number) {
		this._ensure(8);
		this.view.setFloat64(this.index, val, true);
		this.index += 8;
		return this;
	}

	write_string(val: string) {
		const bytes = new TextEncoder().encode(val);
		this.write_short(bytes.length);
		this._ensure(bytes.length);
		this.chunk.set(bytes, this.index);
		this.index += bytes.length;
		return this;
	}

	getBuffer(): Uint8Array {
		this.chunks.push(this.chunk.subarray(0, this.index));
		if (this.chunks.length === 1) return this.chunks[0];
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

abstract class BinaryReader {
	abstract read_short(): number;
	abstract read_int(): number;
	abstract read_char(): number;
	abstract read_float(): number;
	abstract read_double(): number;
	abstract read_string(): string;
}

export class BufferReader extends BinaryReader {
	public view: DataView;
	public index = 0;

	constructor(buffer: BufferInput) {
		super();
		if (buffer instanceof Uint8Array) {
			buffer = buffer.buffer.slice(
				buffer.byteOffset,
				buffer.byteOffset + buffer.byteLength
			);
		}

		this.view = new DataView(buffer);
	}

	bytes(length: number): BufferInput {
		const bytes = this.view.buffer.slice(this.index, this.index + length);
		this.index += length;
		return bytes;
	}

	read_short(): number {
		const val = this.view.getUint16(this.index, true);
		this.index += 2;
		return val;
	}

	read_int(l: number = 4): number {
		const val = this.view.getInt32(this.index, true);
		this.index += l;
		return val;
	}

	read_char(): number {
		const val = this.view.getUint8(this.index);
		this.index += 1;
		return val;
	}

	read_float(): number {
		const val = this.view.getFloat32(this.index, true);
		this.index += 4;
		return val;
	}

	read_double(): number {
		const val = this.view.getFloat64(this.index, true);
		this.index += 8;
		return val;
	}

	read_string(): string {
		const length = this.read_short();
		const bytes = new Uint8Array(this.view.buffer, this.index, length);
		const decoder = new TextDecoder();
		const str = decoder.decode(bytes);
		this.index += length;
		return str;
	}
}
