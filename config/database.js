require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_CONTAINER_NAME,
		dialect: process.env.DB_DIALECT,
		port: process.env.DB_HOST_POST,
		logging: true,
	},
};
