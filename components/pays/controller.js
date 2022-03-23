import { Payment } from  '../../models';
const { generateMessage } = require('../../utils/helpers');
const { PAGINATION, DATABASE_FIELDS, POLYGLOT: { REGISTERED, DEBT } } = require('../../utils/constants');

function acceptDebtOrCredit(req) {
	const { body, user } = req;
	if (body.isDebt) {
		return {
			debtAccepted: true,
			debtor: user._id,
		};
	}

	return {
		creditAccepted: true,
		creditor: user._id,
	};
}

const save = (req, res, next, polyglot) => {
	let pay = { ...req.body };
	pay = { ...pay, ...acceptDebtOrCredit(req) };
	pay = { ...pay, creator: user._id };

	// TODO add new value to existing Payment when user wants to divide in smaller payments
	// TODO marcar Loan como pago se valor do Payment for igual valor do Loan
	try {
		const savedPay = Payment.create(pay);
		return res/send({
			message: generateMessage(polyglot, REGISTERED, DEBT),
			savedPay
		})
	} catch (err) {
		return next(err);
	}
};

// TODO criar endpoint de confirmar Pagamento
// TODO criar endpoint de deletar/desativar Loan

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
