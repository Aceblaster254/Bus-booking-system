const express = require('express');
const router = express.Router();
const Bus = require('../models/bus-model');

//Get all buses
router.get('/get-buses', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Create a new bus
router.post('/add-bus', async (req, res) => {
    const { busnumber, capacity, route, staffname, staffphone } = req.body;
    const newBus = new Bus({ busnumber, capacity, route, staffname, staffphone });

    try {
        await newBus.save();
        res.status(201).json({ message: 'Bus added successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Update a bus
router.put('/update-bus/:id', async (req, res) => {
    const { busnumber, capacity, route, staffname, staffphone, status } = req.body;
    const busId = req.params.id;

    try {
        await Bus.findByIdAndUpdate(busId, { busnumber, capacity, route, staffname, staffphone, status });
        res.json({ message: 'Bus updated successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Delete a bus
router.delete('/delete-bus/:id', async (req, res) => {
    const busId = req.params.id;

    try {
        await Bus.findByIdAndDelete(busId);
        res.json({ message: 'Bus deleted successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;