// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./db');
const roomRoutes = require('./routes/roomRoutes');
const messageRoutes = require('./routes/messageRoutes');

const roomController = require('./controllers/roomController');
const messageController = require('./controllers/messageController');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', async ({ roomId }) => {
 
    const room = await roomController.getRoomById(roomId);

    if (!room) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }

    if (room.currentUsers >= room.maxUsers) {
      socket.emit('roomFull', { message: 'No place in the room' });
      return;
    }

    await roomController.incrementRoomUsers(roomId);

    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    const messages = await messageController.getMessagesByRoomId(roomId);
    socket.emit('joinedRoom', { roomId, messages });
  });

  socket.on('message', async ({ roomId, text }) => {
    const messageController = require('./controllers/messageController');
    const message = await messageController.createMessage(roomId, socket.id, text);

    if (message) {
      io.to(roomId).emit('message', message);
    }
  });

  socket.on('disconnecting', async () => {
    const roomController = require('./controllers/roomController');
    const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
    for (const roomId of rooms) {
      await roomController.decrementRoomUsers(roomId);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
