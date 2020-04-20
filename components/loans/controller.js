const models = require('../../models');
const { generateMessage } = require('../../utils/helpers');
const { POLYGLOT: { REGISTERED, DEBT } } = require('../../utils/constants');

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

module.exports = {
	save,
};
