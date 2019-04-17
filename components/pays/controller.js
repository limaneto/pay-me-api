const Pay = require('./model');

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
	let pay = new Pay(req.body);
	pay = Object.assign(pay, acceptDebtOrCredit(req.body));
	pay = Object.assign(pay, addDebtorOrCreditorId(req));
	pay = Object.assign(pay, addCreator(req));
	pay.save((err, savedPay) => {
		if (err) {
			return next(err);
		}
		res.status(201).json({ data: { pay: savedPay.toJSON(), message: polyglot.t('registered', { model: polyglot.t('debt') }) } });
	});
};

const getAllByUser = (req, res, next, polyglot) => {
	const limit = +req.query.limit || 10;
	const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;
	const { user } = req;
	Pay
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

const getAllPays = (req, res, next, polyglot) => {
	const limit = +req.query.limit || 10;
	const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;
	Pay
		.find()
		.sort({ createdAt: -1 })
		.limit(limit)
		.skip(limit * page)
		.lean()
		.exec((err, pays) => {
			if (err) {
				return res.status(500).json({ message: polyglot.t('500') });
			}

			const metadata = { page: page + 1 };
			return res.json({ data: { pays }, metadata });
		});
};

const getAllCreditsByUser = (req, res, next, polyglot) => {
	const limit = +req.query.limit || 10;
	const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;
	const { user } = req;
	Pay
		.find()
		.where({ creditor: user._id })
		.sort({ createdAt: -1 })
		.limit(limit)
		.skip(limit * page)
		.lean()
		.exec((err, pays) => {
			if (err) {
				return res.status(500).json({ message: polyglot.t('500') });
			}

			const metadata = { page: page + 1 };
			return res.json({ data: { pays }, metadata });
		});
};

const getAllDebtsByUser = (req, res, next, polyglot) => {
	const limit = +req.query.limit || 10;
	const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;
	const { user } = req;
	Pay
		.find()
		.where({ debtor: user._id })
		.sort({ createdAt: -1 })
		.limit(limit)
		.skip(limit * page)
		.lean()
		.exec((err, pays) => {
			if (err) {
				return res.status(500).json({ message: polyglot.t('500') });
			}

			const metadata = { page: page + 1 };
			return res.json({ data: { pays }, metadata });
		});
};


module.exports = {
	save, getAllByUser, getAllPays, getAllCreditsByUser, getAllDebtsByUser,
};
