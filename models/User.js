// Import the dependencies 
const { Schema, model } = require('mongoose');
// Use moment.js for timestamps
const moment = require('moment');

// Create userSchema that has username, email, thoughts and friends
const userSchema = new Schema({

    username: {
        // string, unique, required, trimmed
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        // Must match a valid email address
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [/.+\@.+\..+/]
            // validate: [validateEmail, "Please fill a valid email address"],
    },
    thoughts: [
        // Array of _id values referencing the Thought model
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        // Array of _id values referencing the User model (self-reference)
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    ]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
//   Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', userSchema);

// Export the model
module.exports = User;