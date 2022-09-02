const mongoose = require('mongoose');

// name, subscriberChannel, date(default)

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Subscriber', subscriberSchema);