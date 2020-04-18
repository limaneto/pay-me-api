const debt = require('../components/pays/route');
const user = require('../components/user/route');
const friends = require('../components/friends/route');

module.exports = (app, polyglot) => {
	debt(app, polyglot);
	friends(app, polyglot);
	user(app, polyglot);
};
