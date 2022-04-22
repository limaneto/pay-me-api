import { Loan, User } from '../../models';
import { POLYGLOT } from '../../utils/constants';
const { generateMessage, handleData } = require('../../utils/helpers');
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
			loanReassigned = { ...loanReassigned, creditAccepted: true, debtAccepted: true };
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

const getLoans = async (req, res, next, field) => {
	const { user } = req;
	let { page = 1, limit = PAGINATION.LIMIT } = req.query;
	page = parseInt(page);
	limit = parseInt(limit);
	const options = {
		order: [
			['createdAt', 'DESC'],
		],
		limit: limit + 1,
		offset:  limit * (page - 1),
		where: getWhereClause(field, user),
		include: ['debtor', 'creditor']
	}

	try {
		const loans = await Loan.findAll(options);
		const data = handleData(loans, req.route.path, { page, limit });
		res.send(data);
	} catch (err) {
		return next(err);
	}
};

const getMyDebts = async (req, res, next) => {
	return getLoans(req, res, next, DATABASE_FIELDS.DEBTOR);
};

const getMyCredits = async (req, res, next) => {
	return getLoans(req, res, next, DATABASE_FIELDS.CREDITOR);
};

module.exports = {
	createLoan,
	getLoans,
	getMyDebts,
	getMyCredits,
};
