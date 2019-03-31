const { save, login } = require('./controller');

module.exports = (...arguments) => {
  const app = arguments[0];
  app.post('/api/users', (req, res, next) => save(req, res, next, ...arguments));
  app.post('/api/login', (req, res, next) => login(req, res, next, ...arguments));
};
