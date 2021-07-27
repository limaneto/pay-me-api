const models = require('../../models');
const { DATABASE_FIELDS, POLYGLOT } = require('../../utils/constants');
const { generateMessage } = require('../../utils/helpers');

const login = (req, res, next, polyglot) => {
	const { email, password } = req.body;
	models.User
		.findOne({ where: { 'email': email } })
		.then(async (user) => {
			if (user) {
				const passwordCheck = await user.isPasswordValid(password);
				if (passwordCheck) {
					const newToken = user.generateJWT();
					res.status(200).json({ message: generateMessage(polyglot, 'logged', 'user'), token: newToken });
				} else {
					res.status(400).json({
						errors: {
							fields: [{
									key: DATABASE_FIELDS.PASSWORD,
									message: generateMessage(polyglot, POLYGLOT.WRONG_PASSWORD),
								}
							]
						}
					});
				}
			} else {
				res.status(400).json({ errors: { message: generateMessage(polyglot, 'not-found', 'user') } });
			}
		})
		.catch(err => next(err));
};


const register = async ({ user, polyglot }) => {
	try {
		const newUser = await models.User.create(user);
		return { message: polyglot.t('registered', { field: polyglot.t('user') }), user: newUser.toAuthJSON() };
	} catch (err) {
		//TODO error handler
		console.log('err', err)
	}
};

module.exports = { register, login };
