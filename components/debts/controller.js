const Debt = require('./model');

function acceptDebtOrCredit(body) {
	if (body.debtor) {
		return { creditAccepted: true };
	}

	if (body.creditor) {
		return { debtAccepted: true };
	}
}

const save = (req, res, next, polyglot) => {
	let debt = new Debt(req.body);
	debt = Object.assign(debt, acceptDebtOrCredit(req.body));
	debt.save((err, savedDebt) => {
		if (err) {
			return next(err);
		}
		res.status(201).json({ debt: savedDebt.toJSON(), message: polyglot.t('registered', { model: polyglot.t('debt') }) });
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
