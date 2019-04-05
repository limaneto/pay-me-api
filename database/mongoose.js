const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_SERVER_PORT}/${process.env.DB_NAME}`, {
  connectTimeoutMS: 30000, keepAlive: 300000, promiseLibrary: global.Promise, useNewUrlParser: true,
});

module.exports = mongoose;
