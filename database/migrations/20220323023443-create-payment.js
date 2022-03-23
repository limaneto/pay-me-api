module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Payments', {
			id: {
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.DataTypes.UUIDV4,
				primaryKey: true,
			},
			loanId: {
				type: Sequelize.DataTypes.UUID,
				references: {
					model: 'Loans',
					key: 'id',
				},
			},
			value: {
				type: Sequelize.DataTypes.FLOAT,
				allowNull: false,
			},
			datePaid: Sequelize.DataTypes.DATEONLY,
			paymentReceived: Sequelize.DataTypes.BOOLEAN,
			description: Sequelize.DataTypes.STRING,
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('Payments');
	},
};
