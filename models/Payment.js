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
	loanId: {
		type: Sequelize.DataTypes.UUID,
		references: {
			model: 'Loans',
			key: 'id',
		},
	},
	datePaid: Sequelize.DataTypes.DATEONLY,
	paymentReceived: Sequelize.DataTypes.BOOLEAN,
	description: Sequelize.DataTypes.STRING,

	createdAt: {
		allowNull: false,
		type: Sequelize.DataTypes.DATE,
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DataTypes.DATE,
	},
	deletedAt: {
		allowNull: true,
		type: Sequelize.DataTypes.DATE,
	},
}, { paranoid: true });

export default Payment;
