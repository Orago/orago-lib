export class PromiseQueue {
	private queue: (() => Promise<any>)[] = [];
	private is_processing = false;

	async add<T>(task: () => Promise<T>): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			this.queue.push(async () => {
				try {
					resolve(await task());
				} catch (error) {
					reject(error);
				}
			});
			this.processQueue();
		});
	}

	private async processQueue() {
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

export class QueueChain {
	public queue = Promise.resolve();

	public async isDone(): Promise<void> {
		let current: Promise<void>;

		do {
			current = this.queue;
			await current;
		} while (current !== this.queue);
	}

	public enqueue<T>(task: () => Promise<T> | T): Promise<T> {
		const next = this.queue.then(() => task());
		this.queue = next.then(() => undefined);
		return next;
	}
}

export class QueueRef<S> {
	public queue = Promise.resolve();
	constructor(private source: S) {}

	public async isDone(): Promise<void> {
		let current: Promise<void>;

		do {
			current = this.queue;
			await current;
		} while (current !== this.queue);
	}

	public enqueue<T>(task: (img: S) => Promise<T> | T): Promise<T> {
		const next = this.queue.then(() => task(this.source));
		this.queue = next.then(() => undefined);
		return next;
	}
}
