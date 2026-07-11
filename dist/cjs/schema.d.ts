type StringSchema = {
    type: "string";
    default?: string;
    transform?: (value: string) => string;
    includes?: string[];
    minLength?: number;
    maxLength?: number;
};
type NumberSchema = {
    type: "number";
    default?: number;
    round?: number;
    includes?: number[];
    min?: number;
    max?: number;
};
type BooleanSchema = {
    type: "boolean";
    default?: boolean;
};
type ArraySchema = {
    type: "array";
    items: JSONSchema;
};
type TupleSchema = {
    type: "tuple";
    items: readonly JSONSchema[];
};
type ObjectSchema = {
    type: "object";
    default?: any;
    properties: Record<string, JSONSchema>;
    required?: readonly string[];
    additionalProperties?: boolean;
};
type JSONSchema = StringSchema | NumberSchema | BooleanSchema | ArraySchema | TupleSchema | ObjectSchema;
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type Infer<T, D extends number = 5> = [D] extends [never] ? never : T extends StringSchema ? string : T extends NumberSchema ? number : T extends BooleanSchema ? boolean : T extends ArraySchema ? Infer<T["items"], Prev[D]>[] : T extends TupleSchema ? T["items"] extends readonly [...infer Items] ? {
    [K in keyof Items]: Infer<Items[K], Prev[D]>;
} : never : T extends ObjectSchema ? InferObject<T["properties"], T["required"], Prev[D]> : never;
type RequiredKeys<R> = R extends readonly (infer U)[] ? U & string : never;
type InferObject<P extends Record<string, JSONSchema>, R extends readonly string[] | undefined, D extends number> = {
    [K in keyof P as K extends RequiredKeys<R> ? K : never]-?: Infer<P[K], D>;
} & {
    [K in keyof P as K extends RequiredKeys<R> ? never : K]?: Infer<P[K], D>;
};
declare class SchemaUtil {
    static createError(path: string[], message: string): never;
    static validate(schema: JSONSchema, value: any, path?: string[]): any;
}
declare class SanitySchemaMini {
    static string(options?: Omit<Extract<JSONSchema, {
        type: "string";
    }>, "type">): Extract<JSONSchema, {
        type: "string";
    }>;
    static number(options?: Omit<Extract<JSONSchema, {
        type: "number";
    }>, "type">): Extract<JSONSchema, {
        type: "number";
    }>;
    static tuple(items: ((s: typeof SanitySchemaMini) => JSONSchema[]) | JSONSchema[], options?: Omit<Extract<JSONSchema, {
        type: "tuple";
    }>, "type" | "items">): Extract<JSONSchema, {
        type: "tuple";
    }>;
    static array(items: ((s: typeof SanitySchemaMini) => JSONSchema) | JSONSchema, options?: Omit<Extract<JSONSchema, {
        type: "array";
    }>, "type" | "items">): Extract<JSONSchema, {
        type: "array";
    }>;
    static object(props: ((s: typeof SanitySchemaMini) => Record<string, JSONSchema>) | Record<string, JSONSchema>, options?: Omit<Extract<JSONSchema, {
        type: "object";
    }>, "type" | "properties">): Extract<JSONSchema, {
        type: "object";
    }>;
}
declare class SanitySchema {
    static readonly s: typeof SanitySchemaMini;
    static readonly validate: typeof SchemaUtil.validate;
    static parse<T extends JSONSchema, D extends unknown>(schema: T, data: D): Infer<T>;
    static safeParse<T extends JSONSchema, const D extends unknown>(schema: T, data: D): {
        success: true;
        data: Infer<T>;
    } | {
        success: false;
        error: any;
    };
    static parseStrict<T extends JSONSchema, D extends Infer<T>>(schema: T, data: D): Infer<T>;
    static safeParseStrict<T extends JSONSchema, const D extends Infer<T>>(schema: T, data: D): {
        success: true;
        data: Infer<T>;
    } | {
        success: false;
        error: any;
    };
}
export { SanitySchema, SanitySchemaMini, SanitySchemaMini as s, type StringSchema, type NumberSchema, type BooleanSchema, type ArraySchema, type TupleSchema, type ObjectSchema, type JSONSchema, type Infer, };
