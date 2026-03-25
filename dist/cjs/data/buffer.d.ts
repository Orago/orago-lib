declare abstract class BinaryWriter {
    abstract write_short(value: number): this;
    abstract write_int(value: number): this;
    abstract write_char(value: number): this;
    abstract write_float(value: number): this;
    abstract write_double(value: number): this;
    abstract write_string(value: string): this;
}
export type BufferInput = ArrayBuffer | Uint8Array | SharedArrayBuffer;
export declare class BufferWriter extends BinaryWriter {
    protected chunks: Uint8Array[];
    protected chunk: Uint8Array;
    protected view: DataView;
    index: number;
    constructor(initialSize?: number);
    protected _ensure(size: number): void;
    write_bytes(data: Uint8Array): this;
    write_short(val: number): this;
    write_int(val: number, l?: number): this;
    write_char(val: number): this;
    write_float(val: number): this;
    write_double(val: number): this;
    write_string(val: string): this;
    getBuffer(): Uint8Array;
}
declare abstract class BinaryReader {
    abstract read_short(): number;
    abstract read_int(): number;
    abstract read_char(): number;
    abstract read_float(): number;
    abstract read_double(): number;
    abstract read_string(): string;
}
export declare class BufferReader extends BinaryReader {
    view: DataView;
    index: number;
    constructor(buffer: BufferInput);
    bytes(length: number): BufferInput;
    read_short(): number;
    read_int(l?: number): number;
    read_char(): number;
    read_float(): number;
    read_double(): number;
    read_string(): string;
}
export {};
