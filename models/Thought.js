const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Reaction schema
const ReactionSchema = new Schema({
    // reactionId, reactionBody, username, createdAt
    reactionId: {
        // Use Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        //Default value is set to a new ObjectId
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        // String, Required, 280 character maximum
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        // String, Required
        type: String,
        required: true
    },
    createdAt: {
        // Date
        type: Date,
        // Set default value to the current timestamp
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
// ThoughtSchema
const ThoughtSchema = new Schema({
        // thoughtSchema includes thoughtText, createdAt, username, reactions
        thoughtText: {
            // string, required, Must be between 1 and 280 characters
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            // Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')


        },
        username: {
            // String, Required
            type: String,
            required: true,
        },
        // Array of nested documents created with the reactionSchema
        reactions: [ReactionSchema]
    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }

);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;