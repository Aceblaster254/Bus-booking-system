const express = require('express');
const router = express.Router();
const Booking = require('../models/booking-model');

//Get all bookings
router.get('/get-bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Create a new booking
router.post('/add-booking', async (req, res) => {
    const { bus, user, route, date, time, seatNumber } = req.body;
    const newBooking = new Booking({ bus, user, route, date, time, seatNumber });

    try {
        await newBooking.save();
        res.status(201).json({ message: 'Booking added successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Update a booking
router.put('update-booking/id', async (req, res) => {
    const { bus, user, route, date, time, seatNumber } = req.body;
    const bookingId = req.params.id;

    try {
        await Booking.findByIdAndUpdate(bookingId, { bus, user, route, date, time, seatNumber });
        res.json({ message: 'Booking updated successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Delete a booking
router.delete('/delete-booking/:id', async (req, res) => {
    const bookingId = req.params.id;

    try {
        await Booking.findByIdAndDelete(bookingId);
        res.json({ message: 'Booking deleted successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;                                           
        