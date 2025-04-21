import { useNavigate, Link } from "react-router-dom";
import { Post, Room } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import logo from "../infoImage/shtef-no-bg.png";
import linkLogo from "../infoImage/external-link-icon.png";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/posts?limit=3"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleCalendarClick = () => {
    navigate("/calendar"); // Redirect to the calendar page
  };

  return (
    <div className="bg-[#a3bcbd] h-full w-screen">
      <img src={logo} alt="bbaba" />

      <div className="flex flex-col gap-10 mt-10 shadow-md ">
        <h1 className="text-center text-3xl  mt-3 tracking-widest text-cyan-950">
          {" "}
          צ'אט אנונימי{" "}
        </h1>
        <div className="gap-5 flex flex-row overflow-scroll shadow-md">
          {rooms.map((room) => (
            <Link
              to={`/rooms/${room._id}`} // Dynamic link to the chat room page
              key={room._id} // Unique key for each room
              className="no-underline" // Optional: Prevent default link styling
            >
              <Card
                orientation="horizontal"
                size="sm"
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  cursor: "pointer",
                  backgroundColor: "#ede8d0",
                  color: "#1B3951",
                }}
              >
                <AspectRatio ratio="1" sx={{ minWidth: 40 }}>
                  <img
                    src={`https://via.placeholder.com/60?text=${room.name[0]}`} // Placeholder image with room name's first letter
                    alt={room.name}
                  />
                </AspectRatio>
                <Box sx={{ whiteSpace: "nowrap", mx: 1 }}>
                  <Typography level="title-md">{room.name}</Typography>
                  <Typography level="body-sm">
                    Users: {room.currentUsers}/{room.maxUsers}
                  </Typography>
                </Box>
              </Card>
            </Link>
          ))}
        </div>
        <div className="relative">
          <Link to={"/chatWithAI"}>
            {" "}
            <button className=" bg-cyan-700 text-white font-bold rounded p-8 relative ml-24  ">
              כניסה אל הצ'אט המקצועי
            </button>{" "}
            <div className="w-2 h-2 bg-red-800 absolute rounded-full right-28 top-0 animate-ping" />{" "}
          </Link>
        </div>
        <div className="p-5">
          <h1 className="text-center text-3xl mb-5 tracking-widest text-cyan-950">
            מה קורה היום
          </h1>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridDay"
            headerToolbar={false}
            events={[
              { title: " product preview card לבנות", date: "2024-12-19" },
              { title: " לבכות קצת", date: "2024-12-19" },
              { title: " לבכות קצת", date: "2024-12-19" },
            ]}
            dateClick={handleCalendarClick}
            dayCellDidMount={(info) => {
              // Add inline style for each day cell
              info.el.style.backgroundColor = "#f5f5f5"; // Light gray background
              info.el.style.color = "#333"; // Darker text color
            }}
          />
        </div>
      </div>

      <br />

      <h1 className="text-center text-3xl my-5 tracking-widest text-cyan-950">
        פורטל פורום
      </h1>
      <div className="flex flex-col gap-5 my-10 text-center relative ">
        {posts.map((post) => (
          <Link
            to={`/post/${post.id}`} // Dynamic link to the post page
            key={post.id} // Always provide a unique key for each mapped element
          >
            <div
              className="bg-[#ede8d0] rounded-lg h-24 overflow-hidden relative shadow-xl mb-4 "
              style={{ direction: "rtl" }}
            >
              <div>
                <h1 className="p-2 font-bold text-start underline underline-offset-4 text-cyan-900 ">
                  {post.title}{" "}
                </h1>
                <img
                  src={linkLogo}
                  alt=""
                  className="max-w-4 absolute left-2 top-2"
                />
              </div>
              <p className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-slate-500 to-transparent">
                {post.content}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
// }

export default HomePage;
