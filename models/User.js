const { Schema, model } = require('mongoose');
const validator = require("validator");

// Schema to create User model

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            max_length: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: "it is not valid email address"
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Creates a virtual property 'friendCount' that gets the number of friends associated with the user

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Initialize User model
const User = model('user', userSchema);

module.exports = User;

