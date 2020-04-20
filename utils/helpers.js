const { BASE_URL } = require('./constants');

const generateMessage = (polyglot, type, field) => {
	if (field) {
		return polyglot.t(type, { field: polyglot.t(field) });
	}
	return polyglot.t(type);
};

const handleData = (results, path, { page, limit, search }) => {
	page = parseInt(page);
	limit = parseInt(limit);
	let url = `${BASE_URL}${path}?page=${page + 1}`;
	url = search ? `${url}&search=${search}` : url;
	const data = {
		count: results.length > limit ? results.length - 1 : results.length,
		results: [...results],
	};
	if (results.length > limit) {
		data.results.pop();
		data.next = results[results.length - 1] ? url : null;
	} else {
		data.next = null;
	}
	return data;
};

module.exports = {
	generateMessage,
	handleData,
};
