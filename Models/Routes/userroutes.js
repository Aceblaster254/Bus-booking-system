const express = require('express');
const router = express.Router();    
const User = require('../models/user-model');

//Get all users
router.get('/get-users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Create a new user
router.post('/add-user', async (req, res) => {
    const { name, email, password, role, phoneNumber } = req.body;
    const newUser = new User({ name, email, password, role, phoneNumber });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User added successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Update a user
router.put('/update-user/:id', async (req, res) => {
    const { name, email, password, role, phoneNumber } = req.body;
    const userId = req.params.id;

    try {
        await User.findByIdAndUpdate(userId, { name, email, password, role, phoneNumber });
        res.json({ message: 'User updated successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Delete a user
router.delete('/delete-user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);
        res.json({ message: 'User deleted successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }  
});
module.exports = router;