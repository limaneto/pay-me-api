const { save, getAll } = require('./controller');
const auth = require('../../config/auth');

module.exports = (...args) => {
  const app = args[0];
  app.post('/api/debt', auth.authenticate(), (req, res, next) => save(req, res, next, ...args));
  app.get('/api/debts', auth.authenticate(), (req, res, next) => getAll(req, res, next, ...args));
  app.put('/api/debt/:id', auth.authenticate(), (req, res) => { res.send('It hit put debt.\n'); });
  app.delete('/api/debt/:id', auth.authenticate(), (req, res) => { res.send('It hit delete debt.\n'); });
};
