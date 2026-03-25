export declare const random: (min?: number, max?: number) => number;
export declare const difference: (first: number, second: number) => number;
export declare const getRadialDistance: (x1: number, y1: number, x2: number, y2: number) => number;
export declare const clamp: (number: number, { min, max }?: {
    min?: number | undefined;
    max?: number | undefined;
}) => number;
export declare function flipRotate(input: number, max?: number, minValue?: number, maxValue?: number): number;
export declare const twoPlaces: (input: number) => number;
export declare class OraLib_Math {
    static random: (min?: number, max?: number) => number;
    static difference: (first: number, second: number) => number;
    static getRadialDifference: (x1: number, y1: number, x2: number, y2: number) => number;
    static clamp: (number: number, { min, max }?: {
        min?: number | undefined;
        max?: number | undefined;
    }) => number;
    static flipRotate: typeof flipRotate;
    static twoPlaces: (input: number) => number;
}
