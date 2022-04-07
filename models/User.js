import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import sequelize from '../database/instance';

const User = sequelize.define('User', {
	id: {
		allowNull: false,
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.DataTypes.UUIDV4,
		primaryKey: true,
	},
	fullName: {
		type: Sequelize.DataTypes.VIRTUAL,
		get() {
			return `${this.firstName} ${this.lastName}`;
		},
	},
	firstName: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.DataTypes.STRING,
		unique: true,
		validate: { isEmail: true },
		allowNull: false,
	},
	password: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DataTypes.DATE,
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DataTypes.DATE,
	},
});

/* Class Methods */

User.beforeCreate((user) => {
	user.password = bcrypt.hashSync(user.password, 10); // eslint-disable-line no-param-reassign
});

User.associate = (models) => {
	User.belongsToMany(User, { as: 'friend', through: models.Friend });
	User.belongsToMany(User, { as: 'user', through: models.Friend });
	User.hasMany(models.Loan);
};

/* Instance Methods */

User.prototype.generateJWT = function generateJWT() {
	return jwt.sign({
		email: this.email,
		id: this.id,
	}, process.env.AUTH_SECRET, { expiresIn: '10d' });
};

User.prototype.toAuthJSON = function toAuthJSON() {
	return {
		id: this.id,
		email: this.email,
		token: this.generateJWT(),
	};
};

User.prototype.isPasswordValid = async function isPasswordValid(password) {
	return bcrypt.compare(password, this.password);
};

export default User;
