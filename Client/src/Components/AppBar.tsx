// MUI Import
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TemporaryDrawer from "./OpenSidebar";

import { useLocation, useParams } from "react-router-dom";

import logo from "../infoImage/logo-no-text.png";

export default function MenuAppBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { id } = useParams();
  const pageTitle = getTitleFromPath(currentPath, id);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage: "linear-gradient(to right, #0E7490, #155E75)",
          color: "white",
        }}
      >
        <Toolbar>
          <TemporaryDrawer />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          <img className="h-10" src={logo} alt="app-logo" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function getTitleFromPath(path: string, id: string | undefined) {
  switch (path) {
    case "/":
      return "ברוך הבא!";
    case "/calender":
      return "יומן פעילויות";
    case "/rooms":
      return "חדרים";
    case `/rooms/${id}`:
      return "חדר -צ׳אט";
    case "/forum":
      return "פורום שיתוף";
    case "/info":
      return "מידע מקצועי";
    case "/about-us":
      return "קצת עלינו";
    case "/home":
      return "עמוד בית";
    default:
      return "";
  }
}
