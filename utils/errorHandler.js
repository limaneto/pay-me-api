/* eslint-disable no-unused-vars */
const InvalidParameters = require('../errors/InvalidParameters');


const messages = {
	ObjectID: path => `${path} is not a valid ID.`,
	required: path => `${path} is a required field.`,
};


function handleInvalidParameterError(errors) {
	const errorKeys = Object.keys(errors);
	const fields = errorKeys.reduce((acc, key) => {
		const error = errors[key];
		acc[key] = messages[error.kind](error.path);
		return acc;
	}, {});
	return { error: new InvalidParameters(fields) };
}

function getError(error) {
	if (error.name === 'ValidationError') {
		return handleInvalidParameterError(error.errors);
	}
}


module.exports = (app) => {
	app.use((err, req, res, next) => {
		const error = getError(err);
		res.status(400).send(error);
	});
};
