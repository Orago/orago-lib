"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomStatus = exports.Error = exports.Success = exports.StatusResponse = void 0;
class StatusResponse {
    constructor(response) {
        this.status = false;
        this.response = '';
        if (typeof response === 'string') {
            this.response = response;
        }
    }
}
exports.StatusResponse = StatusResponse;
class Success extends StatusResponse {
    constructor(response = 'Success!', data) {
        super(response);
        this.status = true;
        if (data != undefined) {
            this.data = data;
        }
    }
}
exports.Success = Success;
class Error extends StatusResponse {
    constructor(response = 'Error!', data) {
        super(response);
        this.status = false;
        if (data != undefined) {
            this.data = data;
        }
    }
}
exports.Error = Error;
function _response(status, response = 'Any', data) {
    return {
        status,
        response,
        data
    };
}
class CustomStatus {
    Success(response = 'Success', data) {
        return _response(true, response, data);
    }
    Error(response = 'Err', data) {
        return _response(false, response, data);
    }
}
exports.CustomStatus = CustomStatus;
class Status extends StatusResponse {
    constructor() {
        super(...arguments);
        this.data = {};
    }
}
Status.Success = Success;
Status.Error = Error;
exports.default = Status;
