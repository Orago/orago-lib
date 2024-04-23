export default class Emitter {
    constructor(all) {
        this.all = new Map();
        if (all instanceof Map) {
            this.all = all;
        }
        else if (Array.isArray(all)) {
            this.all = new Map(all);
        }
    }
    on(event, handler) {
        const handlers = this.all.get(event);
        if (handlers) {
            handlers.push(handler);
        }
        else {
            this.all.set(event, [handler]);
        }
        return this;
    }
    off(event, handler) {
        const handlers = this.all.get(event);
        if (handlers) {
            if (handler) {
                const index = handlers.indexOf(handler);
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
        if (handlers) {
            for (const handler of handlers.slice()) {
                handler(...args);
            }
        }
        if (handlers = this.all.get('*')) {
            for (const handler of handlers.slice()) {
                handler(event, ...args);
            }
        }
        return this;
    }
    *[Symbol.iterator]() {
        for (const entry of this.all.entries()) {
            yield entry;
        }
    }
}
;
