const { save, getAll } = require('./controller');
const auth = require('../../config/auth');

module.exports = (app, polyglot) => {
  app.post('/api/debt', auth.authenticate(), (req, res, next) => save(req, res, next, polyglot));
  app.get('/api/debts', auth.authenticate(), (req, res, next) => getAll(req, res, next, polyglot));
  app.put('/api/debt/:id', auth.authenticate(), (req, res) => { res.send('It hit put debt.\n'); });
  app.delete('/api/debt/:id', auth.authenticate(), (req, res) => { res.send('It hit delete debt.\n'); });
};
