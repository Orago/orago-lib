"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.default = void 0;
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
exports.default = Status;
exports.Status = Status;
