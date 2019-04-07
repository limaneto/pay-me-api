const { save, getAll } = require('./controller');
const auth = require('../../config/auth');
const { genericValidator, addDebtValidator } = require('./validate');

module.exports = (app, polyglot) => {
	app.route('/api/debts(/:id)?')
		.all(auth.authenticate())
		.post(addDebtValidator, (req, res, next) => save(req, res, next, polyglot))
		.get((req, res, next) => getAll(req, res, next, polyglot))
		.put((req, res) => { res.send('It hit put debt.\n'); })
		.delete((req, res) => { res.send('It hit delete debt.\n'); });
};
