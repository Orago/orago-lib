
/**
 * @template E
 */
export default class TypedEmitter {
	/** @type {Map<string, Array<import('./e.js').MessageFn<any>>>} */
	all = new Map();

	/** @param {Array<any> | Map<any, any> | object} [all] */
	constructor(all) {
		if (all instanceof Map) {
			this.all = all;
		} else if (Array.isArray(all)) {
			this.all = new Map(all);
		} else if (typeof all === 'object') {
			this.all = new Map();

			for (const [event, handler_s] of Object.entries(all)) {
				if (typeof handler_s === 'function') {
					this.#on(event, handler_s);
				} else if (Array.isArray(handler_s)) {
					for (const handler of handler_s) {
						if (typeof handler === 'function') {
							this.#on(event, handler);
						}
					}
				}
			}
		}
	}

	/** @type {import('./e.js').SubTypeFn<E>} */
	#on(event, handler) {
		const handlers = this.all.get(event);

		if (handlers) {
			handlers.push(handler);
		} else {
			this.all.set(event, [handler]);
		}

		return this;
	}

	/** @type {import('./e.js').PubTypeFn<E>} */
	emit(event, ...args) {
		let handlers = this.all.get(event);

		if (handlers) {
			for (const handler of handlers.slice()) {
				// @ts-ignore
				handler(...args);
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