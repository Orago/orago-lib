class SchemaUtil {
    static createError(path, message) {
        throw {
            path,
            message,
        };
    }
    static validate(schema, value, path = []) {
        switch (schema.type) {
            case "string": {
                if (typeof value !== "string") {
                    SchemaUtil.createError(path, "Expected string");
                }
                if (schema.transform != undefined) {
                    value = schema.transform(value);
                }
                if (schema.minLength != undefined &&
                    schema.minLength > value.length) {
                    SchemaUtil.createError(path, "String length too short");
                }
                if (schema.maxLength != undefined &&
                    schema.maxLength < value.length) {
                    SchemaUtil.createError(path, "String length too long");
                }
                if (schema.includes != undefined &&
                    schema.includes.includes(value) != true) {
                    SchemaUtil.createError(path, "String does not contain expected value");
                }
                return value;
            }
            case "number": {
                if (typeof value !== "number") {
                    SchemaUtil.createError(path, "Expected number");
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
                if (schema.includes != undefined &&
                    schema.includes.includes(value) != true) {
                    SchemaUtil.createError(path, "Number does not contain expected value");
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
class SanitySchema {
    static s = SanitySchemaMini;
    static validate = SchemaUtil.validate;
    static parse(schema, data) {
        return SchemaUtil.validate(schema, data);
    }
    static safeParse(schema, data) {
        try {
            let g = data;
            return { success: true, data: this.parse(schema, g) };
        }
        catch (e) {
            return { success: false, error: e };
        }
    }
    static parseStrict(schema, data) {
        let g = data;
        return SchemaUtil.validate(schema, g);
    }
    static safeParseStrict(schema, data) {
        try {
            let g = data;
            return { success: true, data: this.parse(schema, g) };
        }
        catch (e) {
            return { success: false, error: e };
        }
    }
}
export { SanitySchema, SanitySchemaMini, SanitySchemaMini as s, };
