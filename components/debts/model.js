/* eslint-disable object-curly-newline */
const mongoose = require('mongoose');

const DebtSchema = new mongoose.Schema({
	debtor: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomUser' },
	creditor: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomUser' },
	title: { type: String, minlength: 10, maxlength: 100, trim: true, required: false },
	description: { type: String, minlength: 20, maxlength: 700, trim: true, required: false },
	valueInitial: { type: Number, required: true },
	valuePaid: { type: Number, required: false },
	dateInitial: { type: Date, default: Date.now() },
	dateDue: { type: Date },
	datePaymentCompleted: { type: Date },
	partialPayments: [
		{ date: { type: Date }, value: { type: Number } },
	],
});

DebtSchema.methods.toJSON = function toJSON() {
	const debt = this.toObject();
	delete debt.__v;
	return debt;
};

module.exports = mongoose.model('Debt', DebtSchema);
