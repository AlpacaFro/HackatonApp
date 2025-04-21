import React from "react";
import { Room } from "../types";

interface RoomCardProps {
  room: Room;
  onClick: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  // Format the availableUntil date or provide a fallback
  const availableTime =
    room.availableUntil && !isNaN(new Date(room.availableUntil).getTime())
      ? new Date(room.availableUntil).toLocaleString()
      : "Unknown";

  return (
    <div
      className={`relative border rounded shadow-lg overflow-hidden ${
        room.available ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      style={{
        backgroundImage: `url(${room.backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "200px",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
        <h2 className="text-lg font-bold">{room.name}</h2>
        <p>
          {room.currentUsers}/{room.maxUsers} users
        </p>
        {room.available ? (
          <p className="text-green-500">Available</p>
        ) : (
          <p className="text-red-500">Available at: {availableTime}</p>
        )}
        <button
          onClick={onClick}
          className={`mt-4 px-4 py-2 rounded ${
            room.available ? "bg-green-500" : "bg-red-500 cursor-not-allowed"
          }`}
          disabled={!room.available}
        >
          {room.available ? "Join" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
