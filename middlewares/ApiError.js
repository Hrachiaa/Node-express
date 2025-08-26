class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    static badRequest(msg) {
        return new ApiError(400, msg);
    }
    static notFound(msg) {
        return new ApiError(404, msg);
    }
    static forbidden(msg) {
        return new ApiError(403, msg);
    }
}
module.exports = ApiError;
