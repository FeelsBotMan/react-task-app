import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { useState } from "react";
import {
  setModalActive,
  updateTask,
  deleteTask,
} from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import {
  input,
  wrapper,
  modalWindow,
  header,
  title,
  buttons,
  updateButton,
  deleteButton,
  closeButton,
} from "./EditModal.css";

const EditModal = () => {
  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector((state) => state.modal);
  const [data, setData] = useState(editingState);

  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, task: { ...data.task, taskName: e.target.value } });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: { ...data.task, taskDescription: e.target.value },
    });
  };

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, task: { ...data.task, taskOwner: e.target.value } });
  };

  const handleUpdateButton = () => {
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      })
    );
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `태스크 수정하기: ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };

  const handleDeleteButton = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.taskId,
      })
    );

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `태스크 삭제하기: ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editingState.task.taskName}</div>
          <FiX onClick={handleCloseButton} className={closeButton} />
        </div>
        <div className={title}>제목</div>
        <label htmlFor="taskName">태스크 제목</label>
        <input
          id="taskName"
          className={input}
          type="text"
          value={data.task.taskName}
          onChange={handleNameChange}
        />
        <div className={title}>설명</div>
        <label htmlFor="taskDescription">태스크 설명</label>
        <input
          id="taskDescription"
          className={input}
          type="text"
          value={data.task.taskDescription}
          onChange={handleDescriptionChange}
        />
        <div className={title}>생성한 사람</div>
        <label htmlFor="taskOwner">태스크 생성한 사람</label>
        <input
          id="taskOwner"
          className={input}
          type="text"
          value={data.task.taskOwner}
          onChange={handleOwnerChange}
        />
        <div className={buttons}>
          <button className={updateButton} onClick={handleUpdateButton}>
            태스크 수정하기
          </button>
          <button className={deleteButton} onClick={handleDeleteButton}>
            태스크 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditModal;
