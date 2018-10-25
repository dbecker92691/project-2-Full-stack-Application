const mongoose = require('mongoose');

const happyHourSchema = new mongoose.Schema({
    restaurant:{type: String, required: true},
    time: {type: String, required: true},
    neighborhood: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reviews'}]
})

module.exports = mongoose.model('HappyHour', happyHourSchema);



// link review model so that users will be able to review a new HH or existing HH