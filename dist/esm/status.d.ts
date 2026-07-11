type NonVoid<T> = T extends void ? undefined : T;
interface StatusLike<S extends boolean = boolean, Data = any> {
    data: NonVoid<Data>;
    status: S;
    text: string;
}
declare class Status<S extends boolean = boolean, Data = any> {
    status: S;
    text: string;
    static Success: {
        new <Data_1 = any>(text?: string, data?: NonVoid<Data_1> | undefined): {
            data: NonVoid<Data_1>;
            status: true;
            text: string;
        };
        Success: any;
        Error: {
            new <Data_2 = any>(text?: string, data?: NonVoid<Data_2> | undefined): {
                data: NonVoid<Data_2>;
                status: false;
                text: string;
            };
            Success: any;
            Error: any;
        };
    };
    static Error: {
        new <Data_1 = any>(text?: string, data?: NonVoid<Data_1> | undefined): {
            data: NonVoid<Data_1>;
            status: false;
            text: string;
        };
        Success: {
            new <Data_2 = any>(text?: string, data?: NonVoid<Data_2> | undefined): {
                data: NonVoid<Data_2>;
                status: true;
                text: string;
            };
            Success: any;
            Error: any;
        };
        Error: any;
    };
    data: NonVoid<Data>;
    constructor(status: S, text?: string, data?: NonVoid<Data>);
}
export { Status as default, Status, StatusLike };
