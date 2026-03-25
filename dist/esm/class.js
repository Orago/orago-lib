export function makeCallableClass(Class, ...args) {
    const instance = new Class(...args);
    const callable = ((...fnArgs) => {
        return instance.call(...fnArgs);
    });
    Object.setPrototypeOf(callable, Class.prototype);
    Object.assign(callable, instance);
    return callable;
}
export function trapValue(obj, property, callback) {
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
