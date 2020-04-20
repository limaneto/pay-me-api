const { save, getMyDebts, getMyCredits } = require('./controller');
const { requiredParamsValidator } = require('./validate');
const auth = require('../../config/auth');

module.exports = (app, polyglot) => {
	app.route('/api/loans')
		.all(auth.authenticate())
		.post(requiredParamsValidator, (req, res, next) => save(req, res, next, polyglot));

	app.route('/api/loans/debts')
		.all(auth.authenticate())
		.get((req, res, next) => getMyDebts(req, res, next, polyglot));

	app.route('/api/loans/credits')
		.all(auth.authenticate())
		.get((req, res, next) => getMyCredits(req, res, next, polyglot));
};
