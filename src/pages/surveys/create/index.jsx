import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../plugins/firebase";
import NotesIcon from "@mui/icons-material/Notes";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CustomDialog from "../../../components/common/CustomDialog";

function SurveyCreate() {
  let navigate = useNavigate();

  const [model, setModel] = useState({
    title: "",
    description: "",
    category_id: 0,
    questions: [],
    start_date: "",
    expired_date: "",
    questioner_id: "",
  });

  const [isOpenedDialog, setIsOpenedDialog] = useState(false);

  const openDialog = () => {
    setIsOpenedDialog(true);
  };

  const closeDialog = () => {
    setIsOpenedDialog(false);
  };

  const createSurvey = async () => {
    try {
      await addDoc(collection(db, "surveys"), {
        title: model.title,
        description: model.description,
      });
      navigate("/surveys");
    } catch (error) {
      // TODO エラーハンドリング
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ fontSize: "24px", textAlign: "left", marginBottom: "40px" }}>
        アンケート作成
      </Box>
      <Select
        variant="standard"
        sx={{ width: "100%" }}
        onChange={(e) => setModel({ ...model, category_id: e.target.value })}
      >
        {/* TODO カテゴリーマスタをどこかで管理する */}
        <MenuItem value={1}>政治</MenuItem>
        <MenuItem value={2}>経済</MenuItem>
        <MenuItem value={3}>家計</MenuItem>
      </Select>
      <TextField
        placeholder="アンケートタイトルを入力してください"
        variant="filled"
        hiddenLabel
        fullWidth
        sx={{ marginTop: "32px" }}
        onChange={(e) => setModel({ ...model, title: e.target.value })}
      />
      <TextField
        placeholder="アンケートについての説明を入力してください"
        variant="filled"
        hiddenLabel
        fullWidth
        multiline
        rows={4}
        sx={{ marginTop: "32px" }}
        onChange={(e) => setModel({ ...model, description: e.target.value })}
      />
      <div style={{ marginTop: "32px" }}>
        <CreateQuestion></CreateQuestion>
      </div>
      <Button
        sx={{ width: "180px", marginTop: "16px" }}
        variant="outlined"
        onClick={() => openDialog()}
      >
        質問を追加
      </Button>
      <Box sx={{ marginTop: "60px" }}>
        <Button
          sx={{ width: "100px", marginRight: "8px" }}
          onClick={() => navigate("/surveys")}
        >
          キャンセル
        </Button>
        <Button
          sx={{ width: "100px" }}
          variant="contained"
          onClick={() => createSurvey()}
        >
          保存
        </Button>
      </Box>
      <CustomDialog
        title="質問を追加する"
        isOpened={isOpenedDialog}
        handleClose={closeDialog}
      ></CustomDialog>
    </>
  );
}

function CreateQuestion({ addQuestion }) {
  const [question, setQuestion] = useState({
    name: "",
    type: 0,
    options: [],
  });
  return (
    <>
      <div style={{ display: "flex" }}>
        <TextField
          sx={{ flex: "1" }}
          variant="filled"
          hiddenLabel
          onChange={(e) => setQuestion({ ...question, name: e.target.value })}
        ></TextField>
        <Select
          sx={{ width: "300px", marginLeft: "16px" }}
          variant="standard"
          onChange={(e) => setQuestion({ ...question, type: e.target.value })}
        >
          {/* TODO typeをどこかで管理する */}
          <MenuItem value={1}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <NotesIcon />
              <span style={{ marginLeft: "8px" }}>テキスト（１行）</span>
            </div>
          </MenuItem>
          <MenuItem value={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SubjectIcon />
              <span style={{ marginLeft: "8px" }}>テキスト（複数行）</span>
            </div>
          </MenuItem>
          <MenuItem value={3}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioButtonCheckedIcon />
              <span style={{ marginLeft: "8px" }}>単一選択</span>
            </div>
          </MenuItem>
          <MenuItem value={4}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CheckBoxIcon />
              <span style={{ marginLeft: "8px" }}>複数選択</span>
            </div>
          </MenuItem>
        </Select>
      </div>
      <div style={{ marginTop: "16px" }}>
        {question.type === 1 && (
          <TextField
            sx={{ width: "100%" }}
            variant="filled"
            hiddenLabel
            onChange={(e) => setQuestion({ ...question, name: e.target.value })}
          ></TextField>
        )}
        {question.type === 2 && (
          <TextField
            sx={{ width: "100%" }}
            variant="filled"
            hiddenLabel
            multiline
            rows={3}
            onChange={(e) => setQuestion({ ...question, name: e.target.value })}
          ></TextField>
        )}
      </div>
    </>
  );
}

export default SurveyCreate;
