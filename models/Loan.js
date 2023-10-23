import Sequelize from 'sequelize';
import sequelize from '../database/instance';
import Payment from './Payment';

const Loan = sequelize.define('Loan', {
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
	isActive: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: true },
	title: { type: Sequelize.DataTypes.STRING(20), allowNull: false },
	description: Sequelize.DataTypes.STRING,
	value: { type: Sequelize.DataTypes.FLOAT, allowNull: false },
	debtAccepted: Sequelize.DataTypes.BOOLEAN,
	debtRefused: Sequelize.DataTypes.BOOLEAN,
	creditAccepted: Sequelize.DataTypes.BOOLEAN,
	creditRefused: Sequelize.DataTypes.BOOLEAN,
	isPaid: Sequelize.DataTypes.BOOLEAN,
	dateDue: Sequelize.DataTypes.DATEONLY,
	dateLoanCompleted: Sequelize.DataTypes.DATEONLY,

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

Loan.hasMany(Payment, { as: 'loan', foreignKey: 'loanId' });
Payment.belongsTo(Loan, { as: 'loan', foreignKey: 'loanId' });

export default Loan;
