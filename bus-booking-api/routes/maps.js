//maps.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const PickupPoint = require('../models/PickupPoint');
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

module.exports = router;