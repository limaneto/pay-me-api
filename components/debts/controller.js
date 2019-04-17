const Debt = require('./model');

function acceptDebtOrCredit(body) {
	if (body.debtor) {
		return { creditAccepted: true };
	}

	if (body.creditor) {
		return { debtAccepted: true };
	}
}

function addDebtorOrCreditorId(req) {
	const { user, body } = req;
	if (body.debtor) {
		return { creditor: user._id };
	}

	if (body.creditor) {
		return { debtor: user._id };
	}
}

function addCreator(req) {
	const { user } = req;
	return { creator: user._id };
}

const save = (req, res, next, polyglot) => {
	let debt = new Debt(req.body);
	debt = Object.assign(debt, acceptDebtOrCredit(req.body));
	debt = Object.assign(debt, addDebtorOrCreditorId(req));
	debt = Object.assign(debt, addCreator(req));
	debt.save((err, savedDebt) => {
		if (err) {
			return next(err);
		}
		res.status(201).json({ data: { debt: savedDebt.toJSON(), message: polyglot.t('registered', { model: polyglot.t('debt') }) } });
	});
};

const getAllByUser = (req, res, next, polyglot) => {
	const limit = +req.query.limit || 10;
	const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;
	const { user } = req;
	Debt
		.find()
		.or([{ creditor: user._id }, { debtor: user._id }])
		.sort({ createdAt: -1 })
		.limit(limit)
		.skip(limit * page)
		.lean()
		.exec((err, debts) => {
			if (err) {
				return res.status(500).json({ message: polyglot.t('500') });
			}

			const metadata = { page: page + 1 };
			return res.json({ data: { debts }, metadata });
		});
};

const getAllDebts = (req, res, next, polyglot) => {
	const limit = +req.query.limit || 10;
	const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;
	Debt
		.find()
		.sort({ createdAt: -1 })
		.limit(limit)
		.skip(limit * page)
		.lean()
		.exec((err, debts) => {
			if (err) {
				return res.status(500).json({ message: polyglot.t('500') });
			}

			const metadata = { page: page + 1 };
			return res.json({ data: { debts }, metadata });
		});
};


module.exports = { save, getAllByUser, getAllDebts };
