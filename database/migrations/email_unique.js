module.exports = {
	up: (queryInterface) => {
		return queryInterface.addConstraint('Users', ['email'], {
			type: 'unique',
			name: 'email_unique_constraint'
		});
	},
	down: (queryInterface) => {
		return queryInterface.removeConstraint('Users', 'email_unique_constraint');
	}
};
