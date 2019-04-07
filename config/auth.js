const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../components/user/model');

const jwtFromRequest = ExtractJwt.fromHeader('authorization');
const secretOrKey = process.env.AUTH_SECRET;

const JWTStrategy = new Strategy({ jwtFromRequest, secretOrKey }, (payload, done) => {
	User
		.findById(payload.id, (err, user) => {
			if (err) done(err, false);
			if (user) done(null, user);
			else done(null, false);
		});
});

passport.use(JWTStrategy);

module.exports = {
	initialize: () => passport.initialize(),
	authenticate: () => passport.authenticate('jwt', { session: false }),
};
