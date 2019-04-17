/* eslint-disable object-curly-newline */
const mongoose = require('mongoose');

const DebtSchema = new mongoose.Schema({
	creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomUser' },
	debtor: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomUser' },
	creditor: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomUser' },
	debtAccepted: { type: Boolean, default: false },
	creditAccepted: { type: Boolean, default: false },
	title: { type: String, minlength: 10, maxlength: 100, trim: true },
	description: { type: String, minlength: 20, maxlength: 700, trim: true },
	valueInitial: { type: Number, required: true },
	valuePaid: { type: Number },
	dateInitial: { type: Date, default: Date.now() },
	dateDue: { type: Date },
	datePaymentCompleted: { type: Date },
	accepted: { type: Boolean, default: false },
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
