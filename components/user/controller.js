const User = require('./model');

const login = (req, res, next, ...args) => {
  const { email, password } = req.body;
  User
    .findOne({ email })
    .then((user) => {
      if (user) {
        const passwordCheck = user.validatePassword(password);
        if (passwordCheck) {
          const newToken = user.generateJWT();
          res.status(200).json({ message: polyglot.t('logged', { model: 'User' }), token: newToken });
        } else {
          res.status(400).json({ message: polyglot.t('password-wrong') });
        }
      } else {
        res.status(400).json({ message: polyglot.t('path-not-found', { path: 'User' }) });
      }
    })
    .catch(err => next(err));
};

const save = (req, res, next, ...args) => {
  if (!req.body.password) {
    return res.status(400).json({ errors: { message: polyglot.t('field-required', { field: polyglot.t('password') }) } });
  }
  const user = new User(req.body);
  user.setPassword(req.body.password);
  user.save((err) => {
    if (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ errors: err.errors });
      }
      return res.status(500).json({ message: polyglot.t('500') });
    }

    return res.send({ message: polyglot.t('registered', { model: polyglot.t('user') }), user: user.toAuthJSON() });
  });
};

module.exports = { save, login };
