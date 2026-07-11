import { StatusLike } from "./status.js";
type NullSchema = {
    type: "null";
    cast?: "null" | "undefined";
};
type StringSchema = {
    type: "string";
    default?: string | (() => string);
    transforms?: ((value: string) => string)[];
    includes?: string[];
    min?: number;
    max?: number;
};
type NumberSchema = {
    type: "number";
    default?: number | (() => number);
    transforms?: ((value: number) => number)[];
    includes?: number[];
    round?: number;
    min?: number;
    max?: number;
};
type BooleanSchema = {
    type: "boolean";
    default?: boolean;
};
type ArraySchema<T extends Schema> = {
    type: "array";
    items: T;
    min?: number;
    max?: number;
};
type TupleSchema<T extends readonly Schema[]> = {
    type: "tuple";
    items: T;
};
type ObjectSchema<T extends Record<string, Schema>> = {
    type: "object";
    default?: any;
    properties: T;
    required?: readonly string[];
    additionalProperties?: boolean;
};
type Schema = NullSchema | StringSchema | NumberSchema | BooleanSchema | ArraySchema<any> | TupleSchema<any> | ObjectSchema<any>;
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type DeepMutable<T> = T extends (...args: any) => any ? T : T extends readonly (infer U)[] ? DeepMutable<U>[] : T extends object ? {
    -readonly [K in keyof T]: DeepMutable<T[K]>;
} : T;
type Infer<T, D extends number = 5> = [D] extends [never] ? never : T extends NullSchema ? T["cast"] extends "null" ? null : undefined : T extends StringSchema ? string : T extends NumberSchema ? number : T extends BooleanSchema ? boolean : T extends ArraySchema<infer U> ? Infer<U, Prev[D]>[] : T extends TupleSchema<infer Items> ? InferTuple<Items, Prev[D]> : T extends ObjectSchema<any> ? InferObject<T["properties"], T["required"], Prev[D]> : never;
type RequiredKeys<R> = R extends readonly (infer U)[] ? U & string : never;
type InferObject<P extends Record<string, Schema>, R extends readonly string[] | undefined, D extends number> = CleanOptional<DeepMutable<{
    [K in keyof P as K extends RequiredKeys<R> ? K : never]-?: Infer<P[K], D>;
} & {
    [K in keyof P as K extends RequiredKeys<R> ? never : K]?: Infer<P[K], D>;
}>>;
type CleanOptional<T> = {
    [K in keyof T]: undefined extends T[K] ? Exclude<T[K], undefined> : T[K];
};
type InferTuple<T extends readonly any[], D extends number> = T extends readonly [infer A, ...infer Rest] ? [Infer<A, D>, ...InferTuple<Rest, D>] : [];
declare class SchemaUtil {
    static createError(path: string[], message: string): never;
    static consumeTransforms<T extends any = any>(value: T, transforms: ((value: T) => T)[]): T;
    static validate(schema: Schema, value: any, path?: string[]): any;
}
declare class SanitySchemaMini {
    static string(options?: Omit<Extract<Schema, {
        type: "string";
    }>, "type">): Extract<Schema, {
        type: "string";
    }>;
    static number(options?: Omit<Extract<Schema, {
        type: "number";
    }>, "type">): Extract<Schema, {
        type: "number";
    }>;
    static tuple(items: ((s: typeof SanitySchemaMini) => Schema[]) | Schema[], options?: Omit<Extract<Schema, {
        type: "tuple";
    }>, "type" | "items">): Extract<Schema, {
        type: "tuple";
    }>;
    static array(items: ((s: typeof SanitySchemaMini) => Schema) | Schema, options?: Omit<Extract<Schema, {
        type: "array";
    }>, "type" | "items">): Extract<Schema, {
        type: "array";
    }>;
    static object(props: ((s: typeof SanitySchemaMini) => Record<string, Schema>) | Record<string, Schema>, options?: Omit<Extract<Schema, {
        type: "object";
    }>, "type" | "properties">): Extract<Schema, {
        type: "object";
    }>;
}
declare class Parser {
    static parse<T extends Schema, D extends unknown>(schema: T, data: D): Infer<T>;
    static safeParse<T extends Schema, const D extends Infer<T> | unknown>(schema: T, data: D): StatusLike<true, Infer<T>> | StatusLike<false, any>;
}
declare class ParserStrict {
    static parseStrict<T extends Schema, D extends Infer<T>>(schema: T, data: D): Infer<T>;
    static safeParseStrict<T extends Schema, const D extends Infer<T>>(schema: T, data: D): StatusLike<true, Infer<T>> | StatusLike<false, any>;
}
declare class SanitySchema {
    static Utility: typeof SchemaUtil;
    static readonly s: typeof SanitySchemaMini;
    static readonly validate: typeof SchemaUtil.validate;
    static define<const T extends Schema>(schema: T): T;
    static readonly parse: typeof Parser.parse;
    static readonly safeParse: typeof Parser.safeParse;
    static readonly Strict: typeof ParserStrict;
}
export { SanitySchema, SanitySchemaMini, SanitySchemaMini as s, type StringSchema, type NumberSchema, type BooleanSchema, type ArraySchema, type TupleSchema, type ObjectSchema, type Schema as JSONSchema, type Infer, };
