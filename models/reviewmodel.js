const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    review: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
})

module.exports = mongoose.model('Reviews', reviewSchema)