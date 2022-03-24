import { DATABASE_FIELDS, POLYGLOT, POLYGLOT_SEQUELIZE } from '../../utils/constants';
import { generateMessage } from '../../utils/helpers';
import { User } from '../../models';

const login = async ({ email, password, polyglot }) => {
	try {
		const user = await User.findOne({ where: { email } });

		if (user) {
			const passwordCheck = await user.isPasswordValid(password);
			if (passwordCheck) {
				const newToken = user.generateJWT();
				return {
					__typeName: 'Login',
					message: generateMessage(polyglot, 'logged', 'user'),
					token: newToken,
				};
			}
			return {
				__typeName: 'Errors',
				errors: [{
					key: DATABASE_FIELDS.PASSWORD,
					message: generateMessage(polyglot, POLYGLOT.WRONG_PASSWORD),
				}],
			};

		}
		return {
			__typeName: 'Error',
			error: {
				message: generateMessage(polyglot, 'not-found', 'user'),
			},
		};

	} catch (err) {
		// TODO add error handler
	}
};

const register = async ({ user, polyglot }) => {
	try {
		const newUser = await User.create(user);
		return {
			__typeName: 'Register',
			message: polyglot.t('registered', { field: polyglot.t('user') }),
			user: newUser.toAuthJSON(),
		};
	} catch (SequelizeValidationError) {
		const { errors } = SequelizeValidationError;
		return {
			__typeName: 'Errors',
			errors: errors.map((error) => {
				const field = error.path;
				return {
					key: DATABASE_FIELDS[field.toUpperCase()],
					message: generateMessage(polyglot, POLYGLOT_SEQUELIZE[error.validatorName], field),
				};
			}),
		};
	}
};

module.exports = { register, login };
