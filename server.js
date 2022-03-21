import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import Polyglot from 'node-polyglot';
import express from 'express';
import jwt from 'express-jwt';
import cors from 'cors';
import fileSystem from 'fs';
import typeDefs from './schemas';
import userController from './components/users/controller';
import friendController from './components/friends/controller';
import permissions from './schemas/permissions';
import models from './models';

const app = express();
const data = fileSystem.readFileSync('./locales/pt-br.json', 'utf8');
const polyglot = new Polyglot({ phrases: JSON.parse(data) });

app.use(cors());
app.use(jwt({
	secret: process.env.AUTH_SECRET,
	algorithms: ['HS256'],
	credentialsRequired: false,
}));

const schema = makeExecutableSchema({
	typeDefs,
	resolvers: {
		Query: {
			hello: () => 'Hello',
		},
		Mutation: {
			addFriend: async (_, { friendId }, { user }) => friendController.addFriend({ friendId, polyglot, user }), // eslint-disable-line max-len
			register: async (_, { user }) => userController.register({ polyglot, user }), // eslint-disable-line max-len
			login: async (_, { email, password }) => userController.login({ email, password, polyglot }),
		},
	},
});

const server = new ApolloServer({
	schema: applyMiddleware(schema, permissions),
	context: async ({ req }) => {
		const userModel = await models.User.findByPk(req.user.id);
		return { user: userModel };
	},
});

server.start().then(() => {
	server.applyMiddleware({ app });

	app.listen({ port: 4000 }, () => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
	});
});
