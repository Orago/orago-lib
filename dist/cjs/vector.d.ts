import { Point } from "./math/types.js";
export { Point } from "./math/types.js";
declare namespace Helpers {
    class VecLike {
        static readonly type: any[];
        static toString(args: any[]): string;
        static clean(args: any[]): any[];
        static valid(args: any[]): boolean;
    }
    export class VectorNumber extends VecLike {
        static readonly type: number[];
        static readonly size: number;
        static clean(args: number[]): number[];
        static valid(args: number[]): boolean;
    }
    export class VectorNumberInt extends VectorNumber {
        static readonly type: number[];
        static readonly size: number;
        static clean(args: number[]): number[];
        static valid(args: number[]): boolean;
    }
    export {};
}
export declare class Vector2 extends Helpers.VectorNumber {
    static readonly type: [number, number];
    static readonly size = 2;
    static clean(args: (typeof Vector2)["type"]): [number, number];
    static valid(args: (typeof Vector2)["type"]): boolean;
    static fromObject(point: Point): [number, number];
    static toObject(args: (typeof Vector2)["type"]): Point;
}
export declare class Vector2i extends Helpers.VectorNumberInt {
    static readonly type: [number, number];
    static readonly size = 2;
    static clean(args: (typeof Vector2i)["type"]): [number, number];
    static valid(args: (typeof Vector2i)["type"]): boolean;
    static fromObject(point: Point): [number, number];
    static toObject(args: (typeof Vector2i)["type"]): Point;
}
export declare class Vector3 extends Helpers.VectorNumber {
    static readonly type: [number, number, number];
    static readonly size = 3;
    static clean(args: (typeof Vector3)["type"]): [number, number, number];
    static valid(args: (typeof Vector3)["type"]): boolean;
    static fromObject(point: Position3D): (typeof Vector3)["type"];
    static toObject(args: (typeof Vector3)["type"]): Position3D;
}
export declare class Vector3i extends Helpers.VectorNumberInt {
    static readonly type: [number, number, number];
    static readonly size = 3;
    static clean(args: (typeof Vector3i)["type"]): [number, number, number];
    static valid(args: (typeof Vector3i)["type"]): boolean;
    static toObject(args: (typeof Vector3i)["type"]): Position3D;
}
export type Position2D = Point;
export type Position3D = {
    x: number;
    y: number;
    z: number;
};
export declare class VectorMap<T extends typeof Helpers.VectorNumber, valueType = any> {
    private reference;
    map: Map<string, [T["type"], value: valueType]>;
    constructor(reference: T);
    set(vector: T["type"], value: valueType): void;
    get(vector: T["type"]): valueType | undefined;
    has(vector: T["type"]): boolean;
    delete(vector: T["type"]): boolean;
    clear(): void;
    keys(): T["type"][];
    values(): valueType[];
    entries(): [T["type"], valueType][];
    get size(): number;
}
interface VectorTypeDict {
    1: [x: number];
    2: [x: number, y: number];
    3: [x: number, y: number, z: number];
}
export declare class VectorUtil<const N extends keyof VectorTypeDict, T> {
    private length;
    static parseVector(input: string): number[];
    constructor(length: N);
    clean(vector: number[]): VectorTypeDict[N];
    toString(vector: number[]): string;
    fromString(value: string): VectorTypeDict[N];
    isValid(vector: unknown): vector is VectorTypeDict[N];
}
type VVec<N extends keyof VectorTypeDict, Strict extends boolean> = Strict extends true ? VectorTypeDict[N] : number[];
export declare class DimensionalMap<const N extends keyof VectorTypeDict, T, Strict extends boolean = true> {
    private vector_size;
    static new<T, Strict extends boolean = true>(): {
        size: <N extends keyof VectorTypeDict>(size: N) => DimensionalMap<N, T, Strict>;
    };
    map: Map<string, T>;
    vector: VectorUtil<N, T>;
    constructor(vector_size: N);
    set(vector: VVec<N, Strict>, value: T): void;
    get(vector: VVec<N, Strict>): T | undefined;
    has(vector: VVec<N, Strict>): boolean;
    delete(vector: VVec<N, Strict>): boolean;
    clear(): void;
    keys(): Iterator<VectorTypeDict[N]>;
    values(): IterableIterator<T>;
    entries(): Iterator<[VectorTypeDict[N], T]>;
    get size(): number;
}
