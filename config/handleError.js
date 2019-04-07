/* eslint-disable no-unused-vars */
module.exports = (app) => {
	app.use((err, req, res, next) => {
		res.status(err.status).json({
			message: err.message,
		});
	});
};
