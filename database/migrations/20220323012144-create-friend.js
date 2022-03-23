module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Friends', {
			id: {
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.DataTypes.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.DataTypes.UUID,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			friendId: {
				type: Sequelize.DataTypes.UUID,
				references: {
					model: 'Users',
					key: 'id',
				},
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

	},

	async down(queryInterface) {
		await queryInterface.dropTable('Friends');
	},
};
