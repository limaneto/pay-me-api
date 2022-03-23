import Sequelize from 'sequelize';
import sequelize from '../database/instance';

const Payment = sequelize.define('Payment', {
	id: {
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.DataTypes.UUIDV4,
		primaryKey: true,
	},
	value: {
		type: Sequelize.DataTypes.FLOAT,
		allowNull: false,
	},
	datePaid: {
		type: Sequelize.DataTypes.DATEONLY,
	},
	paymentReceived: {
		type: Sequelize.DataTypes.BOOLEAN,
	},
	description: {
		type: Sequelize.DataTypes.STRING,
	},
}, { paranoid: true });

/* Class methods */

Payment.associate = function associate(models) {
	Payment.belongsTo(models.Loan);
};

export default Payment;
