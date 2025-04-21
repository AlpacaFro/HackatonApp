import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000', {
  transports: ["websocket", "polling"],
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});