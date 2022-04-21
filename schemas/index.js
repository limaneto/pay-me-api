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
	
	input LoanInput {
      title: String!
      description: String
      value: Float!
      dateDue: Date
	}
	
	input UserInput {
      firstName: String!
      lastName: String!
      email: String!
      password: String!		
	}
	
	type User {
			id: ID!
			fullName: String!
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
	
  type Query {
      getFriends(page: Int!, limit: Int): [User]
      getFriendsByEmail(search: String!, page: Int!, limit: Int): [User]
      hello: String
  }

	type Message {
			message: String!
	}
	
	type Login {
			message: String!
			token: String!
	}
	
	type Error {
			error: Message!
	}
	
	type ErrorKey {
			key: String!
			message: String!
	}
	
	type Errors {
			errors: [ErrorKey!]!
	}
	
	union LoginResponse = Login | Error | Errors
	
  type Mutation {
      createLoan(loan: LoanInput! creditorId: ID! debtorId: ID!): Loan!
			addFriend(friendId: String!): AddFriendResponse!
      register(user: UserInput): RegisterResponse!
			login(email: String! password: String!): LoginResponse!
  }
	
   type Register {
      message: String
			user: UserResponse
  }
	
	type UserResponse {
			id: ID!
			email: String!
			token: String!
	}
	
	union RegisterResponse = Register | Errors

  union AddFriendResponse = Message | Error
`;
