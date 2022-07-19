import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

function CustomDialog({ isOpened, handleClose, title, children }) {
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      // fullScreen={fullScreen}
      // sx={{ width: "800px" }}
      fullWidth
      open={isOpened}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={handleClose}>保存</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
