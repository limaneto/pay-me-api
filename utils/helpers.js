const generateMessage = (polyglot, type, field) => {
	if (field) {
		return polyglot.t(type, { field: polyglot.t(field) });
	}
	return polyglot.t(type);
};

const serializeDate = (date) => {
	const offset = date.getTimezoneOffset();
	const dateReassigned = new Date(date.getTime() + (offset * 60 * 1000));
	return dateReassigned.toISOString().split('T')[0];
};

module.exports = {
	generateMessage,
	serializeDate,
};
