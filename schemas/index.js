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
      getFriends(page: Int!, limit: Int): [Friend]
      hello: String
  }

  type Mutation {
			addFriend(friendId: String!): BaseResponse!
      register(user: UserInput): RegisterResponse!
			login(email: String! password: String!): LoginResponse!
  }
	
	type BaseResponse {
			message: String!
	}
	
	type Error {
			key: String!
			message: String!
	}
	
	type ErrorResponse {
			message: String
			fields: [Error]
	}
	
  type RegisterResponse {
      message: String!
			user: UserResponse!
  }
	
	type LoginResponse {
			message: String
			token: String
			errors: ErrorResponse
	}
	
	type UserResponse {
			id: ID!
			email: String!
			token: String!
	}
`;
