module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Friend', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'User',
				key: 'id',
			}
		},
		friendId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'User',
				key: 'id',
			}
		}
	});
};
