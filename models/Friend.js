module.exports = (sequelize, DataTypes) => {
	const Friend = sequelize.define('Friend', {
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
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

	return Friend;
};
