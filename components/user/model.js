const mongoose = require('mongoose');
const BaseUserModel = require('../../config/baseUserSchema');

const UserSchema = new mongoose.Schema({
	username: {
		type: String, lowercase: true, unique: true, minlength: 1, maxlength: 15, trim: true,
	},
});

module.exports = BaseUserModel.discriminator('UserCustom', UserSchema);
