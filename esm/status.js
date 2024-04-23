export class StatusResponse {
    constructor(response) {
        this.status = false;
        this.response = '';
        if (typeof response === 'string') {
            this.response = response;
        }
    }
}
export class Success extends StatusResponse {
    constructor(response = 'Success!', data) {
        super(response);
        this.status = true;
        if (data != undefined) {
            this.data = data;
        }
    }
}
export class Error extends StatusResponse {
    constructor(response = 'Error!', data) {
        super(response);
        this.status = false;
        if (data != undefined) {
            this.data = data;
        }
    }
}
function _response(status, response = 'Any', data) {
    return {
        status,
        response,
        data
    };
}
export class CustomStatus {
    Success(response = 'Success', data) {
        return _response(true, response, data);
    }
    Error(response = 'Err', data) {
        return _response(false, response, data);
    }
}
class Status extends StatusResponse {
    constructor() {
        super(...arguments);
        this.data = {};
    }
}
Status.Success = Success;
Status.Error = Error;
export default Status;
