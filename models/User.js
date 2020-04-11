const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('User', {
		fullName: {
			type: DataTypes.VIRTUAL,
			get() {
				return `${this.firstName} ${this.lastName}`
			}
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			validate: { isEmail: true },
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	});

	/* Class Methods */

	User.beforeCreate((user) => {
		user.password = bcrypt.hashSync(user.password, 10);
	});

	User.associate = (models) => {
		User.belongsToMany(models.User, { as: 'friends', through: 'Friends', foreignKey: 'userId' });
	};

	/* Instance Methods */

	User.prototype.generateJWT = function() {
		return jwt.sign({
			email: this.email,
			id: this.id,
		}, process.env.AUTH_SECRET, { expiresIn: '1h' });
	};

	User.prototype.toAuthJSON = function() {
		return {
			id: this.id,
			email: this.email,
			token: this.generateJWT(),
		};
	};

	User.prototype.isPasswordValid = async function(password) {
		return await bcrypt.compare(password, this.password);
	};

	return User;
};
