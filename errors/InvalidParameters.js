const BaseError = require('./BaseError');

class InvalidParameters extends BaseError {
	constructor(fields, message) {
		super(message || 'One or more parameters are invalid.', 400);
		this.fields = fields;
		this.code = 'invalid-parameters';
	}
}

module.exports = InvalidParameters;
