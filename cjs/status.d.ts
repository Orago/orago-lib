export declare class StatusResponse {
    status: boolean;
    response: string;
    constructor(response: string);
}
type NonVoid<T> = T extends void ? undefined : T;
export declare class Success<Data = void> extends StatusResponse {
    status: true;
    data: NonVoid<Data>;
    constructor(response?: string, data?: NonVoid<Data>);
}
export declare class Error<Data = void> extends StatusResponse {
    status: false;
    data: NonVoid<Data>;
    constructor(response?: string, data?: Data);
}
export declare class CustomStatus<Type> {
    Success(response: string | undefined, data: Type): {
        status: boolean;
        response: string;
        data: Type;
    };
    Error(response: string | undefined, data: Type): {
        status: boolean;
        response: string;
        data: Type;
    };
}
export default class Status extends StatusResponse {
    static Success: typeof Success;
    static Error: typeof Error;
    data: object;
}
export {};
