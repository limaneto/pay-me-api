'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  	return queryInterface.addColumn('Loans', 'creator', {
  		type: Sequelize.UUID,
			references: {
  			model: 'Users',
				key: 'id',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			defaultValue: Sequelize.UUIDV4,
		});
  },

  down: (queryInterface) => {
   return queryInterface.removeColumn('Loans', 'creditor');
  }
};
