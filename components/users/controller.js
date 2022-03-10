const models = require('../../models');
const { DATABASE_FIELDS, POLYGLOT } = require('../../utils/constants');
const { generateMessage } = require('../../utils/helpers');

const login = async ({ email, password, polyglot }) => {
	try {
		const user = await models.User.findOne({ where: { email } });

		if (user) {
			const passwordCheck = await user.isPasswordValid(password);
			if (passwordCheck) {
				const newToken = user.generateJWT();
				return { message: generateMessage(polyglot, 'logged', 'user'), token: newToken };
			}
			return {
				errors: {
					fields: [{
						key: DATABASE_FIELDS.PASSWORD,
						message: generateMessage(polyglot, POLYGLOT.WRONG_PASSWORD),
					},
					],
				},
			};

		}
		return { errors: { message: generateMessage(polyglot, 'not-found', 'user') } };

	} catch (err) {
		// TODO add error handler
	}
};

const register = async ({ user, polyglot }) => {
	try {
		const newUser = await models.User.create(user);
		return { message: polyglot.t('registered', { field: polyglot.t('user') }), user: newUser.toAuthJSON() };
	} catch (err) {
		// TODO error handler
		console.log('err', err);
	}
};

module.exports = { register, login };
