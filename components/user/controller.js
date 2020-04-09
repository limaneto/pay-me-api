const models = require('../../models');

const login = (req, res, next, polyglot) => {
	const { email, password } = req.body;
	models.User
		.findOne({ where: { 'email': email } })
		.then(async (user) => {
			if (user) {
				const passwordCheck = await user.isPasswordValid(password);
				if (passwordCheck) {
					const newToken = user.generateJWT();
					res.status(200).json({ message: polyglot.t('logged', { model: polyglot.t('user') }), token: newToken });
				} else {
					res.status(400).json({ message: polyglot.t('password-wrong') });
				}
			} else {
				res.status(400).json({ message: polyglot.t('path-not-found', { path: polyglot.t('user') }) });
			}
		})
		.catch(err => next(err));
};

const fieldRequiredError = (field) => {
	return res.status(400).json({ errors: { message: polyglot.t('field-required', { field: polyglot.t(field) }) } });
};

const save = async (req, res, next, polyglot) => {
	if (!req.body.password) {
		return fieldRequiredError('password');
	}
	if (!req.body.firstName) {
		return fieldRequiredError('firstName');
	}
	if (!req.body.email) {
		return fieldRequiredError('email');
	}
	try {
		const user = await models.User.create(req.body);
		return res.send({ message: polyglot.t('registered', { model: polyglot.t('user') }), user: user.toAuthJSON() });
	} catch (err) {
			if (err.name === 'ValidationError') {
				return res.status(400).json({ errors: err.errors });
			}

			if (err.name === 'MongoError' && err.code === 11000) {
				return res.status(400).json({ message: `Email ${req.body.email} already being used.` });
			}

			return res.status(500).json({ message: polyglot.t('500') });
	}
};

module.exports = { save, login };
