export class StatusResponse {
	status = false;
	response = '';

	constructor(response: string) {
		if (typeof response === 'string') {
			this.response = response;
		}
	}
}

export class Success extends StatusResponse {
	status: true = true;
	data: object = {};

	constructor(response: string = 'Success!', data: object) {
		super(response);

		if (typeof data === 'object') {
			this.data = data;
		}
	}
}

export class Error extends StatusResponse {
	prototype = StatusResponse;
	status: false = false;
	data: object = {};

	constructor(response: string = 'Error!', data: object) {
		super(response);

		if (typeof data === 'object') {
			this.data = data;
		}
	}
}

function _response<Type>(status: boolean, response: string = 'Any', data: Type) {
	return {
		status,
		response,
		data
	}
}

export class CustomStatus<Type> {
	// out: ReturnType<typeof _response<Type>>

	Success(response: string = 'Success', data: Type) {
		return _response<Type>(true, response, data);
	}

	Error(response: string = 'Err', data: Type) {
		return _response<Type>(false, response, data);
	}
}

//#endregion //* Custom Status *//

export default class Status extends StatusResponse {
	static Success = Success;
	static Error = Error;
	
	data: object = {};
}