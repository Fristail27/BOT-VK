const {Schema, model} = require('mongoose')

const userModel = new Schema({
    Id: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    reputation: {
        type: Number,
        required: true
    },
    feedCount: {
        type: Number,
        required: true
    }
})

module.exports = model('User', userModel)