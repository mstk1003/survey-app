import NotesIcon from "@mui/icons-material/Notes";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { CONST } from "const";
import { Clear } from "@mui/icons-material";

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

export default CreateQuestion;
