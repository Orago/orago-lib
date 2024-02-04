export default class Emitter {
	/** @type {Map<string, Array<Function>>} */
	all = new Map();

	/** @param {Array<any> | Map<any, any>} [all] */
	constructor(all) {
		if (all instanceof Map) {
			this.all = all;
		} else if (Array.isArray(all)) {
			this.all = new Map(all);
		}
	}

	/**
	 * Adds a listener
	 * @param {string} type Event Name
	 * @param {Function} handler Callback
	 * @returns {this}
	 */
	on(type, handler) {
		const handlers = this.all.get(type);

		if (handlers) {
			handlers.push(handler);
		}
		else {
			this.all.set(type, [handler]);
		}

		return this;
	}

	/**
	 * disables a listener
	 * @param {string} type Event Name
	 * @param {Function} handler Callback
	 * @returns {this}
	 */
	off(type, handler) {
		const handlers = this.all.get(type);

		if (handlers) {
			if (handler) {
				const index = handlers.indexOf(handler);

				if (index !== -1) {
					handlers.splice(index, 1);
				}
			}
			else this.all.set(type, []);
		}

		return this;
	}

	/**
	 * Notifies all active listeners
	 * @param {string} type Event Name
	 * @param {...any} args Arguments
	 * @returns {this}
	 */
	emit(type, ...args) {
		let handlers = this.all.get(type);

		if (handlers) {
			for (const handler of handlers.slice()) {
				handler(...args);
			}
		}

		if (handlers = this.all.get('*')) {
			for (const handler of handlers.slice()) {
				handler(type, ...args);
			}
		}

		return this;
	}

	/**
	 * Export
	 * @yields {string}
	 */
	*[Symbol.iterator]() {
		for (const entry of this.all.entries()) {
			yield entry;
		}
	}
};