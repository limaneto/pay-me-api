const mongoose = require('mongoose');
const BaseUserModel = require('../../config/baseUserSchema');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  responsible: { type: String },
});

module.exports = BaseUserModel.discriminator('Company', CompanySchema);
