import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Surveys() {
  let navigate = useNavigate();
  return (
    <Box>
      アンケート一覧
      <Button onClick={() => navigate("/surveys/create")}>
        アンケート作成
      </Button>
    </Box>
  );
}

export default Surveys;
