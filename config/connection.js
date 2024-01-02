const mongoose = require('mongoose');
// const { connect, connection } = require('mongoose');

connect('mongodb://localhost/serialcheer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;