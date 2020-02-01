class APIError {
    static unauthorized() {
        return new APIError('Unauthorized', 403);
    }

    constructor(message, status = 500, code) {
        this.name = 'APIError';
        this.message = message;
        this.status = status;
        this.code = code;
        Error.captureStackTrace(this, APIError);
    }
};

module.exports = APIError;
