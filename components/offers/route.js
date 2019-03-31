const { save, getAll } = require('./controller');
const auth = require('../../config/auth');

module.exports = (...arguments) => {
  const app = arguments[0];
  app.post('/api/offer', auth.authenticate(), (req, res, next) => save(req, res, next, ...arguments));
  app.get('/api/offers', auth.authenticate(), (req, res, next) => getAll(req, res, next, ...arguments));
  app.put('/api/offer/:id', auth.authenticate(), (req, res) => { res.send('It hit put offer.\n'); });
  app.delete('/api/offer/:id', auth.authenticate(), (req, res) => { res.send('It hit delete offer.\n'); });
};
