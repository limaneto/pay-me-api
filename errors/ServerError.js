const BaseError = require('./BaseError');

// TODO usar polyglot
class ServerError extends BaseError {
	constructor() {
		super('Servidor está momentaneamente indisponível')
	}
}

module.exports = ServerError;
