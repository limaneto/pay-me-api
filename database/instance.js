import Sequelize from 'sequelize';

require('dotenv').config();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD, {
		host: process.env.DB_HOST,
		dialect: 'postgres',
	},
);

export default sequelize;

// uncomment for TESTING CONNECTION
// sequelize.authenticate().then(() => {
// 	console.log('Connection has been established successfully.');
// }).catch((e) => {
// 	console.log(e);
// });
