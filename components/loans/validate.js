const getErrorObject = (field) => {
	return {
		type: 'notNull Violation',
		path: field,
	};
};

const requiredParamsValidator = (req, res, next) => {
	const { creditor_id, debtor_id, title, value } = req.body;
	if (creditor_id && debtor_id && title && value) {
		return next();
	}

	const error = {
		name: 'ValidationError',
		errors: []
	};

	if (!creditor_id) {
		error.errors.push(getErrorObject('creditor_id'))
	}
	if (!debtor_id) {
		error.errors.push(getErrorObject('debtor_id'))
	}
	if (!title) {
		error.errors.push(getErrorObject('title'))
	}
	if (!value) {
		error.errors.push(getErrorObject('value'))
	}
	return next(error);
};

module.exports = { requiredParamsValidator };
