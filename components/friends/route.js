const auth = require('../../config/auth');
const { addFriend, getFriends, getFriendsByEmail } = require('./controller');

const _addFriend = (app, polyglot) => {
	app.route('/api/friends')
		.all(auth.authenticate())
		.post((req, res, next) => addFriend(req, res, next, polyglot));
};

const _getFriends = (app, polyglot) => {
	app.route('/api/friends')
		.all(auth.authenticate())
		.get((req, res, next) => getFriends(req, res, next, polyglot));
};

const _getFriendsByEmail = (app, polyglot) => {
	app.route('/api/friends/by_email')
		.all(auth.authenticate())
		.get((req, res, next) => getFriendsByEmail(req, res, next, polyglot));
};

module.exports = (app, polyglot) => {
	_addFriend(app, polyglot);
	_getFriends(app, polyglot);
	_getFriendsByEmail(app, polyglot);
};
