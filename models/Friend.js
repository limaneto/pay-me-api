module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Friend', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true
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
