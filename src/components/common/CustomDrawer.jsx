import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import React from "react";
import { Box } from "@mui/system";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

function DrawerList({ width, isOpen, openFunc, closeFunc }) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (_event, index) => {
    setSelectedIndex(index);
  };

  let navigate = useNavigate();

  return (
    <Box sx={{ width: width }}>
      <List>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText
            primary="アンケートフォーム一覧"
            onClick={() => navigate("/surveys")}
          ></ListItemText>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText
            primary="アンケート分析"
            onClick={() => navigate("/analysis")}
          ></ListItemText>
        </ListItemButton>
        {isOpen ? (
          <ListItemButton onClick={() => closeFunc()} sx={{ ml: "auto" }}>
            <Box sx={{ ml: "auto" }}></Box>
            <ListItemIcon sx={{ justifyContent: "end" }}>
              <ChevronLeftIcon />
            </ListItemIcon>
          </ListItemButton>
        ) : (
          <ListItemButton onClick={() => openFunc()}>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItemButton>
        )}
      </List>
    </Box>
  );
}

function CustomDrawer({ drawerWidth, drawerOpened, openDrawer, closeDrawer }) {
  return (
    <Box>
      <Drawer
        variant="permanent"
        open={drawerOpened}
        onClose={closeDrawer}
        sx={{ whiteSpace: "nowrap" }}
      >
        <DrawerList
          width={drawerWidth}
          isOpen={drawerOpened}
          openFunc={openDrawer}
          closeFunc={closeDrawer}
        ></DrawerList>
      </Drawer>
    </Box>
  );
}

export default CustomDrawer;
