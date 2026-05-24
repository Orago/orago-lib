"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonUtil = exports.FlatJson = void 0;
class FlatJson {
    static Util = class Util {
        static normalizeKey(key) {
            if (key.startsWith("[") && key.endsWith("]")) {
                key = key.slice(1, key.length - 1);
            }
            return key;
        }
        static normalizePath(path) {
            if (Array.isArray(path)) {
                return path;
            }
            else {
                return path.split(".");
            }
        }
        static generateBlank(key) {
            const surrounds = (key, start, end) => key.startsWith(start) && key.endsWith(end);
            if (surrounds(key, "{", "}")) {
                key = key.slice(1, key.length - 1);
                return [key, new Map()];
            }
            else if (surrounds(key, "(", ")")) {
                key = key.slice(1, key.length - 1);
                return [key, new Set()];
            }
            else if (surrounds(key, "[", "]")) {
                key = key.slice(1, key.length - 1);
                return [key, []];
            }
            else {
                return [key, {}];
            }
        }
        static arrayDelete(arr, start, end = start) {
            arr.splice(start, end + 1 - start);
            return arr;
        }
        static arrayWithout(arr, start, end = start) {
            [].concat(arr.slice(0, start), arr.slice(end + 1, arr.length));
        }
    };
    static flatten(input) {
        const flattened = {};
        const flat_name = (path, label) => [...path, label].join(".");
        const consume_entries = (path, entries) => {
            for (const [key, value] of entries) {
                if (typeof value == "object") {
                    if (Array.isArray(value)) {
                        nextobj(value, [...path, `[${key}]`]);
                    }
                    else if (value instanceof Map) {
                        nextobj(value, [...path, `{${key}}`]);
                    }
                    else if (value instanceof Set) {
                        nextobj(value, [...path, `(${key})`]);
                    }
                    else {
                        if (Object.keys(value).length == 0) {
                            flattened[flat_name(path, key + "")] = value;
                        }
                        else {
                            nextobj(value, [...path, key]);
                        }
                    }
                }
                else {
                    flattened[flat_name(path, key + "")] = value;
                }
            }
        };
        const nextobj = (obj, path_in = []) => {
            const path = [...path_in];
            if (Array.isArray(obj)) {
                consume_entries(path, Object.entries(obj));
            }
            else if (obj instanceof Map) {
                consume_entries(path, Array.from(obj.entries()));
            }
            else if (obj instanceof Set) {
                consume_entries(path, Array.from(obj.entries()));
            }
            else if (typeof obj == "object") {
                consume_entries(path, Object.entries(obj));
            }
        };
        nextobj(input);
        return flattened;
    }
    static with(obj, path_in, generate, callback) {
        const path = FlatJson.Util.normalizePath(path_in);
        for (let i = 0; i < path.length; i++) {
            const is_last = i == path.length - 1;
            let key = path[i];
            if (is_last && obj != undefined && key != undefined) {
                return callback(obj, key);
            }
            if (generate) {
                const gen = FlatJson.Util.generateBlank(key);
                key = gen[0];
                obj[key] ??= gen[1];
            }
            obj = obj?.[key];
        }
    }
    static get(obj, path_in) {
        return FlatJson.with(obj, path_in, false, (obj, key) => {
            if (obj instanceof Set) {
                return obj.has(key) ? key : undefined;
            }
            else if (obj instanceof Map) {
                return obj.get(key);
            }
            else {
                return obj[key];
            }
        });
    }
    static delete(obj, path_in) {
        const path = FlatJson.Util.normalizePath(path_in);
        FlatJson.with(obj, path_in, true, (obj, key) => {
            if (obj instanceof Set) {
                obj.delete(key);
            }
            else if (obj instanceof Map) {
                obj.delete(key);
            }
            else if (Array.isArray(obj)) {
                FlatJson.Util.arrayDelete(obj, Number(key));
            }
            else {
                delete obj[key];
            }
        });
    }
    static set(obj, path_in, value) {
        const path = FlatJson.Util.normalizePath(path_in);
        FlatJson.with(obj, path_in, true, (obj, key) => {
            if (obj instanceof Set) {
                obj.add(value);
            }
            else if (obj instanceof Map) {
                obj.set(key, value);
            }
            else {
                obj[key] = value;
            }
        });
    }
    static unflatten(input) {
        const unflattened = {};
        for (const [path_key, value] of Object.entries(input)) {
            const path = path_key.split(".");
            FlatJson.set(unflattened, path, value);
        }
        return unflattened;
    }
}
exports.FlatJson = FlatJson;
class JsonUtil {
    static trimEmpty(obj) {
        const flattened = FlatJson.flatten(obj);
        const entries = Object.entries(flattened).sort((a, b) => {
            return b[0].split(".").length - a[0].split(".").length;
        });
        let found = 0;
        for (const [path, value] of entries) {
            if (value == undefined ||
                (typeof value == "object" && Object.keys(value).length == 0)) {
                found++;
                FlatJson.delete(obj, path);
            }
        }
        if (found > 0) {
            JsonUtil.trimEmpty(obj);
        }
    }
}
exports.JsonUtil = JsonUtil;
