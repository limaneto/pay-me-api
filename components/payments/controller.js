import { Payment, Loan } from  '../../models';
import {PAGINATION, POLYGLOT} from '../../utils/constants';
const { generateMessage } = require('../../utils/helpers');
const { POLYGLOT: { REGISTERED, DEBT } } = require('../../utils/constants');

const createPayment = async({ payment, user, polyglot }) => {
	const loan = await Loan.findByPk(payment.loanId);
	
	if (!loan.debtAccepted && user.id === loan.debtorId) {
		await loan.update({ debtAccepted: true });
	}

	// TODO marcar Loan como pago se valor do Payment for igual valor do Loan
	// TODO marcar Loan como pago caso a soma de todos os Payments seja maior ou igual o Loan
	try {
		const savedPay = await Payment.create({ ...payment, creator: user._id });
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
	createPayment, getAllPayments,
};
