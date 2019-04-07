const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect('mongodb://limaneto:Csf864791@ds119161.mlab.com:19161/payme', {
	connectTimeoutMS: 30000, keepAlive: 300000, promiseLibrary: global.Promise, useNewUrlParser: true,
});

module.exports = mongoose;
