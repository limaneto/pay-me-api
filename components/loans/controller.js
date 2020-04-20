const models = require('../../models');
const { generateMessage, handleData } = require('../../utils/helpers');
const { PAGINATION, DATABASE_FIELDS, POLYGLOT: { REGISTERED, DEBT } } = require('../../utils/constants');

const acceptLoan = (req) => {
	const { body: { debtor_id }, user } = req;
	if (user.id === debtor_id) return { creditAccepted: true, debtAccepted: true };
	return null;
};

const addUsersIdsToLoan = (req) => {
	const { debtor_id, creditor_id } = req.body;
	return { creditor: creditor_id, debtor: debtor_id };
};

const save = async (req, res, next, polyglot) => {
	const { user, body: { debtor_id, creditor_id } } = req;
	const friendId = user.id !== debtor_id ? debtor_id : creditor_id;
	try {
		let pay = { ...req.body };
		pay = Object.assign(pay, acceptLoan(req));
		pay = Object.assign(pay, addUsersIdsToLoan(req));
		pay = Object.assign(pay, { creator: user.id });
		const loan = await models.Loan.create(pay);
		await models.Friend.findOrCreate({
			where: {
				userId: user.id,
				friendId,
			},
		});
		return res.send({
			message: generateMessage(polyglot, REGISTERED, DEBT),
			loan,
		});
	} catch (err) {
		return next(err);
	}
};

const getWhereClause = (field, user) => {
	if (field === DATABASE_FIELDS.DEBTOR) {
		return {
			isActive: true,
			debtor: user.id,
		}
	}
	return {
		isActive: true,
		creditor: user.id,
	}
};

const getLoans = async (req, res, next, field) => {
	const { user } = req;
	let { page = 1, limit = PAGINATION.LIMIT } = req.query;
	page = parseInt(page);
	limit = parseInt(limit);
	try {
		const loans = await models.Loan.findAll({
			limit: limit + 1,
			offset: limit * (page - 1),
			where: getWhereClause(field, user),
		});
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
	getMyDebts,
	getMyCredits,
};
