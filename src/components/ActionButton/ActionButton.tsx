import { useState, FC } from "react";
import DropDownForm from "./DropDownForm/DropDownForm";
import { IoIosAdd } from "react-icons/io";
import { listButton } from "./ActionButton.css";

type TActionButtonProps = {
  boardId: string;
  listId: string;
  list?: boolean;
};

const ActionButton: FC<TActionButtonProps> = ({ boardId, listId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return isFormOpen ? (
    <DropDownForm
      setIsFormOpen={setIsFormOpen}
      boardId={boardId}
      listId={listId}
    />
  ) : (
    <div onClick={() => setIsFormOpen(true)} className={listButton}>
      <IoIosAdd />
      <p>리스트 생성하기</p>
    </div>
  );
};

export default ActionButton;
