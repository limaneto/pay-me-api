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
import User from './models/User';

const app = express();
const data = fileSystem.readFileSync('./locales/pt-br.json', 'utf8');
const polyglot = new Polyglot({ phrases: JSON.parse(data) });

app.use(cors());
app.use(jwt({
	secret: process.env.AUTH_SECRET,
	algorithms: ['HS256'],
	credentialsRequired: false,
}), (err, req, res, next) => {
	if (err.code === 'invalid_token') return next();
	return next(err);
});

const schema = makeExecutableSchema({
	typeDefs,
	resolvers: {
		LoginResponse: {
			__resolveType({ __typeName }) {
				return __typeName;
			},
		},
		RegisterResponse: {
			__resolveType({ __typeName }) {
				return __typeName;
			},
		},
		AddFriendResponse: {
			__resolveType({ __typeName }) {
				return __typeName;
			},
		},
		Query: {
			getFriends: async (_, { page, limit }, { user }) => friendController.getFriends({ page, limit, user }), // eslint-disable-line max-len
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
		if (req.user && req.user.id) {
			const userModel = await User.findByPk(req.user.id);
			return { user: userModel };
		}
	},
});

server.start().then(() => {
	server.applyMiddleware({ app });

	app.listen({ port: process.env.PORT }, () => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
	});
});
