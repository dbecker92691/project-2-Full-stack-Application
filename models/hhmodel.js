const mongoose = require('mongoose');

const happyHourSchema = new mongoose.Schema({
    restaurant:{type: String, required: true},
    time: {type: String, required: true},
    neighborhood: String
})

module.exports = mongoose.model('HappyHour', happyHourSchema);