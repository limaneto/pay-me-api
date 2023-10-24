module.exports = {
	async up(queryInterface) {
		return queryInterface.renameColumn('Payments', 'paymentReceived', 'received');
	},

	async down(queryInterface) {
		return queryInterface.renameColumn('Payments', 'received', 'paymentReceived');
	},
};
