const Room = require('../models/Room');

exports.getAllRooms = async () => {
  return await Room.find();
};

exports.getRoomById = async (roomId) => {
  return await Room.findById(roomId);
};

exports.incrementRoomUsers = async (roomId) => {
  const room = await Room.findById(roomId);
  if (room) {
    room.currentUsers += 1;
    await room.save();
  }
  return room;
};

exports.decrementRoomUsers = async (roomId) => {
  const room = await Room.findById(roomId);
  if (room) {
    room.currentUsers -= 1;
    await room.save();
  }
  return room;
};

exports.addMessageToRoom = async (roomId, userId, text) => {
  const room = await Room.findById(roomId);
  if (room) {
    const message = { userId, text };
    room.messages.push(message);
    await room.save();
    return message;
  }
  return null;
};