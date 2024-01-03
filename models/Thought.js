const { Schema, model, Types } = require('mongoose');
//date format

const ReactionSchema = new Schema (
    //reactionID - use Types (mongoose objectid datatype)
    //reactionBody
    //username
    //createdAt
    //toJSON
);

const ThoughtSchema = new Schema(
    //thoughtText
    //createdAt
    //username
    //reactions - ReactionSchema
    //toJSON
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;