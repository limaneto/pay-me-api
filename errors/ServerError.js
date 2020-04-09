const BaseError = require('./BaseError');

// TODO usar polyglot
class ServerError extends BaseError {
	constructor() {
		super('Servidor está momentaneamente indisponível');
		this.code = 'server-error';
	}
	getStatusCode() {
		return 500;
	}
}

module.exports = ServerError;
