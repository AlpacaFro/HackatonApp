import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getRooms = async () => {
  const response = await axios.get(`${API_BASE_URL}/rooms`);
  return response.data;
};

export const getRoomDetails = async (roomId: string) => {
  const response = await axios.get(`${API_BASE_URL}/rooms/${roomId}`);
  return response.data;
};