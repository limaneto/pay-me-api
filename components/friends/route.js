const auth = require('../../config/auth');
const { addFriend, getAllFriends } = require('./controller');

const _addFriend = (app, polyglot) => {
	app.route('/api/friends')
		.all(auth.authenticate())
		.post((req, res, next) => addFriend(req, res, next, polyglot));
};

const _getAllFriends = (app, polyglot) => {
	app.route('/api/friends/all')
		.all(auth.authenticate())
		.get((req, res, next) => getAllFriends(req, res, next, polyglot));
};

module.exports = (app, polyglot) => {
	_addFriend(app, polyglot);
	_getAllFriends(app, polyglot)
};
