import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function SignUpCard() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Card variant="outlined" sx={{ width: "800px", height: "450px" }}>
        <CardHeader title="サインアップ" />
        <CardContent sx={{ marginX: "auto", width: "80%" }}>
          {/* <div style={{ display: "flex" }}>
            <TextField
              required
              id="outlined-required"
              label="姓"
              sx={{ flex: "1" }}
            />
            <TextField
              required
              id="outlined-required"
              label="名"
              sx={{ marginLeft: "16px", flex: "1" }}
            />
          </div>
          <div style={{ display: "flex", marginTop: "16px" }}>
            <TextField
              required
              id="outlined-required"
              label="セイ"
              sx={{ flex: "1" }}
            />
            <TextField
              required
              id="outlined-required"
              label="メイ"
              sx={{ marginLeft: "16px", flex: "1" }}
            />
          </div> */}
          <div>
            <TextField
              required
              id="outlined-required"
              label="メールアドレス"
              sx={{ marginTop: "16px", width: "100%" }}
            />
          </div>
          <div>
            <FormControl
              sx={{ marginTop: "24px", width: "100%" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div>
            <Button variant="contained" fullWidth sx={{ marginTop: "40px" }}>
              登録
            </Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignUpCard;
