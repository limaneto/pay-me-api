module.exports = (sequelize, DataTypes) => {
	const Payment = sequelize.define('Payment', {
		value: { type: DataTypes.FLOAT, allowNull: false },
		datePaid: { type: DataTypes.DATEONLY },
		paymentReceived: { type: DataTypes.BOOLEAN },
		description: { type: DataTypes.STRING },
	}, { paranoid: true });

	/* Class methods */

	Payment.associate = function (models) {
		Payment.belongsTo(models.Loan);
	};

	return Payment;
};
