import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function CustomDialog({
  isOpened,
  handleClose,
  title,
  children,
  handleExecute,
}) {
  return (
    <Dialog fullWidth open={isOpened}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button
          onClick={() => {
            handleExecute();
            handleClose();
          }}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
