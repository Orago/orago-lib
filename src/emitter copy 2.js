
/**
 * @template E
 */
export default class Emitter {
	/** @type {Map<string, Array<import('./e.d.ts').MessageFn<any>>>} */
	all = new Map();

	/**
	 * @type {Set<import('./e.d.ts').MessageFn<any>>}
	 */
	any = new Set();

	/** @param {Array<any> | Map<any, any>} [all] */
	constructor(all) {
		if (all instanceof Map) {
			this.all = all;
		} else if (Array.isArray(all)) {
			this.all = new Map(all);
		}
	}

	/** @type {import('./e.d.ts').SubTypeFn<E>} */
	on(event, handler) {
		const handlers = this.all.get(event);

		if (handlers) {
			handlers.push(handler);
		} else {
			this.all.set(event, [handler]);
		}

		return this;
	}

	/** @type {import('./e.d.ts').SubTypeFn<E>} */
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

	/** @type {import('./e.d.ts').PubTypeFn<E>} */
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

/**
 * @typedef {object} eh
 * @property {string} cat
 * @property {object} reload
 * @property {boolean} reload.all
 */

const testEvents = {
	cat: {

	},
	reload: 'g'
}

/** @type {Emitter<eh>} */
const e = new Emitter(Object.entries(testEvents));

e.emit(
	'reload',
	{
		
	}
);