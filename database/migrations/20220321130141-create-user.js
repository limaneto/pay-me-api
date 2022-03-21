module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.DataTypes.UUIDV4,
				primaryKey: true,
			},
			firstName: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
			},
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable('Users');
	},
};
