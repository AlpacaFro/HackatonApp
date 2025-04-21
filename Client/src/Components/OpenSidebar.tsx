import { useState } from "react";
import { Link } from "react-router-dom";

import SOSButton from "./SOSButton";

// MUI Import
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ForumIcon from "@mui/icons-material/Forum";
import MenuIcon from "@mui/icons-material/Menu";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermDeviceInformationIcon from "@mui/icons-material/PermDeviceInformation";
import SosIcon from "@mui/icons-material/Sos";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReviewsIcon from "@mui/icons-material/Reviews";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Link to="/">
          <ListItem key="Home" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="דף הבית" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/rooms">
          <ListItem key="Rooms" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary="חדרים" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/forum">
          <ListItem key="Forum" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DynamicFeedIcon />
              </ListItemIcon>
              <ListItemText primary="פורום פתוח" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/ChatWithAI">
          <ListItem key="ChatWithAI" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ReviewsIcon />
              </ListItemIcon>
              <ListItemText primary="צאט מקצועי" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/calender">
          <ListItem key="Calender" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="יומן" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/info">
          <ListItem key="Info" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="מידע מקצועי" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/about-us">
          <ListItem key="AboutUs" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PermDeviceInformationIcon />
              </ListItemIcon>
              <ListItemText primary="קצת עלינו" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <SosIcon className="mx-5" />
      <SOSButton />
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
