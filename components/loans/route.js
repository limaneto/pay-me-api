const { save } = require('./controller');
const requiredParamsValidator = require('./validate');
const auth = require('../../config/auth');

module.exports = (app, polyglot) => {
	app.route('/api/loans')
		.all(auth.authenticate())
		.post(requiredParamsValidator, (req, res, next) => save(req, res, next, polyglot));
};
