import { Friend, Loan } from '../../models';
const { generateMessage, handleData } = require('../../utils/helpers');
const { PAGINATION, DATABASE_FIELDS, POLYGLOT: { REGISTERED, DEBT } } = require('../../utils/constants');

// TODO criar endpoint pra aceitar Loan
// TODO criar endpoint pra recusar Loan

const acceptLoan = () => {
	return { creditAccepted: true, debtAccepted: true };
};

const addUsersIdsToLoan = (req) => {
	const { debtor_id, creditor_id } = req.body;
	return { creditorId: creditor_id, debtorId: debtor_id };
};

const buildLoan = (req, user, isMyDebt) => {
	let loan = { ...req.body };
	if (isMyDebt) {
		loan = { ...loan, ...acceptLoan(req) };
	}
	return { ...loan, creatorId: user.id, ...addUsersIdsToLoan(req) };
}

const save = async (req, res, next, polyglot) => {
	const { user, body: { debtor_id, creditor_id } } = req;
	const isMyDebt = user.id === debtor_id;
	const friendId = isMyDebt ? creditor_id : debtor_id;
	try {
		const loan = buildLoan(req, user, isMyDebt);
		const savedLoan = await Loan.create(loan);
		await Friend.findOrCreate({
			where: {
				userId: user.id,
				friendId,
			},
		});
		return res.send({
			message: generateMessage(polyglot, REGISTERED, DEBT),
			savedLoan,
		});
	} catch (err) {
		return next(err);
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
	save,
	getLoans,
	getMyDebts,
	getMyCredits,
};
