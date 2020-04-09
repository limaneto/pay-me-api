const BaseError = require('./BaseError');

class InvalidParameters extends BaseError {
	constructor(fields, message) {
		super(message || 'One or more parameters are invalid.');
		this.fields = fields;
		this.code = 'invalid-parameters';
	}
	getStatusCode() {
		return 400;
	}
}

module.exports = InvalidParameters;
