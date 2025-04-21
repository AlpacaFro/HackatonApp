import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Calender from "./Pages/Calender";
import MenuAppBar from "./Components/AppBar";
import HomePage from "./Pages/HomePage";
import Forum from "./Pages/Forum";
import AboutUs from "./Pages/AboutUs";
import Info from "./Pages/Info";
import RoomsPage from "./Pages/RoomPage";
import ChatPage from "./Pages/ChatPage";
import PostPage from "./Pages/PostPage";
import ChatWithAI from "./Pages/ChatWithAI";

function App() {
  return (
    <>
      <BrowserRouter>
        <MenuAppBar />
        <Routes>

        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<ChatPage />} />

          <Route path="/" element={<LandingPage />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<ChatPage />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/info" element={<Info />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/ChatWithAI" element={<ChatWithAI />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
