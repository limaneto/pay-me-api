const debt = require('../components/pays/route');
const user = require('../components/user/route');

module.exports = (app, polyglot) => {
	debt(app, polyglot);
	user(app, polyglot);
};
