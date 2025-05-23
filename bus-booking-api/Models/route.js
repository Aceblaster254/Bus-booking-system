//Models/route.js
const mongoose = require('mongoose');
const Routeschema = new mongoose.Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    stops: {
        type: [String],
    },
    distance: {
        type: Number,
        required: true
    },
}); 
module.exports = mongoose.model('Route', Routeschema);