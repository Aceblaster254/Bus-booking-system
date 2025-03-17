// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//Middleware
app.use(bodyParser.json());

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BusBooking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Test route
app.get('/', (req, res) => {
    res.send('Bus Booking API is live');
});

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
