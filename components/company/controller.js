const Company = require('./model');

const login = (req, res, next, ...arguments) => {
  const { email, password } = req.body;
  const polyglot = arguments[1];
  if (!email) res.status(400).send(polyglot.t('field-required', { field: 'Email' }));
  if (!password) res.status(400).send(polyglot.t('field-required', { field: 'Password' }));

  Company
    .findOne({ email })
    .then((company) => {
      if (!company) res.status(404).json({ message: polyglot.t('path-not-found', polyglot.t('company')) });

      const passwordCheck = company.validatePassword(password);
      if (passwordCheck) {
        const token = company.generateJWT();
        res.status(200).json({ message: polyglot.t('logged', { model: 'User' }), token });
      } else {
        res.status(400).json({ message: polyglot.t('password-wrong') });
      }
    })
    .catch(err => next(err));
};

const save = (req, res, next, ...arguments) => {
  if (!req.body.password) return res.status(400).json({ errors: { message: polyglot.t('field-required', { field: 'Password' }) } });

  const company = new Company(req.body);
  company.setPassword(req.body.password);
  company.save((err) => {
    if (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ errors: err.errors });
      }
      return res.status(500).json({ message: polyglot.t('500') });
    }

    return res.send({ message: polyglot.t('registered', { model: 'Company' }), user: company.toAuthJSON() });
  });
};

module.exports = {
  save,
  login,
};
