export declare class BitOp {
    static hasFlag(value: number, flag: number): boolean;
    static addFlag(value: number, flag: number): number;
    static removeFlag(value: number, flag: number): number;
    static toggleFlag(value: number, flag: number): number;
}
export declare class WiseBit<E extends Record<string, number>> {
    private dict;
    static dict<const A extends string[]>(array: A): Record<A[number], number>;
    value: number;
    constructor(dict: E);
    hasFlags(...names: (keyof E)[]): boolean;
    addFlags(...names: (keyof E)[]): this;
    removeFlags(...names: (keyof E)[]): this;
    toggleFlags(...names: (keyof E)[]): this;
    clear(): this;
}
