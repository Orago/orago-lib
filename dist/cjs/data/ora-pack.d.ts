import { BufferReader, BufferWriter } from "./buffer.js";
declare class OraPackWriter extends BufferWriter {
    packNil(): this;
    packBool(value: boolean): this;
    packInt(value: number | bigint): this;
    packFloat(value: number): this;
    packDouble(value: number): this;
    packString(value: string): this;
    packUint8Array(bytes: Uint8Array): this;
    packArray(arr: any[]): this;
    packMap(obj: Record<string, any>): this;
    arrayLength(len: number): this;
    mapLength(len: number): this;
    pack(value: any): this;
}
declare class OraPackReader extends BufferReader {
    constructor(buffer: Uint8Array);
    private readUint8;
    private readInt8;
    private readUint16;
    private readInt16;
    private readUint32;
    private readInt32;
    private readFloat32;
    private readFloat64;
    private readString;
    private readArray;
    private readMap;
    private readUint8Array;
    parse(): any;
}
export declare class OraPack {
    static Writer: typeof OraPackWriter;
    static Reader: typeof OraPackReader;
    static encode(data: any): Uint8Array;
    static decode(buffer: Uint8Array): any;
}
export {};
