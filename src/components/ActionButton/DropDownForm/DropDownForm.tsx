import { useState } from "react";
import { FiX } from "react-icons/fi";
import { addList, addTask } from "../../../store/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";
import { useTypedDispatch } from "../../../hooks/redux";
import {
  taskForm,
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

const DropDownForm = ({
  boardId,
  list,
  listId,
  setIsFormOpen,
}: TDropDownFormProps) => {
  const dispatch = useTypedDispatch();
  const [text, setText] = useState("");
  const formPlaceholder = list
    ? "리스트의 제목을 입력하세요"
    : "태스크 이름을 입력하세요";
  const buttonTitle = list ? "리스트 추가하기" : "태스크 추가하기";
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleButtonClick = () => {
    if (text.trim() === "") return;
    setIsFormOpen(false);
    if (list) {
      dispatch(
        addList({
          boardId,
          list: { listId: uuidv4(), listName: text, tasks: [] },
        })
      );
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `리스트 생성하기: ${text}`,
          logAuthor: "user",
          logTimestamp: String(Date.now()),
        })
      );
    } else {
      dispatch(
        addTask({
          boardId,
          listId,
          task: {
            taskId: uuidv4(),
            taskName: text,
            taskDescription: "",
            taskOwner: "user",
          },
        })
      );
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `태스크 생성하기: ${text}`,
          logAuthor: "user",
          logTimestamp: String(Date.now()),
        })
      );
    }
  };

  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        className={input}
        autoFocus
        value={text}
        onChange={handleTextChange}
        onBlur={() => setIsFormOpen(false)}
        placeholder={formPlaceholder}
      />
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          {buttonTitle}
        </button>
        <FiX className={closeButton} onClick={() => setIsFormOpen(false)} />
      </div>
    </div>
  );
};

export default DropDownForm;
