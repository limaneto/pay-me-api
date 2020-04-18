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

const getFriendsBaseParams = (page, limit) => {
	page = parseInt(page);
	limit = parseInt(limit);
	return {
		order: [['firstName', 'ASC']],
		limit: limit + 1,
		offset: limit * (page - 1),
		attributes: ['id', 'fullName', 'firstName', 'lastName', 'email'],
		joinTableAttributes: []
	};
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

const getFriendsByEmail = async (req, res, next) => {
	const { Op } = models.Sequelize;
	const { user } = req;
	let { page = 1, limit = PAGINATION.LIMIT, search } = req.query;

	try {
		const friends = await user.getFriends({
			where: {
				email: {
					[Op.substring]: search,
				}
			},
			...getFriendsBaseParams(page, limit),
		});
		const data = handleData(friends, req.route.path, { page, limit, search });
		return res.status(200).send(data);
	} catch (err) {
		return next(err);
	}
};

const getFriends = async (req, res, next) => {
	const { user } = req;
	let { page = 1, limit = PAGINATION.LIMIT } = req.query;

	try {
		const friends = await user.getFriends({ ...getFriendsBaseParams(page, limit) });
		const data = handleData(friends, req.route.path, { page, limit });
		res.status(200).send(data);
	} catch(err) {
		return next(err);
	}
};

module.exports = { addFriend, getFriends, getFriendsByEmail };
