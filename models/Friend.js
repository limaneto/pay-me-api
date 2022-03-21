module.exports = (sequelize, DataTypes) => sequelize.define('Friend', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	userId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users',
			key: 'id',
		},
	},
	friendId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users',
			key: 'id',
		},
	},
});
