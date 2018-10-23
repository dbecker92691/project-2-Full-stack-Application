const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: {type: String, require: true},
    happyHour: {type: mongoose.Schema.Types.ObjectId, ref: 'HappyHour'}

})

module.exports = mongoose.model('Reviews', reviewSchema)


