import { gql } from 'apollo-server-express';

export default gql`
	scalar Date
		
	type Loan {
			id: ID!
			isActive: Boolean
			title: String!
			description: String
			value: Float!
			debtAccepted: Boolean
			debtRefused: Boolean
      creditAccepted: Boolean
      creditRefused: Boolean
      isPaid: Boolean
      dateDue: Date
      dateLoanCompleted: Date
	}
	
	input UserInput {
      firstName: String!
      lastName: String!
      email: String!
      password: String!		
	}
	
	type User {
			id: ID!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
	}
	
	type Payment {
			id: ID!
			value: Float!
			datePaid: Date
			paymentReceived: Boolean
			description: String
	}
	
	type Friend {
			id: ID!
			userId: ID!
			friendId: ID!
	}
	
  type Query {
      hello: String
  }
  type Mutation {
      register(user: UserInput): RegisterResponse
  }
  type RegisterResponse {
      message: String!
			user: UserResponse!
  }
	
	type UserResponse {
			id: ID!
			email: String!
			token: String!
	}
`;


// import { GraphQLScalarType } from 'graphql';
// import { Kind } from 'graphql/language';
//
// const resolverMap = {
// 	Date: new GraphQLScalarType({
// 		name: 'Date',
// 		description: 'Date custom scalar type',
// 		parseValue(value) {
// 			return new Date(value); // value from the client
// 		},
// 		serialize(value) {
// 			return value.getTime(); // value sent to the client
// 		},
// 		parseLiteral(ast) {
// 			if (ast.kind === Kind.INT) {
// 				return parseInt(ast.value, 10); // ast value is always in string format
// 			}
// 			return null;
// 		},
// 	}),
