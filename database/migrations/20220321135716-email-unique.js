module.exports = {
	async up(queryInterface) {
		return queryInterface.addConstraint('Users', {
			fields: ['email'],
			type: 'unique',
			name: 'email_unique',
		});
	},

	async down(queryInterface) {
		return queryInterface.removeConstraint('Users', 'email_unique');
	},
};
