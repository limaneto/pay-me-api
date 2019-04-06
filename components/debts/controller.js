const Debt = require('./model');

const save = (req, res, next, polyglot) => {
  const debt = new Debt(req.body);
  debt.save((err, savedDebt) => {
    if (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json({ errors: err.errors });
      } else {
        res.status(500).json({ message: polyglot.t('500') });
      }
    } else {
      res.status(201).json({ debt: savedDebt.toJSON(), message: polyglot.t('registered', { model: 'Debt' }) });
    }
  });
};

const getAll = (req, res, next, polyglot) => {
  const limit = +req.query.limit || 10;
  const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;
  Debt
    .find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * page)
    .exec((err, debts) => {
      if (err) {
        return res.status(500).json({ message: polyglot.t('500') });
      }
      return res.json({
        page: page + 1,
        pages: Math.ceil(count / limit),
        debts,
      });
    });
};


module.exports = { save, getAll };
