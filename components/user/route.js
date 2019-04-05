const { save, login } = require('./controller');

module.exports = (app, polyglot) => {
  app.post('/api/users', (req, res, next) => save(req, res, next, polyglot));
  app.post('/api/login', (req, res, next) => login(req, res, next, polyglot));
};
