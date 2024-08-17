export class StatusResponse {
	status: boolean = false;
	response: string = '';

	constructor(response: string) {
		this.response = response;
	}
}

type NonVoid<T> = T extends void ? undefined : T;

export class Success<Data = void> extends StatusResponse {
	status: true = true;
	data: NonVoid<Data>;

	constructor(response: string = 'Success!', data?: NonVoid<Data>) {
		super(response);

		this.data = data as NonVoid<Data>;
	}
}

export class Error<Data = void> extends StatusResponse {
	status: false = false;
	data: NonVoid<Data>;

	constructor(response: string = 'Error!', data?: Data) {
		super(response);

		this.data = data as NonVoid<Data>;
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