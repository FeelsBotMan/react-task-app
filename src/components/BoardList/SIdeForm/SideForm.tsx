import { ChangeEvent, FC, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { icon, input, form } from "./SideForm.css";
import { useTypedDispatch } from "../../../hooks/redux";
import { v4 as uuidv4 } from "uuid";
import { addBoard } from "../../../store/slices/boardsSlice";
import { addLog } from "../../../store/slices/loggerSlice";

type TSideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideForm: FC<TSideFormProps> = ({ setIsFormOpen }) => {
  const [inputText, setInputText] = useState("");
  const dispatch = useTypedDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleOnBlur = () => {
    setIsFormOpen(false);
  };

  const handleClick = () => {
    if (inputText.length > 0) {
      dispatch(
        addBoard({
          board: {
            boardId: uuidv4(),
            boardName: inputText,
            lists: [],
          },
        })
      );
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `게시판 생성: ${inputText}`,
          logAuthor: "user",
          logTimestamp: String(Date.now()),
        })
      );
    }
  };
  return (
    <div className={form}>
      <input
        className={input}
        autoFocus
        type="text"
        placeholder="게시판 이름 입력"
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  );
};
export default SideForm;
