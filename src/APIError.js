class APIError {
    static unauthenticated() {
        return new APIError('Unauthenticated', 401);
    }
    static unauthorized() {
        return new APIError('Unauthorized', 403);
    }
    static notFound() {
        return new APIError('Resource not found', 404);
    }
    static invalidRequest() {
        return new APIError('Invalid request', 400);
    }

    static duplicate(uid) {
        return new APIError(
            `Resource with unique identifier already exists${uid ? `: '${uid}'` : ''}`,
            409
        );
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
