"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimensionalMap = exports.VectorUtil = exports.VectorMap = exports.Vector3i = exports.Vector3 = exports.Vector2i = exports.Vector2 = void 0;
var Helpers;
(function (Helpers) {
    class VecLike {
        static type;
        static toString(args) {
            return `(${this.clean(args).join(",")})`;
        }
        static clean(args) {
            return args;
        }
        static valid(args) {
            return true;
        }
    }
    class VectorNumber extends VecLike {
        static type;
        static size = 0;
        static clean(args) {
            return new Array(this.size).fill(0).map((v, i) => args?.[i] ?? v);
        }
        static valid(args) {
            return (args.length == this.size &&
                args.every((n) => typeof n === "number"));
        }
    }
    Helpers.VectorNumber = VectorNumber;
    class VectorNumberInt extends VectorNumber {
        static type;
        static size = 0;
        static clean(args) {
            return super.clean(args).map((n) => n | 0);
        }
        static valid(args) {
            return super.valid(args) && args.every((n) => n == (n | 0));
        }
    }
    Helpers.VectorNumberInt = VectorNumberInt;
})(Helpers || (Helpers = {}));
class Vector2 extends Helpers.VectorNumber {
    static type;
    static size = 2;
    static clean(args) {
        return super.clean(args);
    }
    static valid(args) {
        return super.valid(args);
    }
    static fromObject(point) {
        return this.clean([point.x, point.y]);
    }
    static toObject(args) {
        return { x: args[0], y: args[0] };
    }
}
exports.Vector2 = Vector2;
class Vector2i extends Helpers.VectorNumberInt {
    static type;
    static size = 2;
    static clean(args) {
        return super.clean(args);
    }
    static valid(args) {
        return super.valid(args);
    }
    static fromObject(point) {
        return this.clean([point.x, point.y]);
    }
    static toObject(args) {
        this.type;
        return { x: args[0] | 0, y: args[1] | 0 };
    }
}
exports.Vector2i = Vector2i;
class Vector3 extends Helpers.VectorNumber {
    static type;
    static size = 3;
    static clean(args) {
        return super.clean(args);
    }
    static valid(args) {
        return super.valid(args);
    }
    static fromObject(point) {
        return this.clean([point.x, point.y, point.z]);
    }
    static toObject(args) {
        return { x: args[0], y: args[1], z: args[2] };
    }
}
exports.Vector3 = Vector3;
class Vector3i extends Helpers.VectorNumberInt {
    static type;
    static size = 3;
    static clean(args) {
        return super.clean(args);
    }
    static valid(args) {
        return super.valid(args);
    }
    static toObject(args) {
        return { x: args[0] | 0, y: args[1] | 0, z: args[2] | 0 };
    }
}
exports.Vector3i = Vector3i;
class VectorMap {
    reference;
    map = new Map();
    constructor(reference) {
        this.reference = reference;
        this.reference = reference;
    }
    set(vector, value) {
        this.map.set(this.reference.toString(vector), [
            this.reference.clean(vector),
            value,
        ]);
    }
    get(vector) {
        return this.map.get(this.reference.toString(vector))?.[1];
    }
    has(vector) {
        return this.map.has(this.reference.toString(vector));
    }
    delete(vector) {
        return this.map.delete(this.reference.toString(vector));
    }
    clear() {
        this.map.clear();
    }
    keys() {
        return Array.from(this.map.values()).map(([vector]) => vector);
    }
    values() {
        return Array.from(this.map.values()).map(([vector, value]) => value);
    }
    entries() {
        return Array.from(this.map.values());
    }
    get size() {
        return this.map.size;
    }
}
exports.VectorMap = VectorMap;
class VectorUtil {
    length;
    static parseVector(input) {
        const regex = /^\(\s*-?\d+(\s*,\s*-?\d+)*\s*\)$/;
        if (!regex.test(input)) {
            return [];
        }
        return input
            .slice(1, -1)
            .split(",")
            .map((part) => Number(part.trim()));
    }
    constructor(length) {
        this.length = length;
        this.length = length;
    }
    clean(vector) {
        const size = this.length;
        return vector
            .map((n) => (isNaN(n) ? 0 : n))
            .concat(new Array(Math.max(size - vector.length, 0)).fill(0))
            .slice(0, size);
    }
    toString(vector) {
        return `(${this.clean(vector).join(",")})`;
    }
    fromString(value) {
        return this.clean(VectorUtil.parseVector(value));
    }
    isValid(vector) {
        if (!Array.isArray(vector) || vector.length !== this.length) {
            return false;
        }
        return vector.every((v) => typeof v === "number");
    }
}
exports.VectorUtil = VectorUtil;
class DimensionalMap {
    vector_size;
    static new() {
        const size = (size) => new DimensionalMap(size);
        return {
            size,
        };
    }
    map = new Map();
    vector;
    constructor(vector_size) {
        this.vector_size = vector_size;
        this.vector_size = vector_size;
        this.vector = new VectorUtil(this.vector_size);
    }
    set(vector, value) {
        this.map.set(this.vector.toString(vector), value);
    }
    get(vector) {
        return this.map.get(this.vector.toString(vector));
    }
    has(vector) {
        return this.map.has(this.vector.toString(vector));
    }
    delete(vector) {
        return this.map.delete(this.vector.toString(vector));
    }
    clear() {
        this.map.clear();
    }
    *keys() {
        for (const key of this.map.keys()) {
            yield this.vector.fromString(key);
        }
    }
    values() {
        return this.map.values();
    }
    *entries() {
        for (const [key, value] of this.map.entries()) {
            yield [this.vector.fromString(key), value];
        }
    }
    get size() {
        return this.map.size;
    }
}
exports.DimensionalMap = DimensionalMap;
