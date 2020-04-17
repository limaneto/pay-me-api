const models = require('../../models');
const { POLYGLOT, DATABASE_FIELDS } = require('../../utils/constants');
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

module.exports = { addFriend };
