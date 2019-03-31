const Offer = require('./model');

const save = (req, res, next, ...arguments) => {
  const offer = new Offer(req.body);
  offer.save((err, savedOffer) => {
    if (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json({ errors: err.errors });
      } else {
        res.status(500).json({ message: polyglot.t('500') });
      }
    } else {
      res.status(201).json({ remember: savedOffer.toJSON(), message: polyglot.t('registered', { model: 'Offer'}) });
    }
  });
};

const getAll = (req, res, next, ...arguments) => {
  const limit = +req.query.limit || 10;
  const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;
  Offer
    .find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * page)
    .exec((err, offers) => {
      if (err) {
        return res.status(500).json({ message: polyglot.t('500') });
      }
      return res.json({
        page: page + 1,
        pages: Math.ceil(count / limit),
        offers,
      });
    });
};

const update = (req, res, next, ...arguments) => {
  var query = Offer.findById(req.)
};

module.exports = { save, getAll };
