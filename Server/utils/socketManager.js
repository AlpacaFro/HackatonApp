const Room = require("../models/Room");
const Message = require("../models/Message");

const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Handle user joining a room
        socket.on("joinRoom", async ({ room, username }) => {
            try {
                const existingRoom = await Room.findOne({ roomName: room });

                if (!existingRoom) {
                    socket.emit("joinFailed", "Room does not exist.");
                    return;
                }

                if (existingRoom.exitList.includes(username)) {
                    socket.emit("joinFailed", "You cannot rejoin this room after exiting.");
                    return;
                }

                if (!existingRoom.available || existingRoom.currentUserCount >= existingRoom.maxUsers) {
                    socket.emit("joinFailed", "Room is full or unavailable.");
                    return;
                }

                // Join the room
                socket.join(existingRoom._id.toString());
                socket.nickname = username;
                socket.roomId = existingRoom._id; // Store roomId for later use

                existingRoom.currentUserCount += 1;

                if (existingRoom.currentUserCount === existingRoom.maxUsers) {
                    existingRoom.available = false;
                }

                await existingRoom.save();

                // Broadcast room updates to all users
                io.emit("roomUpdate", {
                    roomName: existingRoom.roomName,
                    currentUserCount: existingRoom.currentUserCount,
                    available: existingRoom.available,
                });

                // Send previous messages to the user
                const messages = await Message.find({ roomId: existingRoom._id }).sort({ timestamp: 1 });
                socket.emit("previousMessages", messages);

                // Notify room of new user
                io.to(existingRoom._id.toString()).emit("chatMessage", `${username} has joined the room.`);
            } catch (error) {
                console.error("Error joining room:", error);
                socket.emit("joinFailed", "An error occurred while joining the room.");
            }
        });

        // Handle sending messages
        socket.on("sendMessage", async ({ message }) => {
            try {
                if (!socket.roomId || !socket.nickname) {
                    socket.emit("sendFailed", "You are not in a room.");
                    return;
                }

                // Save the message to the database
                const newMessage = new Message({
                    roomId: socket.roomId, // Use the stored roomId
                    sender: socket.nickname,
                    text: message,
                    timestamp: new Date(),
                });

                await newMessage.save();

                // Broadcast the message to the room
                io.to(socket.roomId.toString()).emit("chatMessage", {
                    sender: socket.nickname,
                    text: message,
                    timestamp: newMessage.timestamp,
                });
            } catch (error) {
                console.error("Error sending message:", error);
                socket.emit("sendFailed", "Failed to send message.");
            }
        });

        // Handle user disconnection
        socket.on("disconnect", async () => {
            try {
                if (socket.roomId) {
                    const room = await Room.findById(socket.roomId);

                    if (room) {
                        room.currentUserCount -= 1;

                        if (room.currentUserCount < room.maxUsers) {
                            room.available = true;
                        }

                        await room.save();

                        // Notify all users about room update
                        io.emit("roomUpdate", {
                            roomName: room.roomName,
                            currentUserCount: room.currentUserCount,
                            available: room.available,
                        });

                        io.to(room._id.toString()).emit("chatMessage", `${socket.nickname} has left the room.`);
                    }
                }
            } catch (error) {
                console.error("Error handling disconnect:", error);
            }

            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

module.exports = setupSocket;
