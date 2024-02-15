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

export class Error extends StatusResponse {
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

/**
 * @template Type
 */
export class CustomStatus {
	constructor() {
		/**
		 * @param {boolean} status
		 * @param {string} response 
		 * @param {Type} data 
		 */
		function _response (status, response = 'Any', data){
			return {
				status,
				response,
				data
			}
		}

		/** @type {ReturnType<_response>} */
		this.out;

		/**
		 * @param {string} response 
		 * @param {Type} data 
		 */
		this.Success = function (response = 'Success', data){
			return _response(true, response, data);
		}

		/**
		 * @param {string} response 
		 * @param {Type} data 
		 */
		this.Error = function (response = 'Err', data){
			return _response(false, response, data);
		}
	}
}

//#endregion //* Custom Status *//

export default class Status extends StatusResponse {
	/** @type {object} */
	data = {};

	static Success = Success;
	static Error = Error;
}