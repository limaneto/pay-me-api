module.exports = (sequelize, DataTypes) => {
	const Payment = sequelize.define('Payment', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		value: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		datePaid: {
			type: DataTypes.DATEONLY,
		},
		paymentReceived: {
			type: DataTypes.BOOLEAN,
		},
		description: {
			type: DataTypes.STRING,
		},
	}, { paranoid: true });

	/* Class methods */

	Payment.associate = function (models) {
		Payment.belongsTo(models.Loan);
	};

	return Payment;
};
