type NonVoid<T> = T extends void ? undefined : T;

interface StatusLike<S extends boolean = boolean, Data = any> {
	data: NonVoid<Data>;
	status: S;
	text: string;
}

class Status<S extends boolean = boolean, Data = any> {
	static Success = class Success<Data = any> extends Status<true, Data> {
		constructor(text: string = "Success!", data?: NonVoid<Data>) {
			super(true, text, data);
		}
	};

	static Error = class Error<Data = any> extends Status<false, Data> {
		constructor(text: string = "Error!", data?: NonVoid<Data>) {
			super(false, text, data);
		}
	};

	data: NonVoid<Data>;
	constructor(
		public status: S,
		public text: string = "Status Response",
		data?: NonVoid<Data>
	) {
		this.data = data!;
	}
}

export { Status as default, Status, StatusLike };
