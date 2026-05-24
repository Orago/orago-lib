class Emitter {
    all = new Map();
    constructor(all) {
        if (all instanceof Map) {
            this.all = all;
        }
        else if (Array.isArray(all)) {
            this.all = new Map(all);
        }
    }
    on(event, callback) {
        const handlers = this.all.get(event);
        if (handlers) {
            handlers.push(callback);
        }
        else {
            this.all.set(event, [callback]);
        }
        return this;
    }
    off(event, callback) {
        const handlers = this.all.get(event);
        if (handlers) {
            if (callback) {
                const index = handlers.indexOf(callback);
                if (index !== -1) {
                    handlers.splice(index, 1);
                }
            }
            else {
                this.all.set(event, []);
            }
        }
        return this;
    }
    emit(event, ...args) {
        let handlers = this.all.get(event);
        if (handlers != undefined) {
            for (const handler of handlers.slice()) {
                handler(...args);
            }
        }
        if ((handlers = this.all.get("*")) != undefined) {
            for (const handler of handlers.slice()) {
                handler(event, ...args);
            }
        }
        return this;
    }
    once(event, callback) {
        const once_callback = (...args) => {
            this.off(event, once_callback);
            callback(...args);
            return void 0;
        };
        this.on(event, once_callback);
        return this;
    }
    *[Symbol.iterator]() {
        for (const entry of this.all.entries()) {
            yield entry;
        }
    }
}
class Signal {
    all = new Set();
    constructor(all) {
        if (all instanceof Set) {
            this.all = all;
        }
        else if (Array.isArray(all)) {
            this.all = new Set(all);
        }
    }
    on(callback) {
        this.all.add(callback);
        return this;
    }
    off(callback) {
        this.all.delete(callback);
        return this;
    }
    emit(...args) {
        let handlers = Array.from(this.all.values());
        for (const handler of handlers.slice()) {
            handler(...args);
        }
        return this;
    }
    once(callback) {
        const once_callback = (...args) => {
            this.off(once_callback);
            callback(...args);
            return void 0;
        };
        this.on(once_callback);
        return this;
    }
}
class DebouncedSignal extends Signal {
    delay;
    timer = null;
    constructor(delay) {
        super();
        this.delay = delay;
    }
    forceEmit(...args) {
        return super.emit(...args);
    }
    emit(...args) {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            super.emit(...args);
            this.timer = null;
        }, this.delay);
        return this;
    }
    cancel() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}
class State {
    _value;
    change = new Signal();
    constructor(_value) {
        this._value = _value;
    }
    shouldUpdate(value) {
        return this._value !== value;
    }
    transform(value) {
        return value;
    }
    get() {
        return this._value;
    }
    set(next) {
        const value = this.transform(next);
        if (this.shouldUpdate(value)) {
            const old_value = this._value;
            this._value = value;
            this.change.emit(this._value, old_value);
        }
    }
    value(...args) {
        if (args.length === 0) {
            return this._value;
        }
        else {
            this.set(args[0]);
            return this;
        }
    }
}
export { Emitter as default, Emitter, Signal, DebouncedSignal, State };
