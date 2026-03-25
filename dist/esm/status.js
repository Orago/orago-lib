class Status {
    status;
    text;
    static Success = class Success extends Status {
        constructor(text = "Success!", data) {
            super(true, text, data);
        }
    };
    static Error = class Error extends Status {
        constructor(text = "Error!", data) {
            super(false, text, data);
        }
    };
    data;
    constructor(status, text = "Status Response", data) {
        this.status = status;
        this.text = text;
        this.data = data;
    }
}
export { Status as default, Status };
