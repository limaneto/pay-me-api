import { Payment, Loan } from  '../../models';
import { POLYGLOT } from '../../utils/constants';
const { generateMessage } = require('../../utils/helpers');
const { POLYGLOT: { REGISTERED, DEBT } } = require('../../utils/constants');

const createPayment = async({ payment, user, polyglot }) => {
	const loan = await Loan.findByPk(payment.loanId);
	
	if (!loan.debtAccepted && user.id === loan.debtorId) {
		await loan.update({ debtAccepted: true });
	}
	
	let paymentReassigned = { ...payment, creator: user._id };
	
	// TODO marcar Loan como pago se valor do Payment for igual valor do Loan
	try {
		const savedPay = await Payment.create(paymentReassigned);
		return {
			__typeName: 'Payment',
			message: generateMessage(polyglot, REGISTERED, DEBT),
			...savedPay.toJSON()
		}
	} catch (err) {
		return {
			__typeName: 'Error',
			error: {
				message: generateMessage(polyglot, POLYGLOT.UNKNOWN_ERROR),
			},
		};
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
	createPayment, getAllByUser, getAllPays, getAllCreditsByUser, getAllDebtsByUser,
};
