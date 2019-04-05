const { save, login } = require('./controller');

module.exports = (...args) => {
  const app = args[0];
  app.post('/api/users', (req, res, next) => save(req, res, next, ...args));
  app.post('/api/login', (req, res, next) => login(req, res, next, ...args));
};
