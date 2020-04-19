module.exports = (sequelize, DataTypes) => {
	const Loan = sequelize.define('Loan', {
		isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
		title: { type: DataTypes.STRING(20), allowNull: false },
		description: { type: DataTypes.STRING },
		value: { type: DataTypes.FLOAT, allowNull: false },
		debtAccepted: { type: DataTypes.BOOLEAN },
		debtRefused: { type: DataTypes.BOOLEAN },
		creditAccepted: { type: DataTypes.BOOLEAN },
		creditRefused: { type: DataTypes.BOOLEAN },
		isPaid: { type: DataTypes.BOOLEAN },
		dateDue: { type: DataTypes.DATEONLY },
		dateLoanCompleted: { type: DataTypes.DATEONLY },
	}, { paranoid: true });

	/* Class methods */

	Loan.associate = function (models) {
		Loan.belongsTo(models.User, {
			foreignKey: {
				name: 'debtor',
			},
		});

		Loan.belongsTo(models.User, {
			foreignKey: {
				name: 'creditor',
			},
		});

		Loan.belongsTo(models.User, {
			foreignKey: {
				name: 'creator',
			},
		});
	};

	return Loan;
};
