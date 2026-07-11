import Status, { StatusLike } from "./status.js";

// originally from the Meown project
type NullSchema = { type: "null"; cast?: "null" | "undefined" };

type StringSchema = {
	type: "string";
	default?: string | (() => string);
	transforms?: ((value: string) => string)[];
	includes?: string[];
	/** minimum length */
	min?: number;
	/** maximum length */
	max?: number;
};

type NumberSchema = {
	type: "number";
	default?: number | (() => number);
	transforms?: ((value: number) => number)[];
	includes?: number[];
	round?: number;
	/** minimum size */
	min?: number;
	/** maximum size */
	max?: number;
};

type BooleanSchema = {
	type: "boolean";
	default?: boolean;
};

type ArraySchema<T extends Schema> = {
	type: "array";
	items: T;

	/** minimum size */
	min?: number;
	/** maximum size */
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

type Schema =
	| NullSchema
	| StringSchema
	| NumberSchema
	| BooleanSchema
	| ArraySchema<any>
	| TupleSchema<any>
	| ObjectSchema<any>;

// limit inference to 9 levels
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type DeepMutable<T> = T extends (...args: any) => any
	? T
	: T extends readonly (infer U)[]
	? DeepMutable<U>[]
	: T extends object
	? { -readonly [K in keyof T]: DeepMutable<T[K]> }
	: T;

type Infer<T, D extends number = 5> = [D] extends [never]
	? never
	: T extends NullSchema
	? T["cast"] extends "null"
		? null
		: undefined
	: T extends StringSchema
	? string
	: T extends NumberSchema
	? number
	: T extends BooleanSchema
	? boolean
	: T extends ArraySchema<infer U>
	? Infer<U, Prev[D]>[]
	: T extends TupleSchema<infer Items>
	? InferTuple<Items, Prev[D]>
	: T extends ObjectSchema<any>
	? InferObject<T["properties"], T["required"], Prev[D]>
	: never;
type RequiredKeys<R> = R extends readonly (infer U)[] ? U & string : never;

type InferObject<
	P extends Record<string, Schema>,
	R extends readonly string[] | undefined,
	D extends number
> = CleanOptional<
	DeepMutable<
		{
			[K in keyof P as K extends RequiredKeys<R> ? K : never]-?: Infer<
				P[K],
				D
			>;
		} & {
			[K in keyof P as K extends RequiredKeys<R> ? never : K]?: Infer<
				P[K],
				D
			>;
		}
	>
>;

type CleanOptional<T> = {
	[K in keyof T]: undefined extends T[K] ? Exclude<T[K], undefined> : T[K];
};

type InferTuple<
	T extends readonly any[],
	D extends number
> = T extends readonly [infer A, ...infer Rest]
	? [Infer<A, D>, ...InferTuple<Rest, D>]
	: [];

class SchemaUtil {
	public static createError(path: string[], message: string): never {
		throw {
			path,
			message,
		};
	}

	public static consumeTransforms<T extends any = any>(
		value: T,
		transforms: ((value: T) => T)[]
	): T {
		return transforms.reduce((prev, curr) => curr(prev), value);
	}

	public static validate(
		schema: Schema,
		value: any,
		path: string[] = []
	): any {
		switch (schema.type) {
			case "null": {
				if (typeof value != "undefined" && value != null) {
					SchemaUtil.createError(path, "Expected null");
				}

				if (schema.cast == "null") {
					return null;
				} else if (schema.cast == "undefined") {
					return undefined;
				} else {
					return value;
				}
			}
			case "string": {
				value ??=
					typeof schema.default == "function"
						? schema.default()
						: schema.default;

				if (typeof value !== "string") {
					SchemaUtil.createError(path, "Expected string");
				}

				if (schema.transforms != undefined) {
					value = SchemaUtil.consumeTransforms<string>(
						value,
						schema.transforms
					);
				}

				if (schema.min != undefined && schema.min > value.length) {
					SchemaUtil.createError(path, "String length too short");
				}

				if (schema.max != undefined && schema.max < value.length) {
					SchemaUtil.createError(path, "String length too long");
				}

				if (
					schema.includes != undefined &&
					schema.includes.includes(value) != true
				) {
					SchemaUtil.createError(
						path,
						"String does not contain expected value"
					);
				}

				return value;
			}
			case "number": {
				value ??=
					typeof schema.default == "function"
						? schema.default()
						: schema.default;

				if (typeof value !== "number") {
					SchemaUtil.createError(path, "Expected number");
				}

				if (schema.transforms != undefined) {
					value = SchemaUtil.consumeTransforms<number>(
						value,
						schema.transforms
					);
				}

				if (schema.min != undefined && schema.min > value) {
					SchemaUtil.createError(path, "Number is too small");
				}

				if (schema.max != undefined && schema.max < value) {
					SchemaUtil.createError(path, "Number is too big");
				}

				if (schema.round != undefined) {
					value = Math.ceil(value / schema.round) * schema.round;
				}

				if (
					schema.includes != undefined &&
					schema.includes.includes(value) != true
				) {
					SchemaUtil.createError(
						path,
						"Number does not contain expected value"
					);
				}
				return value;
			}

			case "boolean": {
				if (typeof value != "boolean") {
					SchemaUtil.createError(path, "Expected boolean");
				}
				return value;
			}
			case "array": {
				if (!Array.isArray(value)) {
					SchemaUtil.createError(path, "Expected array");
				}

				if (schema.min != undefined && schema.min > value.length) {
					SchemaUtil.createError(path, "Array length too short");
				}

				if (schema.max != undefined && schema.max < value.length) {
					SchemaUtil.createError(path, "Array length too long");
				}

				return value.map((v, i) =>
					SchemaUtil.validate(schema.items, v, [...path, String(i)])
				);
			}
			case "tuple": {
				if (!Array.isArray(value)) {
					SchemaUtil.createError(path, "Expected tuple");
				}

				return (schema.items as Schema[]).map((s, i) =>
					SchemaUtil.validate(s, value[i], [...path, String(i)])
				);
			}
			case "object": {
				if (typeof value !== "object" || value === null) {
					SchemaUtil.createError(path, "Expected object");
				}

				const result: any = {};
				const required = schema.required ?? [];

				for (const key of required) {
					if (!(key in value)) {
						SchemaUtil.createError(
							[...path, key],
							"Missing required field"
						);
					}
				}

				for (const key in schema.properties) {
					if (required.includes(key)) {
						result[key] = SchemaUtil.validate(
							schema.properties[key],
							(value as any)[key],
							[...path, key]
						);
					} else {
						try {
							result[key] = SchemaUtil.validate(
								schema.properties[key],
								(value as any)[key],
								[...path, key]
							);
						} catch (e) {}
					}
				}

				return result;
			}
		}
	}
}

class SanitySchemaMini {
	static string(
		options?: Omit<Extract<Schema, { type: "string" }>, "type">
	): Extract<Schema, { type: "string" }> {
		return { type: "string", ...options };
	}

	static number(
		options?: Omit<Extract<Schema, { type: "number" }>, "type">
	): Extract<Schema, { type: "number" }> {
		return { type: "number", ...options };
	}

	static tuple(
		items: ((s: typeof SanitySchemaMini) => Schema[]) | Schema[],
		options?: Omit<Extract<Schema, { type: "tuple" }>, "type" | "items">
	): Extract<Schema, { type: "tuple" }> {
		const _items =
			typeof items == "function" ? items(SanitySchemaMini) : items;
		return { type: "tuple", items: _items, ...options };
	}

	static array(
		items: ((s: typeof SanitySchemaMini) => Schema) | Schema,
		options?: Omit<Extract<Schema, { type: "array" }>, "type" | "items">
	): Extract<Schema, { type: "array" }> {
		const _items =
			typeof items == "function" ? items(SanitySchemaMini) : items;
		return { type: "array", items: _items, ...options };
	}

	static object(
		props:
			| ((s: typeof SanitySchemaMini) => Record<string, Schema>)
			| Record<string, Schema>,
		options?: Omit<
			Extract<Schema, { type: "object" }>,
			"type" | "properties"
		>
	): Extract<Schema, { type: "object" }> {
		const properties =
			typeof props == "function" ? props(SanitySchemaMini) : props;

		return { type: "object", properties, ...options };
	}
}

class Parser {
	public static parse<T extends Schema, D extends unknown>(
		schema: T,
		data: D
	): Infer<T> {
		return SchemaUtil.validate(schema, data);
	}

	public static safeParse<
		T extends Schema,
		const D extends Infer<T> | unknown
	>(schema: T, data: D): StatusLike<true, Infer<T>> | StatusLike<false, any> {
		try {
			return new Status.Success(
				undefined,
				this.parse(schema, data as any) as any
			);
		} catch (e: any) {
			return new Status.Error(e);
		}
	}
}

class ParserStrict {
	public static parseStrict<T extends Schema, D extends Infer<T>>(
		schema: T,
		data: D
	): Infer<T> {
		let g = data as any;
		return SchemaUtil.validate(schema, g);
	}

	public static safeParseStrict<T extends Schema, const D extends Infer<T>>(
		schema: T,
		data: D
	): StatusLike<true, Infer<T>> | StatusLike<false, any> {
		try {
			return new Status.Success(
				undefined,
				Parser.parse(schema, data as any) as any
			);
		} catch (e: any) {
			return new Status.Error(e);
		}
	}
}

class SanitySchema {
	static Utility = SchemaUtil;
	static readonly s = SanitySchemaMini;
	static readonly validate = SchemaUtil.validate;

	static define<const T extends Schema>(schema: T): T {
		return schema;
	}
	static readonly parse = Parser.parse;
	static readonly safeParse = Parser.safeParse;
	static readonly Strict = ParserStrict;
}

export {
	// main
	SanitySchema,
	SanitySchemaMini,
	SanitySchemaMini as s,

	// schema types
	type StringSchema,
	type NumberSchema,
	type BooleanSchema,
	type ArraySchema,
	type TupleSchema,
	type ObjectSchema,
	type Schema as JSONSchema,
	type Infer,
};
