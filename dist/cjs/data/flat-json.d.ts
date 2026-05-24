type PathIn = string | string[];
export declare class FlatJson {
    static Util: {
        new (): {};
        normalizeKey(key: string): string;
        normalizePath(path: string | string[]): string[];
        generateBlank(key: string): [key: string, blank: any];
        arrayDelete(arr: any[], start: number, end?: number): any[];
        arrayWithout(arr: any[], start: number, end?: number): void;
    };
    static flatten(input: any): any;
    static with(obj: any, path_in: PathIn, generate: boolean, callback: (object: any, key: any) => void): any | undefined;
    static get(obj: any, path_in: PathIn): any | undefined;
    static delete(obj: any, path_in: PathIn): void;
    static set(obj: any, path_in: PathIn, value: any): void;
    static unflatten(input: any): any;
}
export declare class JsonUtil {
    static trimEmpty(obj: any): any;
}
export {};
