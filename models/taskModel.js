const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    author_id: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('Task', TaskSchema);