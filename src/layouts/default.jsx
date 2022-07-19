import { Box } from "@mui/system";

function DefaultLayout({ drawerWidth, children }) {
  const width = () => {
    return `calc(100% - ${drawerWidth}px)`;
  };
  return (
    <Box
      sx={{
        width,
        // maxWidth: "1200px",
        // marginX: "auto",
        marginLeft: "auto",
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ maxWidth: "1200px", marginX: "auto" }}>{children}</Box>
    </Box>
  );
}

export default DefaultLayout;
