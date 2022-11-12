const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Schema for creating Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    },
);

function formatDate(date) {
    moment(date).format('DD-MM-YYYY')
};

// Creates a virtual property 'reactionCount' that gets the number of reactions associated with the thought

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


// Initialize Thought  model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;