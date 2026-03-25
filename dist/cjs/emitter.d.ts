type EmitterEvents = Record<string, (...args: any[]) => any>;
type Evt<K, Strict extends boolean> = Strict extends true ? keyof K | "*" : keyof K | "*" | (string & {});
type CallbackListen<T, K> = K extends keyof T ? T[K] : Function;
type CallbackEmit<T extends EmitterEvents, K> = K extends keyof T ? Parameters<T[K]> : any[];
declare class Emitter<T extends EmitterEvents & {} = {}, Strict extends boolean = false> {
    Type: T;
    readonly all: Map<Evt<T, Strict>, Function[]>;
    constructor(all?: any[] | Map<any, any>);
    on<K extends Evt<T, Strict>>(event: K, callback: CallbackListen<T, K>): this;
    off<K extends Evt<T, Strict>>(event: K, callback?: CallbackListen<T, K>): this;
    emit<K extends Evt<T, Strict>>(event: K, ...args: CallbackEmit<T, K>): this;
    once<K extends Evt<T, Strict>>(event: K, callback: CallbackListen<T, K>): this;
    [Symbol.iterator](): Generator<[Evt<T, Strict>, Function[]], void, unknown>;
}
declare class Signal<T extends (...args: any[]) => any = () => void> {
    all: Set<Function>;
    constructor(all?: any[] | Set<Function>);
    on(callback: T): this;
    off(callback: T): this;
    emit(...args: Parameters<T>): this;
    once(callback: T): this;
}
declare class DebouncedSignal<T extends (...args: any[]) => any> extends Signal<T> {
    private timer;
    readonly delay: number;
    constructor(delay_ms: number);
    forceEmit(...args: Parameters<T>): this;
    emit(...args: Parameters<T>): this;
    cancel(): void;
}
declare class State<T> {
    private _value;
    readonly change: Signal<(value: T, old_value: T) => void>;
    constructor(_value: T);
    protected shouldUpdate(value: T): boolean;
    protected transform(value: T): T;
    get(): T;
    set(next: T): void;
    value(): T;
    value(value: T): this;
}
export { Emitter as default, Emitter, Signal, DebouncedSignal, State };
export type { EmitterEvents, Evt, CallbackListen, CallbackEmit };
