const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const db = {};
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD, {
		host: process.env.DB_HOST,
		dialect: 'postgres'
	}
);

// file => (file.indexOf('.') !== 0) arquivo que tem um ponto
// file !== path.basename(__filename) não é esse arquivo index.js
// file.slice(-3) === '.js' é um arquivo javascript
// sequelize.import(path.join(__dirname, file)) junta o path com o nome do arquivo

fs
	.readdirSync(__dirname)
	.filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
	.forEach((file) => {
		const model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
