export class StatusResponse {
	status: boolean = false;
	response: string = '';

	constructor(response: string) {
		if (typeof response === 'string') {
			this.response = response;
		}
	}
}

export class Success<Data = void> extends StatusResponse {
	status: true = true;
	data?: Data;

	constructor(response: string = 'Success!', data?: Data) {
		super(response);

		if (data != undefined) {
			this.data = data;
		}
	}
}

export class Error<Data = void> extends StatusResponse {
	status: false = false;
	data?: Data;

	constructor(response: string = 'Error!', data?: Data) {
		super(response);

		if (data != undefined) {
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