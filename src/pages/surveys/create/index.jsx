import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "firebase.js";
import { CONST } from "const";
import CreateQuestion from "components/survey/createQuetion";
import CustomDialog from "components/common/CustomDialog";

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
      {/* TODO 質問表示 */}
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

export default SurveyCreate;
