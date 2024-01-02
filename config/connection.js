const mongoose = require('mongoose');
// const { connect, connection } = require('mongoose');

connect(
    process.env.MONGODB_URI || 'mongodb://localhost/serialcheer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;