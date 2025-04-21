require('dotenv').config();
const mongoose = require('mongoose');
const Room = require('./models/Room');

mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    // Clear existing rooms
    await Room.deleteMany();

    // Seed new rooms
    const rooms = [
      { name: 'Anxiety', maxUsers: 10 },
      { name: 'Stress', maxUsers: 10 },
      { name: 'PTSD Support', maxUsers: 10 },
    ];

    await Room.insertMany(rooms);
    console.log('Sample rooms added');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });