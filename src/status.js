// @ts-check
export class StatusResponse {
	status = false;
	response = '';

	/**
	 * @param {string} response 
	 */
	constructor(response) {
		if (typeof response === 'string') {
			this.response = response;
		}
	}
}

export class Success extends StatusResponse {
	/** @type {true} */
	status = true;

	/** @type {object} */
	data = {};

	/**
	 * @param {string} [response] 
	 * @param {object} [data]
	 */
	constructor(response = 'Success!', data) {
		super(response);

		if (typeof data === 'object') {
			this.data = data;
		}
	}
}

export class Err extends StatusResponse {
	prototype = StatusResponse;

	/** @type {false} */
	status = false;

	/** @type {object} */
	data = {};

	/**
	 * @param {string} [response]
	 * @param {object} [data] 
	 */
	constructor(response = 'Error!', data) {
		super(response);

		if (typeof data === 'object') {
			this.data = data;
		}
	}
}

//#region //* Custom Status *//
/**
 * @template Type
 */
class CustomSuccess extends StatusResponse {
	/** @type {true} */
	status = true;

	/** @type {Type} */
	data;

	/**
	 * @param {string} response
	 * @param {Type} data
	 */
	constructor(response = 'Success!', data) {
		super(response);

		this.data = data;
	}
}

/**
 * @template Type
 */
class CustomErr extends StatusResponse {
	/** @type {false} */
	status = false;

	/** @type {Type} */
	data;

	/**
	 * @param {string} response
	 * @param {Type} data 
	 */
	constructor(response = 'Error!', data) {
		super(response);

		this.data = data;
	}
}


/**
 * @template Type
 */
export class CustomStatus {
	constructor() {
		const Parent = this.parent = class Parent {
			/** @type {boolean} */
			status = false;

			response = '';

			/** @type {Type} */
			data;

			/**
			 * 
			 * @param {boolean} status 
			 * @param {string} response 
			 * @param {Type} data 
			 */
			constructor(status, response, data) {
				this.status = status;
				this.response = response;
				this.data = data;
			}
		};

		this.Success = class extends Parent {
			/**
			 * @param {string} response
			 * @param {Type} data
			 */
			constructor(response = 'Success!', data) {
				super(true, response, data);
			}
		};

		/**
		 * @augments Parent<Type>
		 */
		this.Err = class extends this.parent {
			/** @type {false} */
			status = false;

			/** @type {Type} */
			data;

			/**
			 * @param {string} response
			 * @param {Type} data 
			 */
			constructor(response = 'Error!', data) {
				super(response);

				this.data = data;
			}
		}
	}
}

/**
 * @type {CustomStatus<{ name: string, alive: boolean }>}
 */
const catStatus = new CustomStatus();


const kitty1 = new catStatus.Success('Got cat', {
	name: 'Mr. Meow Meow',
	alive: true
});

const kitty2 = new catStatus.Err('Dead cat', {
	name: 'Orea'
});




//#endregion //* Custom Status *//

export default class Status extends StatusResponse {
	/** @type {object} */
	data = {};

	static Success = Success;
	static Err = Err;
}