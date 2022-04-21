module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Loans', 'createdAt', {
			allowNull: false,
			type: Sequelize.DataTypes.DATE,
		});
		await queryInterface.addColumn('Loans', 'updatedAt', {
			allowNull: false,
			type: Sequelize.DataTypes.DATE,
		});

		await queryInterface.addColumn('Payments', 'createdAt', {
			allowNull: false,
			type: Sequelize.DataTypes.DATE,
		});

		return queryInterface.addColumn('Payments', 'updatedAt', {
			allowNull: false,
			type: Sequelize.DataTypes.DATE,
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('Loans', 'createdAt');
		await queryInterface.removeColumn('Loans', 'updatedAt');
		await queryInterface.removeColumn('Payments', 'createdAt');
		return queryInterface.removeColumn('Payments', 'updatedAt');
	},
};
