const dotenv = require("dotenv");
const express = require("express");
const { json } = require("express");
const mongoose = require("mongoose");
const twilio = require("twilio");
const axios = require("axios");
const cors = require("cors");
const postsRouter = require("./routes/postsRoute.js");
const { Server } = require("socket.io");
const http = require("http");
const connectDB = require("./db");
const roomRoutes = require("./routes/roomRoutes");
const messageRoutes = require("./routes/messageRoutes");

const roomController = require("./controllers/roomController");
const messageController = require("./controllers/messageController");
const chatRoutes = require("./routes/chatRoutes.js"); // Correct path to your chatRoutes file
const sosRoutes = require("./routes/sosRoutes.js");

dotenv.config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const uri = process.env.URI;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(json());

// Routes
app.use("/api/posts", postsRouter);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);
app.use(sosRoutes);
app.use("/api/chat", chatRoutes); // chat gpt 😍

const server = http.createServer(app); // Use HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", async ({ roomId }) => {
    const room = await roomController.getRoomById(roomId);

    if (!room) {
      socket.emit("error", { message: "Room not found" });
      return;
    }

    if (room.currentUsers >= room.maxUsers) {
      socket.emit("roomFull", { message: "No place in the room" });
      return;
    }

    await roomController.incrementRoomUsers(roomId);

    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    const messages = await messageController.getMessagesByRoomId(roomId);
    socket.emit("joinedRoom", { roomId, messages });
  });

  socket.on("message", async ({ roomId, text }) => {
    const messageController = require("./controllers/messageController");
    const message = await messageController.createMessage(
      roomId,
      socket.id,
      text
    );

    if (message) {
      io.to(roomId).emit("message", message);
    }
  });

  socket.on("disconnecting", async () => {
    const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
    for (const roomId of rooms) {
      await roomController.decrementRoomUsers(roomId);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
