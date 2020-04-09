class BaseError extends Error {
	constructor(message) {
		super();
		this.message = message;
		Error.captureStackTrace(this, this.constructor.name);
	}
}

module.exports = BaseError;
