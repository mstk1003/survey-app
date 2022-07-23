import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "firebase.js";
import NotesIcon from "@mui/icons-material/Notes";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CustomDialog from "components/common/CustomDialog";
import { CONST } from "const";
import { Clear } from "@mui/icons-material";

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

  const [editedQuestion, setEditedQuestion] = useState({
    name: "",
    type: CONST.QUESTION_TYPE.SingleLine,
    options: [""],
  });

  const editQuestion = (prop) => {
    setEditedQuestion({ ...editedQuestion, prop });
  };

  const addQuestion = () => {
    const copiedQuestions = model.questions;
    copiedQuestions.push(editedQuestion);
    setModel({ ...model, questions: copiedQuestions });

    // 初期化する
    setEditedQuestion({
      name: "",
      type: CONST.QUESTION_TYPE.SingleLine,
      options: [""],
    });
  };

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
      {model.questions.map((question) => {
        return <div>{question.name}</div>;
      })}
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
        handleExecute={addQuestion}
      >
        <CreateQuestion
          editedQuestion={editedQuestion}
          editQuestion={editQuestion}
        ></CreateQuestion>
      </CustomDialog>
    </>
  );
}

function CreateQuestion({ editedQuestion, editQuestion }) {
  const question = editedQuestion;

  return (
    <>
      <div style={{ display: "flex" }}>
        <TextField
          sx={{ flex: "1" }}
          placeholder="質問内容"
          variant="filled"
          hiddenLabel
          size="small"
          onChange={(e) => {
            question.name = e.target.value;
            editQuestion({ name: question.name });
          }}
        ></TextField>
        <Select
          sx={{ width: "200px", marginLeft: "16px" }}
          placeholder="質問のタイプ"
          variant="standard"
          size="small"
          value={question.type}
          onChange={(e) => {
            question.type = e.target.value;
            editQuestion({ type: question.type });
          }}
        >
          {/* TODO typeをどこかで管理する */}
          <MenuItem value={CONST.QUESTION_TYPE.SingleLine}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <NotesIcon />
              <span style={{ marginLeft: "8px" }}>テキスト（１行）</span>
            </div>
          </MenuItem>
          <MenuItem value={CONST.QUESTION_TYPE.MultiLine}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SubjectIcon />
              <span style={{ marginLeft: "8px" }}>テキスト（複数行）</span>
            </div>
          </MenuItem>
          <MenuItem value={CONST.QUESTION_TYPE.SingleSelect}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioButtonCheckedIcon />
              <span style={{ marginLeft: "8px" }}>単一選択</span>
            </div>
          </MenuItem>
          <MenuItem value={CONST.QUESTION_TYPE.MultiSelect}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CheckBoxIcon />
              <span style={{ marginLeft: "8px" }}>複数選択</span>
            </div>
          </MenuItem>
        </Select>
      </div>
      <div style={{ marginTop: "16px" }}>
        {(question.type === CONST.QUESTION_TYPE.SingleSelect ||
          question.type === CONST.QUESTION_TYPE.MultiSelect) && (
          <div style={{ marginTop: "32px" }}>
            {question.options.map((item, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "16px",
                  }}
                >
                  {question.type === CONST.QUESTION_TYPE.SingleSelect && (
                    <RadioButtonCheckedIcon />
                  )}
                  {question.type === CONST.QUESTION_TYPE.MultiSelect && (
                    <CheckBoxIcon />
                  )}
                  <TextField
                    sx={{ width: "100%", marginLeft: "8px" }}
                    variant="filled"
                    hiddenLabel
                    value={item}
                    size="small"
                    onChange={(e) => {
                      question.options[idx] = e.target.value;
                      editQuestion({ options: question.options });
                    }}
                  ></TextField>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{ marginLeft: "8px" }}
                    disabled={question.options.length <= 1}
                    onClick={() => {
                      question.splice(idx, 1);
                      editQuestion({ options: question.options });
                    }}
                  >
                    <Clear />
                  </IconButton>
                </div>
              );
            })}
            <Button
              variant="outlined"
              sx={{ marginTop: "32px", marginLeft: "32px" }}
              onClick={(e) => {
                question.options.push("");
                editQuestion({ options: question.options });
              }}
            >
              選択肢を追加
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default SurveyCreate;
