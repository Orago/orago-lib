"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trapValue = exports.makeCallableClass = void 0;
function makeCallableClass(Class, ...args) {
    const instance = new Class(...args);
    const callable = ((...fnArgs) => {
        return instance.call(...fnArgs);
    });
    Object.setPrototypeOf(callable, Class.prototype);
    Object.assign(callable, instance);
    return callable;
}
exports.makeCallableClass = makeCallableClass;
function trapValue(obj, property, callback) {
    Object.defineProperty(obj, property, {
        configurable: true,
        get() {
            const value = callback();
            Object.defineProperty(obj, property, {
                value,
                writable: false,
                configurable: false,
                enumerable: true,
            });
            return value;
        },
    });
}
exports.trapValue = trapValue;
