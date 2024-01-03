const mongoose = require('mongoose');
require('dotenv').config();
// const { connect, connection } = require('mongoose');

//wrap mongoose around mongodb local connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/serialsocial', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//log all executed collection methods & their arguments to console
mongoose.set('debug', true);

//export connection
module.exports = mongoose.connection;