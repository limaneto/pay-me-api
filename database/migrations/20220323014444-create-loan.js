module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Loans', {
			id: {
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.DataTypes.UUIDV4,
				primaryKey: true,
			},
			debtorId: {
				type: Sequelize.DataTypes.UUID,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			creditorId: {
				type: Sequelize.DataTypes.UUID,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			creatorId: {
				type: Sequelize.DataTypes.UUID,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			isActive: {
				type: Sequelize.DataTypes.BOOLEAN,
				defaultValue: true,
			},
			title: {
				type: Sequelize.DataTypes.STRING(20),
				allowNull: false,
			},
			description: Sequelize.DataTypes.STRING,
			value: {
				type: Sequelize.DataTypes.FLOAT,
				allowNull: false,
			},
			debtAccepted: Sequelize.DataTypes.BOOLEAN,
			debtRefused: Sequelize.DataTypes.BOOLEAN,
			creditAccepted: Sequelize.DataTypes.BOOLEAN,
			creditRefused: Sequelize.DataTypes.BOOLEAN,
			isPaid: Sequelize.DataTypes.BOOLEAN,
			dateDue: Sequelize.DataTypes.DATEONLY,
			dateLoanCompleted: Sequelize.DataTypes.DATEONLY,
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('Loans');
	},
};
