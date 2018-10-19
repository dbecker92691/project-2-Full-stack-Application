const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: {type: String, require: true, unique: true},
    review: {type: String, require: true, unique: true},
})

module.exports = mongoose.model('Reviews', reviewSchema)