const express = require('express');
const fileSystem = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const Polyglot = require('node-polyglot');
const models = require('./models');
const routes = require('./routes');
const handleError = require('./utils/errorHandler');
const auth = require('./config/auth');

require('dotenv').config();
require('colors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(auth.initialize());
app.set('port', process.env.PORT);

const data = fileSystem.readFileSync('./locales/pt-br.json', 'utf8');
const polyglot = new Polyglot({ phrases: JSON.parse(data) });

app.get('/', (req, res) => {
	res.send('I hit / path\n');
});

models.sequelize.sync()
	.then(() => {
		app.listen(app.get('port'), () => {
			console.log(`I am alive on port ${app.get('port')}.\n`.green);
		});
	});

routes(app, polyglot);
handleError(app, polyglot);
