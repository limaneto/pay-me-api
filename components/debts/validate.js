const InvalidParameters = require('../../errors/InvalidParameters');

function hasCreditor(requestBody) {
	return !!requestBody.creditor;
}

function hasDebtor(requestBody) {
	return !!requestBody.debtor;
}

function addDebtValidator(req, res, next) {
	const { body } = req;
	if (hasCreditor(body) || hasDebtor(body)) {
		return next();
	}

	const error = new InvalidParameters({
		creditor: 'Inform Creditor if Debtor is empty.',
		debtor: 'Inform Debtor if Creditor is empty.',
	}, 'Creditor or debtor is required.');
	res.status(400).send({ error });
}

module.exports = { addDebtValidator };
