const debt = require('../components/debts/route');
const user = require('../components/user/route');

module.exports = (app, polyglot) => {
	debt(app, polyglot);
	user(app, polyglot);
};
