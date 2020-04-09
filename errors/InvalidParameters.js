const BaseError = require('./BaseError');

class InvalidParameters extends BaseError {
	constructor(fields, message) {
		super(400, message || 'One or more parameters are invalid.');
		this.fields = fields;
		this.code = 'invalid-parameters';
	}
}

module.exports = InvalidParameters;
