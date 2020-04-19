const loans = require('../components/loans/route');
const pays = require('../components/pays/route');
const users = require('../components/users/route');
const friends = require('../components/friends/route');

module.exports = (app, polyglot) => {
	loans(app, polyglot);
	pays(app, polyglot);
	friends(app, polyglot);
	users(app, polyglot);
};
