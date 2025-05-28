// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/busBooking')

.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log('Error connecting to mongoDB:', error.message);
})

//Import routes
const routeRoutes = require('./routes/routeRoutes');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const mapRoutes = require('./routes/maps');

//Use routes
app.use('/routes', routeRoutes);
app.use('/users', userRoutes);
app.use('/buses', busRoutes);
app.use('/bookings', bookingRoutes);
app.use('/maps', mapRoutes);

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
