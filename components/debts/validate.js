const ApiError = require('../../utils/ApiError');

function hasCreditor(requestBody) {
	return !!requestBody.creditor;
}

function hasDebitor(requestBody) {
	return !!requestBody.debtor;
}

function addDebtValidator(req, res, next) {
	const { body } = req;
	if (!hasCreditor(body) && !hasDebitor(body)) {
		const error = new ApiError('Pass at least a creditor or a debitor', 400);
		return next(error);
	}
	return next();
}

function genericValidator(req, res, next) {
	return next();
}

module.exports = { genericValidator, addDebtValidator };
