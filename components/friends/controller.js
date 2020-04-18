const models = require('../../models');
const { PAGINATION, BASE_URL, POLYGLOT, DATABASE_FIELDS } = require('../../utils/constants');
const { generateMessage } = require('../../utils/helpers');

const addFriend = async (req, res, next, polyglot) => {
	const { user, body: { friendId } } = req;
	if (!friendId) {
		res.status(400).send({ errors: { fields: [{
					key: DATABASE_FIELDS.FRIEND_ID,
					message: generateMessage(polyglot, POLYGLOT.FIELD_REQUIRED, DATABASE_FIELDS.FRIEND_ID)
				}] } });
	}
	try {
		const friend = await models.User.findByPk(friendId);
		if (!friend) {
			return res.status(404).send({ errors: { message: generateMessage(polyglot, POLYGLOT.NOT_FOUND, DATABASE_FIELDS.USER) } })
		}
		await user.addFriend(friend);
		return res.status(200).send({ message: generateMessage(polyglot, POLYGLOT.REGISTERED, DATABASE_FIELDS.FRIEND) });
	} catch(err) {
		if (err.name && err.name.includes('UniqueConstraintError')) {
			return res.status(400).send({ errors: { message: generateMessage(polyglot, POLYGLOT.ALREADY_FRIENDS) } })
		}
		return next(err);
	}
};

const getFriends = async (req, res, next) => {
	const { user } = req;
	let { page = 1, limit = PAGINATION.LIMIT } = req.query;
	page = parseInt(page);
	limit = parseInt(limit);
	try {
		const friends = await user.getFriends({
			limit: limit + 1,
			offset: limit * (page - 1),
			attributes: ['id', 'fullName', 'firstName', 'lastName', 'email'],
			joinTableAttributes: []
		});

		const data = {
			count: friends.length > limit ? friends.length - 1 : friends.length,
			results: [...friends],
		};
		if (friends.length > limit) {
			data.results.pop();
			data.next = friends[friends.length - 1] ? `${BASE_URL}/api/friends/all?page=${parseInt(page) + 1}` : null;
		} else {
			data.next = null;
		}
		res.status(200).send(data);
	} catch(err) {
		return next(err);
	}
};

module.exports = { addFriend, getFriends };
