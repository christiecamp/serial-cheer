const { Schema, model, Types } = require('mongoose');
//date manipulator
const moment = require('moment');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMMM Do, YYYY [at] HH:mm'),
        }
    },
    {
        toJSON: { getters: true },
        id: false,
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMMM Do, YYYY [at] HH:mm'),
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [ReactionSchema],
    },
    {
        toJSON: { 
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

ThoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;