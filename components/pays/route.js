const {
	save, getAllByUser, getAllPays, getAllCreditsByUser, getAllDebtsByUser,
} = require('./controller');
const auth = require('../../config/auth');
const { addPayValidator } = require('./validate');

module.exports = (app, polyglot) => {

	app.route('/api/pays/all')
		.all(auth.authenticate())
		.get((req, res, next) => getAllPays(req, res, next, polyglot));

	app.route('/api/pays/my/credits')
		.all(auth.authenticate())
		.get((req, res, next) => getAllCreditsByUser(req, res, next, polyglot));

	app.route('/api/pays/my/debts')
		.all(auth.authenticate())
		.get((req, res, next) => getAllDebtsByUser(req, res, next, polyglot));

	app.route('/api/pays(/:id)?')
		.all(auth.authenticate())
		.post(addPayValidator, (req, res, next) => save(req, res, next, polyglot))
		.get((req, res, next) => getAllByUser(req, res, next, polyglot))
		.put((req, res) => { res.send('It hit put debt.\n'); })
		.delete((req, res) => { res.send('It hit delete debt.\n'); });
};
