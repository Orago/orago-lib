declare class Cooldown {
    duration: number;
    last: number;
    constructor(duration: number);
    ready(): boolean;
    do(): boolean;
    remaining(): number;
}
declare class RateLimiter {
    timestamps: number[];
    max_calls: number;
    interval: number;
    constructor(max_calls: number, interval_in_ms: number);
    tick(): void;
    ready(): boolean;
    recordCall(): void;
    do(): boolean;
    remaining(): number;
}
declare class SignedRateLimiter<T> {
    private call_timestamps;
    private max_calls;
    private interval;
    constructor(max_calls: number, interval_in_ms: number);
    clear(): void;
    private tick;
    clearID(id: T): void;
    ready(id: T): boolean;
    recordCall(id: T): void;
    do(id: T): boolean;
    remaining(id: T): number;
}
declare class WarmVariable<T> {
    private callback;
    private cooldown;
    private cached?;
    constructor(time: number, callback: () => Promise<T> | T);
    force(): Promise<T>;
    get(): Promise<T>;
}
export { Cooldown, RateLimiter, SignedRateLimiter, WarmVariable };
