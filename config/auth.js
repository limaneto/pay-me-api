const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

const jwtFromRequest = ExtractJwt.fromHeader('authorization');
const secretOrKey = process.env.AUTH_SECRET;

const JWTStrategy = new Strategy({ jwtFromRequest, secretOrKey }, (payload, done) => {
	User
		.findByPk(payload.id)
		.then(user => {
			if (user) done(null, user);
			else done(null, false);
		})
		.catch(err => {
			if (err) done(err, false);
		});
});

passport.use(JWTStrategy);

module.exports = {
	initialize: () => passport.initialize(),
};
