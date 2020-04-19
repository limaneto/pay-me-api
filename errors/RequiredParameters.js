const BaseError = require('./BaseError');

class RequiredParameters extends BaseError {
	constructor(fields, message) {
		super(message || 'One or more parameters are missing.');
		this.fields = fields;
		this.code = 'required-parameters';
	}
	getStatusCode() {
		return 400;
	}
}

module.exports = RequiredParameters;
