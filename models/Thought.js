const { Schema, model, Types } = require('mongoose');
const date = require('../utils/date');

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
            get: (timestamp) => date(timestamp),
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
            get: (timestamp) => date(timestamp),
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