import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLScalarType } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import Polyglot from 'node-polyglot';
import express from 'express';
import jwt from 'express-jwt';
import cors from 'cors';
import fileSystem from 'fs';
import typeDefs from './schemas';
import userController from './components/users/controller';
import friendController from './components/friends/controller';
import loanController from './components/loans/controller';
import paymentController from './components/payments/controller';
import permissions from './schemas/permissions';
import User from './models/User';
import { serializeDate } from './utils/helpers';

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
		Date: new GraphQLScalarType({
			name: 'Date',
			description: 'Date custom scalar type',
			parseValue(value) {
				return new Date(value); // value from the client
			},
			serialize(value) {
				if (typeof value === 'string') return value;
				return serializeDate(value); // value sent to the client
			},
		}),
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
		CreateLoanResponse: {
			__resolveType({ __typeName }) {
				return __typeName;
			},
		},
		CreatePaymentResponse: {
			__resolveType({ __typeName }) {
				return __typeName;
			},
		},
		ConfirmPaymentResponse: {
			__resolveType({ __typeName }) {
				return __typeName;
			},
		},
		Query: {
			getMyCredits: async (_, { page, limit }, { user }) => loanController.getMyCredits({ page, limit, user }), // eslint-disable-line max-len
			getMyDebts: async (_, { page, limit }, { user }) => loanController.getMyDebts({ page, limit, user }), // eslint-disable-line max-len
			getFriends: async (_, { page, limit }, { user }) => friendController.getFriends({ page, limit, user }), // eslint-disable-line max-len
			getFriendsByEmail: async (_, { search, page, limit }, { user }) => friendController.getFriendsByEmail({ search, page, limit, user }), // eslint-disable-line max-len,
			getAllPayments: async (_, { loanId, page, limit }) => paymentController.getAllPayments({ loanId, page, limit }), // eslint-disable-line max-len
		},
		Mutation: {
			acceptLoan: async  (_, { loanId }, { user }) => loanController.acceptLoan({ loanId, polyglot, user }), // eslint-disable-line max-len
			createPayment: async (_, { loanId, payment }, { user }) => paymentController.createPayment({ payment: { ...payment, loanId }, polyglot, user }), // eslint-disable-line max-len
			confirmPayment: async (_, { paymentId }, { user }) => paymentController.confirmPayment({ paymentId, polyglot, user }), // eslint-disable-line max-len
			createLoan: async (_, { creditorId, debtorId, loan }, { user }) => loanController.createLoan({ loan, creditorId, debtorId, user }), // eslint-disable-line max-len
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
