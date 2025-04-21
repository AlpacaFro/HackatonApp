import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import axios from "axios";

interface Room {
  _id: string; // MongoDB ID
  name: string;
  currentUsers: number;
  maxUsers: number;
  available: boolean; // Indicates if the room is currently available
  availableUntil?: string; // ISO string for availability expiration
  backgroundUrl: string; // URL for the room's background image
}

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [username, setUsername] = useState<string>(
    sessionStorage.getItem("username") || ""
  );
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/rooms");
        const currentTimestamp = new Date().toISOString();

        // Filter rooms to show only available ones
        const filteredRooms = response.data.map((room: Room) => ({
          ...room,
          available:
            room.available &&
            (!room.availableUntil || room.availableUntil > currentTimestamp),
        }));

        setRooms(filteredRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
    const intervalId = setInterval(fetchRooms, 60000); // Update every 60 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleRoomClick = (room: Room) => {
    if (!room.available) {
      alert("This room is currently unavailable.");
      return;
    }

    if (!username.trim()) {
      setUsernameModalVisible(true);
      return;
    }

    if (room.currentUsers >= room.maxUsers) {
      alert("No place in the room");
      return;
    }

    sessionStorage.setItem("username", username);
    navigate(`/rooms/${room._id}`);
  };

  const handleSetUsername = () => {
    if (!username.trim()) {
      alert("Username cannot be empty.");
      return;
    }
    setUsernameModalVisible(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Rooms</h1>

      {usernameModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Enter your username</h2>
            <input
              type="text"
              className="border p-2 rounded w-full mb-4"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleSetUsername}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.length === 0 ? (
          <p className="text-center text-gray-500">No rooms available right now.</p>
        ) : (
          rooms.map((room) => (
            <RoomCard
key={room._id} // Use the unique room ID as the key
    room={room}
    onClick={() => handleRoomClick(room)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RoomsPage;
