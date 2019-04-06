const mongoose = require('mongoose');
const BaseUserModel = require('../../config/baseUserSchema');

const UserSchema = new mongoose.Schema();

module.exports = BaseUserModel.discriminator('UserCustom', UserSchema);
