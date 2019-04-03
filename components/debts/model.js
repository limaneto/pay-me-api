/* eslint-disable object-curly-newline */
const mongoose = require('mongoose');

const DebtSchema = new mongoose.Schema({
  title: { type: String, minlength: 10, maxlength: 100, trim: true, required: false },
  description: { type: String, minlength: 20, maxlength: 700, trim: true, required: false },
  salary: { type: Number, require: false },
  contract_type: { type: String, enum: ['PJ', 'CLT', 'Estagio', 'Temporario'], require: false },
  exp_level: { type: String, enum: ['Junior', 'Pleno', 'Senior'], require: false },
  year_exp_min: { type: Number, required: false },
  remote: { type: Boolean, required: false },
  eligible: { type: Boolean, required: false },
  expired: { type: Boolean, required: false },
});

DebtSchema.methods.toJSON = function toJSON() {
  const debt = this.toObject();
  delete debt.__v;
  return debt;
};

module.exports = mongoose.model('Debt', DebtSchema);
