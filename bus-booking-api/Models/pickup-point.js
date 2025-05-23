const mongoose = require('mongoose');

const PickupPointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  address: {
    type: String // Optional: full address or description
  }
});

module.exports = mongoose.model('PickupPoint', PickupPointSchema);