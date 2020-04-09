const { InvalidParameters, ServerError } = require('../errors');
const { ERROR_TYPES, POLYGLOT } = require('../utils/constants');
const { generateMessage } = require('../utils/helpers');

function handleInvalidParameterError(errors, polyglot) {
	let fields = [];
	errors.forEach(error => {
		if (error.type === ERROR_TYPES.NOT_NULL) {
			fields.push({
				key: error.path,
				message: generateMessage(polyglot, POLYGLOT.FIELD_REQUIRED, error.path),
			})
		}

		if (error.type === ERROR_TYPES.VALIDATION) {
			fields.push({
				key: error.path,
				message: generateMessage(polyglot, POLYGLOT.FIELD_INVALID, error.path),
			})
		}
	});
	return new InvalidParameters(fields);
}

function getError(error, polyglot) {
	if (error.name.includes('ValidationError')) {
		return handleInvalidParameterError(error.errors, polyglot);
	}
	return new ServerError();
}


module.exports = (app, polyglot) => {
	app.use((err, req, res, next) => {
		const errors = getError(err, polyglot);
		return res.status(errors.getStatusCode()).send({ errors });
	});
};
