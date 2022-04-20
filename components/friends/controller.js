import { User } from '../../models';
const { PAGINATION, POLYGLOT, DATABASE_FIELDS } = require('../../utils/constants');
const { generateMessage, handleData } = require('../../utils/helpers');

const addFriend = async ({ friendId, polyglot, user }) => {
	try {
		const userWithFriendId = await User.findByPk(friendId);
		if (!userWithFriendId) {
			return {
				__typeName: 'Error',
				error: {
					message: generateMessage(polyglot, POLYGLOT.NOT_FOUND, DATABASE_FIELDS.USER),
				},
			};
		}
		await user.addFriend(userWithFriendId);
		return {
			__typeName: 'Message',
			message: generateMessage(polyglot, POLYGLOT.REGISTERED, DATABASE_FIELDS.FRIEND),
		};
	} catch (err) {
		if (err.name && err.name.includes('UniqueConstraintError')) {
			return {
				__typeError: 'Error',
				error: {
					message: generateMessage(polyglot, POLYGLOT.ALREADY_FRIENDS),
				},
			};
		}
		return {
			__typeName: 'Error',
			error: { message: err.message },
		};
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
		const pagination = getFriendsBaseParams(parseInt(page, 10), parseInt(limit, 10));
		const friends = await user.getFriends({
			where: {
				email: {
					[Op.like]: `${search}%`,
				},
			},
			...pagination,
		});
		const data = handleData(friends, req.route.path, { page, limit, search });
		return res.status(200).send(data);
	} catch (err) {
		return next(err);
	}
};

const getFriends = async ({ page = 1, limit = PAGINATION.LIMIT, user }) => {
	try {
		return await user.getFriends({
			order: [[
				'firstName', 'ASC',
			]],
			limit,
			page,
			offset: limit * (page - 1),
		});
	} catch (err) {
		return err;
	}
};

module.exports = { addFriend, getFriends, getFriendsByEmail };
