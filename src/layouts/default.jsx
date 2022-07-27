import { Box } from "@mui/system";
import CustomDrawer from "components/common/CustomDrawer";
import { useState } from "react";

const drawerMaxWidth = 270;
const drawerMinWidth = 50;

function DefaultLayout({ children }) {
  const width = () => {
    return `calc(100% - ${drawerWidth}px)`;
  };
  const [drawerWidth, setDrawerWidth] = useState(drawerMaxWidth);
  const [drawerOpened, setOpenDrawer] = useState(true);

  function openDrawer() {
    setOpenDrawer(true);
    setDrawerWidth(drawerMaxWidth);
    console.log("open");
  }

  function closeDrawer() {
    setOpenDrawer(false);
    setDrawerWidth(drawerMinWidth);
    console.log("close");
  }
  return (
    <>
      <CustomDrawer
        drawerWidth={drawerWidth}
        drawerOpened={drawerOpened}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      ></CustomDrawer>
      <Box
        sx={{
          width,
          marginLeft: "auto",
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ maxWidth: "1200px", marginX: "auto" }}>{children}</Box>
      </Box>
    </>
  );
}

export default DefaultLayout;
