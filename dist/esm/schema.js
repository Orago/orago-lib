import Status from "./status.js";
class SchemaUtil {
    static createError(path, message) {
        throw {
            path,
            message,
        };
    }
    static consumeTransforms(value, transforms) {
        return transforms.reduce((prev, curr) => curr(prev), value);
    }
    static validate(schema, value, path = []) {
        switch (schema.type) {
            case "null": {
                if (typeof value != "undefined" && value != null) {
                    SchemaUtil.createError(path, "Expected null");
                }
                if (schema.cast == "null") {
                    return null;
                }
                else if (schema.cast == "undefined") {
                    return undefined;
                }
                else {
                    return value;
                }
            }
            case "string": {
                value ??=
                    typeof schema.default == "function"
                        ? schema.default()
                        : schema.default;
                if (schema.coerce == true &&
                    (typeof value == "number" || typeof value == "boolean")) {
                    value = String(value);
                }
                if (typeof value !== "string") {
                    SchemaUtil.createError(path, "Expected string");
                }
                if (schema.transforms != undefined) {
                    value = SchemaUtil.consumeTransforms(value, schema.transforms);
                }
                if (schema.min != undefined && schema.min > value.length) {
                    SchemaUtil.createError(path, "String length too short");
                }
                if (schema.max != undefined && schema.max < value.length) {
                    SchemaUtil.createError(path, "String length too long");
                }
                if (schema.includes != undefined &&
                    schema.includes.includes(value) != true) {
                    SchemaUtil.createError(path, "String does not contain expected value");
                }
                return value;
            }
            case "number": {
                value ??=
                    typeof schema.default == "function"
                        ? schema.default()
                        : schema.default;
                if (schema.coerce == true &&
                    (typeof value == "string" || typeof value == "boolean")) {
                    value = Number(value);
                }
                if (typeof value !== "number") {
                    SchemaUtil.createError(path, "Expected number");
                }
                if (schema.transforms != undefined) {
                    value = SchemaUtil.consumeTransforms(value, schema.transforms);
                }
                if (schema.min != undefined && schema.min > value) {
                    SchemaUtil.createError(path, "Number is too small");
                }
                if (schema.max != undefined && schema.max < value) {
                    SchemaUtil.createError(path, "Number is too big");
                }
                if (schema.round != undefined) {
                    value = Math.floor(value / schema.round) * schema.round;
                }
                if (schema.includes != undefined &&
                    schema.includes.includes(value) != true) {
                    SchemaUtil.createError(path, "Number does not contain expected value");
                }
                return value;
            }
            case "boolean": {
                if (schema.coerce == true) {
                    if (value == "true" || value == 1) {
                        value = true;
                    }
                    else if (value == "false" || value == 0) {
                        value = false;
                    }
                    value = Number(value);
                }
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
                return value.map((v, i) => SchemaUtil.validate(schema.items, v, [...path, String(i)]));
            }
            case "tuple": {
                if (!Array.isArray(value)) {
                    SchemaUtil.createError(path, "Expected tuple");
                }
                return schema.items.map((s, i) => SchemaUtil.validate(s, value[i], [...path, String(i)]));
            }
            case "object": {
                if (typeof value !== "object" || value === null) {
                    SchemaUtil.createError(path, "Expected object");
                }
                const result = {};
                const required = schema.required ?? [];
                for (const key of required) {
                    if (!(key in value)) {
                        SchemaUtil.createError([...path, key], "Missing required field");
                    }
                }
                for (const key in schema.properties) {
                    if (required.includes(key)) {
                        result[key] = SchemaUtil.validate(schema.properties[key], value[key], [...path, key]);
                    }
                    else {
                        try {
                            result[key] = SchemaUtil.validate(schema.properties[key], value[key], [...path, key]);
                        }
                        catch (e) { }
                    }
                }
                return result;
            }
        }
    }
}
class SanitySchemaMini {
    static string(options) {
        return { type: "string", ...options };
    }
    static number(options) {
        return { type: "number", ...options };
    }
    static tuple(items, options) {
        const _items = typeof items == "function" ? items(SanitySchemaMini) : items;
        return { type: "tuple", items: _items, ...options };
    }
    static array(items, options) {
        const _items = typeof items == "function" ? items(SanitySchemaMini) : items;
        return { type: "array", items: _items, ...options };
    }
    static object(props, options) {
        const properties = typeof props == "function" ? props(SanitySchemaMini) : props;
        return { type: "object", properties, ...options };
    }
}
class Parser {
    static parse(schema, data) {
        return SchemaUtil.validate(schema, data);
    }
    static safeParse(schema, data) {
        try {
            return new Status.Success(undefined, this.parse(schema, data));
        }
        catch (e) {
            return new Status.Error(e);
        }
    }
}
class ParserStrict {
    static parseStrict(schema, data) {
        let g = data;
        return SchemaUtil.validate(schema, g);
    }
    static safeParseStrict(schema, data) {
        try {
            return new Status.Success(undefined, Parser.parse(schema, data));
        }
        catch (e) {
            return new Status.Error(e);
        }
    }
}
class SanitySchema {
    static Utility = SchemaUtil;
    static s = SanitySchemaMini;
    static validate = SchemaUtil.validate;
    static define(schema) {
        return schema;
    }
    static parse = Parser.parse;
    static safeParse = Parser.safeParse;
    static Strict = ParserStrict;
}
export { SanitySchema, SanitySchemaMini, SanitySchemaMini as s, };
