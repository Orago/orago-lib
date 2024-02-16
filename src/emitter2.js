/**
 * @template T
 */
export default class Emitter {
	/** @type {Map<string, Array<T>>} */
	all = new Map();

	/** @param {Array<[string, T]> | Map<string, T>} [all] */
	constructor(all) {
		if (all instanceof Map) {
			this.all = all;
		} else if (Array.isArray(all)) {
			this.all = new Map(all);
		}
	}

	/**
	 * Adds a listener
	 * @param {string} event Event Name
	 * @param {T} handler Callback
	 * @returns {this}
	 */
	on(event, handler) {
		const handlers = this.all.get(event);

		if (handlers) {
			handlers.push(handler);
		} else {
			this.all.set(event, [handler]);
		}

		return this;
	}

	/**
	 * disables a listener
	 * @param {string} event Event Name
	 * @param {T} handler Callback
	 * @returns {this}
	 */
	off(event, handler) {
		const handlers = this.all.get(event);

		if (handlers) {
			if (handler) {
				const index = handlers.indexOf(handler);

				if (index !== -1) {
					handlers.splice(index, 1);
				}
			} else {
				this.all.set(event, []);
			}
		}

		return this;
	}

	/**
	 * Notifies all active listeners
	 * @param {string} event Event Name
	 * @param {...any} args Arguments
	 * @returns {this}
	 */
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

	/**
	 * Export
	 * @yields {[string, Array<T>]}
	 */
	*[Symbol.iterator]() {
		for (const entry of this.all.entries()) {
			yield entry;
		}
	}
};
