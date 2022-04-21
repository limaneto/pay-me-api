import Sequelize from 'sequelize';
import sequelize from '../database/instance';

const Friend = sequelize.define('Friend', {
	userId: {
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.DataTypes.UUIDV4,
		references: {
			model: 'Users',
			key: 'id',
		},
	},
	friendId: {
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.DataTypes.UUIDV4,
		references: {
			model: 'Users',
			key: 'id',
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DataTypes.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DataTypes.DATE,
		},
	},
});

export default Friend;
