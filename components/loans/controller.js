import { Loan, User } from '../../models';
import { POLYGLOT } from '../../utils/constants';
const { generateMessage } = require('../../utils/helpers');
const { PAGINATION, DATABASE_FIELDS } = require('../../utils/constants');

// TODO criar endpoint pra aceitar Loan
// TODO criar endpoint pra recusar Loan

const createLoan = async ({ creditorId, debtorId, loan, user }) => {
	const isMyDebt = user.id === debtorId;
	const friendId = isMyDebt ? creditorId : debtorId;

	let loanReassigned = { ...loan };

	try {
		loanReassigned = { ...loanReassigned, creatorId: user.id, creditorId, debtorId };

		if (isMyDebt) {
			loanReassigned = { ...loanReassigned, debtAccepted: true };
		} else {
			loanReassigned = { ...loanReassigned, creditAccepted: true };
		}

		const savedLoan = await Loan.create(loanReassigned);
		const userWithFriendId = await User.findByPk(friendId);
		await user.addFriend(userWithFriendId);
		return {
			__typeName: 'Loan',
			...savedLoan.toJSON(),
		};
	} catch (err) {
		console.log('err', err)
		return {
			__typeName: 'Error',
			error: {
				message: generateMessage(polyglot, POLYGLOT.UNKNOWN_ERROR),
			},
		};
	}
};

// TODO criar endpoint de deletar/desativar Loan

const acceptLoan = async ({ loanId, polyglot, user }) => {
	try {
		const loan = await Loan.findOne({ where: { id: loanId } });

		if (loan.debtorId === user.id) {
			loan.update({ debtAccepted: true });
		}

		if (loan.creditorId === user.id) {
			loan.update({ creditAccepted: true });
		}

		return {
			__typeName: 'Loan',
			...loan.toJSON(),
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

const getWhereClause = (field, user) => {
	if (field === DATABASE_FIELDS.DEBTOR) {
		return {
			isActive: true,
			debtorId: user.id,
		}
	}
	if (field === DATABASE_FIELDS.CREDITOR) {
		return {
			isActive: true,
			creditorId: user.id,
		}
	}
	return {
		isActive: true,
	}
};

const getLoans = async ({ page = 1, limit = PAGINATION.LIMIT, user, field }) => {
	page = parseInt(page);
	limit = parseInt(limit);
	const options = {
		order: [
			['createdAt', 'DESC'],
		],
		limit: limit,
		offset:  limit * (page - 1),
		where: getWhereClause(field, user),
		include: ['debtor', 'creditor']
	}

	try {
		return await Loan.findAll(options);
	} catch (err) {
		return err;
	}
};

const getMyDebts = async ({ page = 1, limit = PAGINATION.LIMIT, user }) => {
	return getLoans({ page, limit, user, field: DATABASE_FIELDS.DEBTOR });
};

const getMyCredits = async ({ page = 1, limit = PAGINATION.LIMIT, user }) => {
	return getLoans({ page, limit, user, field: DATABASE_FIELDS.CREDITOR });
};

module.exports = {
	acceptLoan,
	createLoan,
	getLoans,
	getMyDebts,
	getMyCredits,
};
