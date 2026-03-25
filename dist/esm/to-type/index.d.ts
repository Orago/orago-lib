export declare class ToType {
    private static safeJsonParse;
    static boolean($: any, defaults?: boolean): boolean;
    static number($: any, defaults?: number): number;
    static int($: any, defaults?: number): number;
    static string($: any, defaults?: string): string;
    static object($: any): object;
    static array($: any): any[];
}
