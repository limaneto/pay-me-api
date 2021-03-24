const { Payment } = require('../../models');

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
	let pay = new Payment(req.body);
	pay = Object.assign(pay, acceptDebtOrCredit(req.body));
	pay = Object.assign(pay, addDebtorOrCreditorId(req));
	pay = Object.assign(pay, addCreator(req));
	pay.save((err, savedPay) => {
		if (err) {
			return next(err);
		}
		res.status(201).json({ data: { pay: savedPay.toJSON(), message: polyglot.t('registered', { field: polyglot.t('debt') }) } });
	});
};

const getAllByUser = (req, res, next, polyglot) => {
	const limit = +req.query.limit || 10;
	const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;
	const { user } = req;
	Payment
		.find()
		.or([{ creditor: user._id }, { debtor: user._id }])
		.sort({ createdAt: -1 })
		.limit(limit)
		.skip(limit * page)
		.lean()
		.exec((err, pays) => {
			if (err) {
				return res.status(500).json({ message: polyglot.t('500') });
			}

			const metadata = { page: page + 1 };
			return res.json({ pays, metadata });
		});
};

const getAllPays = async (req, res, next, polyglot) => {
	const limit = +req.query.limit || 10;
	const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;

	try {
		const pays = await Payment.findAll({
			order: [
				['createdAt', 'DESC'],
			],
			limit,
			offset: (limit * page)
		});

		const metadata = { page: page + 1 };
		return res.json({ pays, metadata });
	} catch (err) {
		if (err) {
			return res.status(500).json({ message: polyglot.t('500') });
		}
	}
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
			return res.json({ pays, metadata });
		});
};

const getAllDebtsByUser = (req, res, next, polyglot) => {
	const limit = +req.query.limit || 10;
	const page = (+req.query.page > 0 ? +req.query.page : 1) - 1;
	const { user } = req;
	Payment
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
			return res.json({ pays, metadata });
		});
};


module.exports = {
	save, getAllByUser, getAllPays, getAllCreditsByUser, getAllDebtsByUser,
};
