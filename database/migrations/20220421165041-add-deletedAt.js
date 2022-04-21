module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Loans', 'deletedAt', {
			allowNull: true,
			type: Sequelize.DataTypes.DATE,
		});

		return queryInterface.addColumn('Payments', 'deletedAt', {
			allowNull: true,
			type: Sequelize.DataTypes.DATE,
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('Loans', 'deletedAt');
		return queryInterface.removeColumn('Payments', 'deletedAt');
	},
};
