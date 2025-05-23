//routes/routeRoutes.js
const express = require('express');
const router = express.Router();
const Route = require('../Models/route');

//Create a new route
router.post('/add-route', async (req, res) => {
    const { origin, destination, stops, distance } = req.body;
    const newRoute = new Route({ origin, destination, stops, distance });

    try {
        await newRoute.save();
        res.status(201).json({ message: 'Route added successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get all routes
router.get('/get-routes', async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;    