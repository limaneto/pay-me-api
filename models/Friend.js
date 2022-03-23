import Sequelize from 'sequelize';
import sequelize from '../database/instance';

const Friend = sequelize.define('Friend', {
	id: {
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.DataTypes.UUIDV4,
		primaryKey: true,
	},
	userId: {
		type: Sequelize.DataTypes.INTEGER,
		references: {
			model: 'Users',
			key: 'id',
		},
	},
	friendId: {
		type: Sequelize.DataTypes.INTEGER,
		references: {
			model: 'Users',
			key: 'id',
		},
	},
});

export default Friend;
