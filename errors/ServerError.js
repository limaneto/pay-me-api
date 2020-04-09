const BaseError = require('./BaseError');

// TODO usar polyglot
class ServerError extends BaseError {
	constructor() {
		super(500, 'Servidor está momentaneamente indisponível');
		this.code = 'server-error';
	}
}

module.exports = ServerError;
