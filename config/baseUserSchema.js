/* eslint-disable object-curly-newline */
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function isValidEmail(email) {
	// eslint-disable-next-line no-useless-escape
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

const BaseUserSchema = new mongoose.Schema({
	email: { type: String, lowercase: true, required: true, unique: true, minlength: 1, maxlength: 100, trim: true, validate: [isValidEmail, 'Invalid email.'] },
	hash: String,
	salt: String,
}, { discriminatorKey: 'kind' });

BaseUserSchema.methods.setPassword = function setPassword(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

BaseUserSchema.methods.validatePassword = function validatePassword(password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};

BaseUserSchema.methods.generateJWT = function generateJWT() {
	return jwt.sign({
		email: this.email,
		id: this._id,
	}, process.env.AUTH_SECRET, { expiresIn: '1h' });
};

BaseUserSchema.methods.toAuthJSON = function toAuthJSON() {
	return {
		_id: this._id,
		email: this.email,
		token: this.generateJWT(),
	};
};

const BaseUser = mongoose.model('BaseUser', BaseUserSchema);

module.exports = BaseUser;
