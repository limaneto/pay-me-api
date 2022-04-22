module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.addColumn('Payments', 'creatorId', {
			type: Sequelize.DataTypes.UUID,
			references: {
				model: 'Users',
				key: 'id',
			},
		});
	},

	async down(queryInterface) {
		return queryInterface.removeColumn('Payments', 'creatorId');
	},
};
