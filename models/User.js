const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		fullName: {
			type: DataTypes.VIRTUAL,
			get() {
				return `${this.firstName} ${this.lastName}`;
			},
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: { isEmail: true },
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	/* Class Methods */

	User.beforeCreate((user) => {
		// eslint-disable-next-line no-param-reassign
		user.password = bcrypt.hashSync(user.password, 10);
	});

	User.associate = (models) => {
		models.User.belongsToMany(models.User, { as: 'user', through: models.Friend, foreignKey: 'userId' });
		models.User.belongsToMany(models.User, { as: 'friend', through: models.Friend, foreignKey: 'friendId' });
		models.User.hasMany(models.Loan);
	};

	/* Instance Methods */

	User.prototype.generateJWT = function () {
		return jwt.sign({
			email: this.email,
			id: this.id,
		}, process.env.AUTH_SECRET, { expiresIn: '10d' });
	};

	User.prototype.toAuthJSON = function () {
		return {
			id: this.id,
			email: this.email,
			token: this.generateJWT(),
		};
	};

	User.prototype.isPasswordValid = async function (password) {
		return bcrypt.compare(password, this.password);
	};

	return User;
};
