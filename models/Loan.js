import Sequelize from 'sequelize';
import sequelize from '../database/instance';

const Loan = sequelize.define('Loan', {
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
}, { paranoid: true });

/* Class methods */

Loan.associate = function associate(models) {
	Loan.belongsTo(models.User, { as: 'debtor' });
	Loan.belongsTo(models.User, { as: 'creditor' });
	Loan.belongsTo(models.User, { as: 'creator' });
	Loan.hasMany(models.Payment);
};

export default Loan;
