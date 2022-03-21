import { DATABASE_FIELDS, POLYGLOT } from '../../utils/constants';
import { generateMessage } from '../../utils/helpers';
import User from '../../models/User';

const login = async ({ email, password, polyglot }) => {
	try {
		const user = await User.findOne({ where: { email } });

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
		const newUser = await User.create(user);
		return { message: polyglot.t('registered', { field: polyglot.t('user') }), user: newUser.toAuthJSON() };
	} catch (err) {
		// TODO error handler
		console.log('err', err);
	}
};

module.exports = { register, login };
