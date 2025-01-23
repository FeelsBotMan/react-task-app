import { useState } from "react";
import { FiX } from "react-icons/fi";
import { addList } from "../../../store/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";
import { useTypedDispatch } from "../../../hooks/redux";
import {
  listForm,
  buttons,
  input,
  button,
  closeButton,
} from "./DropDownForm.css";

type TDropDownFormProps = {
  boardId: string;
  listId: string;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list?: boolean;
};

const DropDownForm = ({ boardId, setIsFormOpen }: TDropDownFormProps) => {
  const dispatch = useTypedDispatch();
  const [text, setText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleButtonClick = () => {
    if (text.trim() === "") return;
    setIsFormOpen(false);

    dispatch(
      addList({
        boardId,
        list: { listId: uuidv4(), listName: text, tasks: [] },
      })
    );
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `리스트 생성: ${text}`,
        logAuthor: "user",
        logTimestamp: String(Date.now()),
      })
    );
  };

  return (
    <div className={listForm}>
      <textarea
        className={input}
        autoFocus
        value={text}
        onChange={handleTextChange}
        onBlur={() => setIsFormOpen(false)}
        placeholder="리스트의 제목을 입력하세요"
      />
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          리스트 추가하기
        </button>
        <FiX className={closeButton} onClick={() => setIsFormOpen(false)} />
      </div>
    </div>
  );
};

export default DropDownForm;
