const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.mongodb.net:${process.env.DB_PORT},debts-shard-00-01-2fzoq.mongodb.net:${process.env.DB_PORT},debts-shard-00-02-2fzoq.mongodb.net:${process.env.DB_PORT}/${process.env.DB_NAME}?ssl=true&replicaSet=Debts-shard-0&authSource=admin&retryWrites=true`, {
  connectTimeoutMS: 30000, keepAlive: 300000, promiseLibrary: global.Promise, useNewUrlParser: true,
});

module.exports = mongoose;
