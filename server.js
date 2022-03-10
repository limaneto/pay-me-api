const fileSystem = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const auth = require('./config/auth');
import typeDefs from './schemas';
import userController from './components/users/controller';
import friendController from './components/friends/controller';
const Polyglot = require('node-polyglot');

const app = express();
const data = fileSystem.readFileSync('./locales/pt-br.json', 'utf8');
const polyglot = new Polyglot({ phrases: JSON.parse(data) });

auth.initialize();

app.use(cors());

app.post('/graphql', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	next();
})

const server = new ApolloServer({
		typeDefs,
		resolvers: {
			Query: {
				hello: () => {
					return 'Hello';
				}
			},
			Mutation: {
				register: async (_, { user }, { polyglot }) => {
					return await userController.register({ polyglot, user })
				},
				login: async (_, { email, password }, { polyglot }) => {
					return await userController.login({ email, password, polyglot })
				}
			}
		},
		context: ({ req, res }) => {
			return { user: req.user, polyglot };
		},
	}
);

server.start().then(() => {
	server.applyMiddleware({ app });

	app.listen({ port: 4000 }, () => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
	})
});


/**
 * Old Express implementation, before connecting GrapqhQL
 *
 */
// const fileSystem = require('fs');
// const bodyParser = require('body-parser');
// const helmet = require('helmet');
// const Polyglot = require('node-polyglot');
// const models = require('./models');
// const routes = require('./routes');
// const handleError = require('./utils/errorHandler');
// const auth = require('./config/auth');



// require('dotenv').config();
// require('colors');
//
// const app = express();
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(auth.initialize());
// app.set('port', process.env.PORT);
//
// const data = fileSystem.readFileSync('./locales/pt-br.json', 'utf8');
// const polyglot = new Polyglot({ phrases: JSON.parse(data) });
//
// app.get('/', (req, res) => {
// 	res.send('I hit / path\n');
// });
//
// models.sequelize.sync()
// 	.then(() => {
// 		app.listen(app.get('port'), () => {
// 			console.log(`I am alive on port ${app.get('port')}.\n`.green);
// 		});
// 	});
//
// routes(app, polyglot);
// handleError(app, polyglot);
