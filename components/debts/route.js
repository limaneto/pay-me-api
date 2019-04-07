const { save, getAll } = require('./controller');
const auth = require('../../config/auth');

module.exports = (app, polyglot) => {
	app.route('/api/debts')
		.all((req, res, next) => { console.log('HIT MIDLEWARE'.blue); next(req); })
		.post('/api/debts', auth.authenticate(), (req, res, next) => save(req, res, next, polyglot))
		.get('/api/debts', auth.authenticate(), (req, res, next) => getAll(req, res, next, polyglot))
		.put('/api/debts/:id', auth.authenticate(), (req, res) => { res.send('It hit put debt.\n'); })
		.delete('/api/debts/:id', auth.authenticate(), (req, res) => { res.send('It hit delete debt.\n'); });
};
