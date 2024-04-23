export default class Emitter {
    all: Map<string, Array<Function>>;
    constructor(all?: Array<any> | Map<any, any>);
    on(event: string, handler: Function): this;
    off(event: string, handler: Function): this;
    emit(event: string, ...args: any[]): this;
    [Symbol.iterator](): Generator<[string, Function[]], void, unknown>;
}
