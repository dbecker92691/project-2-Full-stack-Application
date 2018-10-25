const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref:'Reviews'}]
});

module.exports = mongoose.model('Users', userSchema)

