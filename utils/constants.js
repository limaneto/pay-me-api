module.exports = {
	BASE_URL: 'localhost:3002',
	ERROR_TYPES: {
		NOT_NULL: 'notNull Violation',
		VALIDATION: 'Validation error',
		UNIQUE_CONSTRAINT: 'unique violation',
	},
	POLYGLOT: {
		UNKNOWN_ERROR: 'unknown_error',
		WRONG_PASSWORD: 'wrong-password',
		FIELD_INVALID: 'field-invalid',
		FIELD_REQUIRED: 'field-required',
		REGISTERED: 'registered',
		UNIQUE: 'unique',
		ALREADY_FRIENDS: 'already-friends',
		NOT_FOUND: 'not-found',
		DEBT: 'debt',
	},
	POLYGLOT_SEQUELIZE: {
		isEmail: 'field-invalid',
		not_unique: 'unique',
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
		EMAIL: 'email',
	},
	PAGINATION: {
		LIMIT: 10,
	},
};
