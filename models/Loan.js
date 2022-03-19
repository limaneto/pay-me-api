module.exports = (sequelize, DataTypes) => {
	const Loan = sequelize.define('Loan', {
		isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
		title: { type: DataTypes.STRING(20), allowNull: false },
		description: DataTypes.STRING,
		value: { type: DataTypes.FLOAT, allowNull: false },
		debtAccepted: DataTypes.BOOLEAN,
		debtRefused: DataTypes.BOOLEAN,
		creditAccepted: DataTypes.BOOLEAN,
		creditRefused: DataTypes.BOOLEAN,
		isPaid: DataTypes.BOOLEAN,
		dateDue: DataTypes.DATEONLY,
		dateLoanCompleted: DataTypes.DATEONLY,
	}, { paranoid: true });

	/* Class methods */

	Loan.associate = function (models) {
		Loan.belongsTo(models.User, { as: 'debtor' });
		Loan.belongsTo(models.User, { as: 'creditor' });
		Loan.belongsTo(models.User, { as: 'creator' });
		Loan.hasMany(models.Payment);
	};

	return Loan;
};
