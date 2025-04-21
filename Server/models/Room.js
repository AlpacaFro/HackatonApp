const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    currentUsers: { type: Number, default: 0 },
    maxUsers: { type: Number, default: 10 },
    messages: [messageSchema],
  });
  

module.exports = mongoose.model('Room', roomSchema);