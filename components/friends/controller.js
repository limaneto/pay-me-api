import { Op } from 'sequelize';
import { User } from '../../models';

const { PAGINATION, POLYGLOT, DATABASE_FIELDS } = require('../../utils/constants');
const { generateMessage } = require('../../utils/helpers');

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

const getFriendsByEmail = async ({ search, page = 1, limit = PAGINATION.LIMIT, user }) => {
	try {
		return await user.getFriends({
			where: {
				email: {
					[Op.like]: `${search}%`,
				},
			},
			order: [['firstName', 'ASC']],
			limit,
			offset: limit * (page - 1),
			joinTableAttributes: [],
		});
	} catch (err) {
		return err;
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
