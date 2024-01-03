const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    //username
    //email
    //thoughts
    //friends
    //toJSON
);

const User = model('User', UserSchema);

module.exports = User;