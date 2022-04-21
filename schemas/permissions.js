import { allow, rule, shield } from 'graphql-shield';
import { ForbiddenError } from 'apollo-server-express';

const isLogged = rule()(async (_, args, { user }) => {
	if (user) return true;
	return new ForbiddenError('Not authorized');
});

const permissions = shield({
	Query: {
		'*': isLogged,
	},
	Mutation: {
		'*': isLogged,
		login: allow,
		register: allow,
	},
}, {
	debug: true,
});

export default permissions;
