const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
    busnumber: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    staffname: {
        type: String,
        required: true
    },
    staffphone: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'}
});

const Bus = mongoose.model('Bus', BusSchema);

module.exports = Bus;