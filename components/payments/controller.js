import { Payment, Loan } from  '../../models';
import {PAGINATION, POLYGLOT} from '../../utils/constants';
const { generateMessage } = require('../../utils/helpers');
const { POLYGLOT: { REGISTERED, DEBT } } = require('../../utils/constants');

// TODO marcar Loan como pago se valor do Payment for igual valor do Loan
// TODO marcar Loan como pago caso a soma de todos os Payments seja maior ou igual o Loan

const createPayment = async({ payment, user, polyglot }) => {
	try {
		const savedPay = await Payment.create({ ...payment, creatorId: user.id });
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

const confirmPayment = async ({ paymentId, polyglot, user }) => {
	try {
		const payment = await Payment.findByPk(paymentId);
		const loan = await Loan.findOne({ where: { id: payment.loanId } });

		if (loan && loan.creditorId === user.id) {
			await payment.update({ received: true });
			return {
				__typeName: 'Payment',
				message: 'Pagamento confirmado com sucesso',
			}
		}

		return {
			__typeName: 'Error',
			error: {
				message: 'Only the creditor can confirm the payment'
			},
		};
	} catch (error) {
		return {
			__typeName: 'Error',
			error: {
				message: generateMessage(polyglot, POLYGLOT.UNKNOWN_ERROR),
			},
		};
	}
};

const getAllPayments = async ({ loanId, page = 1, limit = PAGINATION.LIMIT }) => {
	page = parseInt(page);
	limit = parseInt(limit);

	return await Payment.findAll({
		where: {
			loanId: loanId
		},
		order: [
			['createdAt', 'DESC'],
		],
		limit: limit,
		offset:  limit * (page - 1),
	});
};


module.exports = {
	createPayment, confirmPayment, getAllPayments,
};
