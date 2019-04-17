const {
	save, getAllByUser, getAllDebts, getAllCreditsByUser,
} = require('./controller');
const auth = require('../../config/auth');
const { addDebtValidator } = require('./validate');

module.exports = (app, polyglot) => {

	app.route('/api/debts/getAll')
		.all(auth.authenticate())
		.get((req, res, next) => getAllDebts(req, res, next, polyglot));

	app.route('/api/debts/my/credits')
		.all(auth.authenticate())
		.get((req, res, next) => getAllCreditsByUser(req, res, next, polyglot));

	app.route('/api/debts(/:id)?')
		.all(auth.authenticate())
		.post(addDebtValidator, (req, res, next) => save(req, res, next, polyglot))
		.get((req, res, next) => getAllByUser(req, res, next, polyglot))
		.put((req, res) => { res.send('It hit put debt.\n'); })
		.delete((req, res) => { res.send('It hit delete debt.\n'); });
};
