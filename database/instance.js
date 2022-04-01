import Sequelize from 'sequelize';

require('dotenv').config();

const sequelizeOptions = {
	username: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_HOST_PORT,
	dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;

// uncomment for TESTING CONNECTION
sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch((e) => {
	console.log(e);
});
