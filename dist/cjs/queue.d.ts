export declare class PromiseQueue {
    private queue;
    private is_processing;
    add<T>(task: () => Promise<T>): Promise<T>;
    private processQueue;
}
export declare class QueueChain {
    queue: Promise<void>;
    isDone(): Promise<void>;
    enqueue<T>(task: () => Promise<T> | T): Promise<T>;
}
export declare class QueueRef<S> {
    private source;
    queue: Promise<void>;
    constructor(source: S);
    isDone(): Promise<void>;
    enqueue<T>(task: (img: S) => Promise<T> | T): Promise<T>;
}
