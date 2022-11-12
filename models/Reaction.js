const { Schema } = require('mongoose');
const moment = require('moment');

// Schema for creating Reaction model

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatDate
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

function formatDate(date) {
    moment(date).format('DD-MM-YYYY')
};

module.exports = reactionSchema;