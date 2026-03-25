export declare class PromiseQueue {
    private queue;
    private is_processing;
    add<T>(task: () => Promise<T>): Promise<T>;
    private processQueue;
}
