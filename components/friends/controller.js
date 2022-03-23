import { User } from '../../models';
const { PAGINATION, POLYGLOT, DATABASE_FIELDS } = require('../../utils/constants');
const { generateMessage, handleData } = require('../../utils/helpers');

const addFriend = async ({ friendId, polyglot, user }) => {
	if (!friendId) {
		return {
			errors: {
				fields: [{
					key: DATABASE_FIELDS.FRIEND_ID,
					message: generateMessage(polyglot, POLYGLOT.FIELD_REQUIRED, DATABASE_FIELDS.FRIEND_ID),
				}],
			},
		};
	}
	try {
		const friend = await models.User.findByPk(friendId);
		if (!friend) {
			return {
				errors: {
					message: generateMessage(polyglot, POLYGLOT.NOT_FOUND, DATABASE_FIELDS.USER),
				},
			};
		}
		await user.addFriend(friend);
		return {
			message: generateMessage(polyglot, POLYGLOT.REGISTERED, DATABASE_FIELDS.FRIEND),
		};
	} catch (err) {
		if (err.name && err.name.includes('UniqueConstraintError')) {
			return {
				errors: {
					message: generateMessage(polyglot, POLYGLOT.ALREADY_FRIENDS),
				},
			};
		}
		return { errors: { message: err.message } };
	}
};

const getFriendsBaseParams = (page, limit) => ({
	order: [['firstName', 'ASC']],
	limit: limit + 1,
	offset: limit * (page - 1),
	attributes: ['id', 'fullName', 'firstName', 'lastName', 'email'],
	joinTableAttributes: [],
});

const getFriendsByEmail = async (req, res, next) => {
	const { Op } = models.Sequelize;
	const { user } = req;
	const { page = 1, limit = PAGINATION.LIMIT, search } = req.query;

	try {
		const friends = await user.getFriends({
			where: {
				email: {
					[Op.like]: `${search}%`,
				},
			},
			...getFriendsBaseParams(parseInt(page, 10), parseInt(limit, 10)),
		});
		const data = handleData(friends, req.route.path, { page, limit, search });
		return res.status(200).send(data);
	} catch (err) {
		return next(err);
	}
};

const getFriends = async (req, res, next) => {
	const { user } = req;
	const { page = 1, limit = PAGINATION.LIMIT } = req.query;

	try {
		const friends = await user.getFriends({ ...getFriendsBaseParams(page, limit) });
		const data = handleData(friends, req.route.path, { page, limit });
		res.status(200).send(data);
	} catch (err) {
		return next(err);
	}
};

module.exports = { addFriend, getFriends, getFriendsByEmail };
