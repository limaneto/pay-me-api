/* eslint-disable object-curly-newline */
const mongoose = require('mongoose');

const DebtSchema = new mongoose.Schema({
  title: { type: String, minlength: 10, maxlength: 100, trim: true, required: false },
  description: { type: String, minlength: 20, maxlength: 700, trim: true, required: false }
});

DebtSchema.methods.toJSON = function toJSON() {
  const debt = this.toObject();
  delete debt.__v;
  return debt;
};

module.exports = mongoose.model('Debt', DebtSchema);
