const generateMessage = (polyglot,type, field) => {
	return polyglot.t(type, { field: polyglot.t(field) })
};

module.exports = {
	generateMessage
};
