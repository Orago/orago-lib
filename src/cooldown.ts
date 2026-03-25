class Cooldown {
	public last: number = 0;

	constructor(public duration: number) {
		this.duration = duration;
	}

	ready(): boolean {
		return this.last + this.duration < performance.now();
	}

	do() {
		if (this.ready() != true) {
			return false;
		}

		this.last = performance.now();
		return true;
	}

	remaining() {
		return Math.max(this.duration - (performance.now() - this.last), 0);
	}
}

class RateLimiter {
	public timestamps: number[] = [];
	public max_calls: number;
	public interval: number;

	constructor(max_calls: number, interval_in_ms: number) {
		this.max_calls = max_calls;
		this.interval = interval_in_ms;
	}

	tick() {
		const now = Date.now();

		// Remove timestamps older than the interval
		this.timestamps = this.timestamps.filter(
			(timestamp) => now - timestamp < this.interval
		);
	}

	ready(): boolean {
		this.tick();
		return this.timestamps.length < this.max_calls;
	}

	recordCall() {
		this.timestamps.push(Date.now());
	}

	do(): boolean {
		if (this.ready()) {
			this.recordCall();
			return true;
		} else {
			// console.warn('Rate limit exceeded. Try again later.');
			return false;
		}
	}

	remaining(): number {
		const now = Date.now();
		this.tick();

		const calls = this.timestamps.sort((a, b) => a - b);

		if (calls.length < this.max_calls) {
			return 0;
		}

		const oldest_call = calls[0];
		return Math.max(0, this.interval - (now - oldest_call));
	}
}

class SignedRateLimiter<T> {
	private call_timestamps: [value: T, time: number][] = [];
	private max_calls: number;
	private interval: number;

	constructor(max_calls: number, interval_in_ms: number) {
		this.max_calls = max_calls;
		this.interval = interval_in_ms;
	}

	clear() {
		this.call_timestamps = [];
	}

	private tick() {
		const now = Date.now();

		// Remove timestamps older than the interval
		this.call_timestamps = this.call_timestamps.filter(
			([_, timestamp]) => now - timestamp < this.interval
		);
	}

	clearID(id: T) {
		this.call_timestamps = this.call_timestamps.filter(
			([oid]) => id != oid
		);

		this.tick();
	}

	ready(id: T): boolean {
		this.tick();

		return (
			this.call_timestamps.filter(([oid]) => id == oid).length <
			this.max_calls
		);
	}

	recordCall(id: T) {
		this.call_timestamps.push([id, Date.now()]);
	}

	do(id: T): boolean {
		if (this.ready(id)) {
			this.recordCall(id);
			return true;
		} else {
			// console.warn('Rate limit exceeded. Try again later.');
			return false;
		}
	}

	remaining(id: T): number {
		const now = Date.now();
		this.tick();

		const calls = this.call_timestamps
			.filter(([oid]) => oid === id)
			.map(([_, timestamp]) => timestamp)
			.sort((a, b) => a - b);

		if (calls.length < this.max_calls) {
			return 0;
		}

		const oldest_call = calls[0];
		return Math.max(0, this.interval - (now - oldest_call));
	}
}

class WarmVariable<T> {
	private cooldown: Cooldown;
	private cached?: T;
	constructor(time: number, private callback: () => Promise<T> | T) {
		this.cooldown = new Cooldown(time);
		this.callback = callback;
	}

	async force(): Promise<T> {
		return (this.cached = await this.callback());
	}

	async get(): Promise<T> {
		if (this.cooldown.do() || this.cached == undefined) {
			return this.force();
		} else {
			return this.cached;
		}
	}
}

export { Cooldown, RateLimiter, SignedRateLimiter, WarmVariable };
