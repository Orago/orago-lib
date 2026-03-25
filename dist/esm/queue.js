export class PromiseQueue {
    queue = [];
    is_processing = false;
    async add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    resolve(await task());
                }
                catch (error) {
                    reject(error);
                }
            });
            this.processQueue();
        });
    }
    async processQueue() {
        if (this.is_processing || this.queue.length === 0) {
            return;
        }
        this.is_processing = true;
        const task = this.queue.shift();
        if (task) {
            await task();
        }
        this.is_processing = false;
        this.processQueue();
    }
}
