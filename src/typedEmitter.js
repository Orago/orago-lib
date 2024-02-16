
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
		} else if (typeof all === 'object'){
			this.all = new Map(Object.entries(all));
		}
	}

	/** @type {import('./e.js').SubTypeFn<E>} */
	on(event, handler) {
		const handlers = this.all.get(event);

		if (handlers) {
			handlers.push(handler);
		} else {
			this.all.set(event, [handler]);
		}

		return this;
	}

	/** @type {import('./e.js').SubTypeFn<E>} */
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

	/** @type {import('./e.js').PubTypeFn<E>} */
	emit(event, ...args) {
		let handlers = this.all.get(event);

		if (handlers) {
			for (const handler of handlers.slice()) {
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


const testEvents = {
	/**
	 * @param {string} e 
	 */
	cat(e) {

	},

	/**
	 * @param {number} n
	 * @param {string} [d]
	 */
	reload(n, d) {

	}
}

/** @type {TypedEmitter<testEvents>} */
const e = new TypedEmitter(testEvents);