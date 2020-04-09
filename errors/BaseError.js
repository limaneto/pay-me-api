class BaseError extends Error {
	constructor(statusCode = 400, message) {
		super();
		this.statusCode = statusCode;
		this.message = message;
		Error.captureStackTrace(this, this.constructor.name);
	}
}

module.exports = BaseError;
