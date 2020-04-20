module.exports = {
	BASE_URL: 'localhost:3002',
	ERROR_TYPES: {
		NOT_NULL: 'notNull Violation',
		VALIDATION: 'Validation error',
		UNIQUE_CONSTRAINT: 'unique violation',
	},
	POLYGLOT: {
		WRONG_PASSWORD: 'wrong-password',
		FIELD_INVALID: 'field-invalid',
		FIELD_REQUIRED: 'field-required',
		REGISTERED: 'registered',
		UNIQUE: 'unique',
		ALREADY_FRIENDS: 'already-friends',
		NOT_FOUND: 'not-found',
		DEBT: 'debt',
	},
	DATABASE_FIELDS: {
		FIRST_NAME: 'firstName',
		LAST_NAME: 'lastName',
		PASSWORD: 'password',
		USER: 'user',
		FRIEND: 'friend',
		FRIEND_ID: 'friendId',
		DEBTOR: 'debtor',
		CREDITOR: 'creditor',
	},
	PAGINATION: {
		LIMIT: 2,
	}
};
