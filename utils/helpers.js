const generateMessage = (polyglot, type, field) => {
	if (field) {
		return polyglot.t(type, { field: polyglot.t(field) });
	}
	return polyglot.t(type);
};

module.exports = {
	generateMessage,
};
