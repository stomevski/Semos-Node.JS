const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true,
        min: 10,
        max: 1500
    },
    author: {
        type: String,
        required: true,

    },
    yearReleased: {
        type: Number,
        required: true,
        min: 1000,
        max: new Date().getFullYear()
    }


})


module.exports = mongoose.model('Book', bookSchema);