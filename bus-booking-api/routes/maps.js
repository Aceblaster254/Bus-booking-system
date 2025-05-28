//maps.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const PickupPoint = require('../Models/pickup-point');
const Bus = require('../models/bus-model');

// --- Geocoding helper using Nominatim (OpenStreetMap, no API key needed) ---
const geocodeAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const res = await axios.get(url, { headers: { 'User-Agent': 'BusBookingApp/1.0' } });
  if (res.data && res.data.length > 0) {
    return { lat: parseFloat(res.data[0].lat), lng: parseFloat(res.data[0].lon) };
  } else {
    throw new Error('Location not found');
  }
};

// --- 1. Add a Pickup Point (by name and/or address) ---
router.post('/pickup-points', async (req, res) => {
  const { name, address } = req.body;
  try {
    // Geocode the provided address or name
    const coords = await geocodeAddress(address || name);
    const point = new PickupPoint({ name, address, lat: coords.lat, lng: coords.lng });
    await point.save();
    res.status(201).json(point);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- 2. Get All Pickup Points ---
router.get('/pickup-points', async (req, res) => {
  try {
    const points = await PickupPoint.find({});
    res.json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- 3. Update a Bus's Location ---
router.post('/buses/:id/location', async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { location: { lat, lng, updatedAt: new Date() } },
      { new: true }
    );
    if (!bus) return res.status(404).json({ error: 'Bus not found' });
    res.json(bus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- 4. Get All Buses with Location ---
router.get('/buses', async (req, res) => {
  try {
    const buses = await Bus.find({}, 'busnumber location route status');
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//---Edit a pickup point--//
router.put('/pickup-points/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    let updateObj = { name, address };

  // If address is provided, re-geocode
    if (address) {
      const coords = await geocodeAddress(address);
      updateObj.lat = coords.lat;
      updateObj.lng = coords.lng;
    }

    const updated = await PickupPoint.findByIdAndUpdate(id, updateObj, { new: true });
    if (!updated) return res.status(404).json({ error: "Pickup point not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- Delete a Pickup Point ---
router.delete('/pickup-points/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await PickupPoint.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Pickup point not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//suggest pickup points as one types them
router.get('/pickup-points/suggest', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json([]);
  try {
    // Case-insensitive regex search on name OR address, limit to 10 results
    const suggestions = await PickupPoint.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } }
      ]
    }).limit(10);
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Find buses that have not yet passed the given pickup point
router.get('/pickup-points/:id/buses', async (req, res) => {
  const pickupPointId = req.params.id;
  try {
    // Get the pickup point (for its coordinates)
    const pickupPoint = await PickupPoint.findById(pickupPointId);
    if (!pickupPoint) return res.status(404).json({ error: "Pickup point not found" });

    // Get all buses, their route, and current location
    const buses = await Bus.find({}); // .populate('route') if route is refs

    // Helper: determine if a bus has passed the pickup point
    function hasNotPassed(bus) {
      // Let's assume bus.route is [pickupPointId1, pickupPointId2, ...]
      // and bus.currentStopIndex is the current stop the bus is at (int)
      // If the pickupPointId is after currentStopIndex, bus hasn't reached it yet
      if (!bus.route || !Array.isArray(bus.route)) return false;
      const index = bus.route.findIndex(id => id.toString() === pickupPointId);
      // If not in the route, skip
      if (index === -1) return false;
      return bus.currentStopIndex < index;
    }

    const filteredBuses = buses.filter(hasNotPassed);

    res.json(filteredBuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;