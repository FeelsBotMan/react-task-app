import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { useState } from "react";
import {
  setModalActive,
  updateTask,
  deleteTask,
  addTask,
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
  visuallyHidden,
} from "./EditModal.css";

const EditModal = () => {
  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector((state) => state.modal);
  const [data, setData] = useState(
    editingState.task.taskId
      ? editingState
      : {
          ...editingState,
          task: {
            taskId: uuidv4(),
            taskName: "",
            taskDescription: "",
            taskOwner: "",
          },
        }
  );

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
    if (data.task.taskName === "") {
      alert("태스크 제목을 입력해주세요");
      return;
    }
    const changes = [];
    if (data.task.taskName !== editingState.task.taskName) {
      changes.push(
        `제목: ${editingState.task.taskName} → ${data.task.taskName}`
      );
    }
    if (data.task.taskDescription !== editingState.task.taskDescription) {
      changes.push(
        `설명: ${editingState.task.taskDescription} → ${data.task.taskDescription}`
      );
    }
    if (data.task.taskOwner !== editingState.task.taskOwner) {
      changes.push(
        `담당자: ${editingState.task.taskOwner} → ${data.task.taskOwner}`
      );
    }

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
        logMessage: `태스크 수정: ${changes.join(", ")}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };

  const handleDeleteButton = () => {
    const confirmDelete = window.confirm(
      "정말로 이 태스크를 삭제하시겠습니까?"
    );
    if (confirmDelete) {
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
          logMessage: `태스크 삭제: ${editingState.task.taskName}`,
          logAuthor: "User",
          logTimestamp: String(Date.now()),
        })
      );
      dispatch(setModalActive(false));
    }
  };

  const handleCreateButton = () => {
    if (data.task.taskName === "") {
      alert("태스크 제목을 입력해주세요");
      return;
    }
    dispatch(
      addTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      })
    );
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `새 태스크 생성: ${data.task.taskName}`,
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
          <div className={title}>
            {editingState.task.taskId ? "태스크 수정" : "새 태스크 생성"}
          </div>
          <FiX onClick={handleCloseButton} className={closeButton} />
        </div>
        <div className={title}>제목</div>
        <label htmlFor="taskName" className={visuallyHidden}>
          태스크 제목
        </label>
        <input
          id="taskName"
          className={input}
          type="text"
          value={data.task.taskName}
          placeholder="태스크 제목을 입력하세요"
          onChange={handleNameChange}
        />
        <div className={title}>설명</div>
        <label htmlFor="taskDescription" className={visuallyHidden}>
          태스크 설명
        </label>
        <input
          id="taskDescription"
          className={input}
          type="text"
          value={data.task.taskDescription}
          placeholder="태스크 설명을 입력하세요"
          onChange={handleDescriptionChange}
        />
        <div className={title}>담당자</div>
        <label htmlFor="taskOwner" className={visuallyHidden}>
          태스크 담당자
        </label>
        <input
          id="taskOwner"
          className={input}
          type="text"
          value={data.task.taskOwner}
          placeholder="태스크 담당자를 입력하세요"
          onChange={handleOwnerChange}
        />
        <div className={buttons}>
          {editingState.task.taskId ? (
            <>
              <button className={updateButton} onClick={handleUpdateButton}>
                태스크 수정하기
              </button>
              <button className={deleteButton} onClick={handleDeleteButton}>
                태스크 삭제하기
              </button>
            </>
          ) : (
            <button className={updateButton} onClick={handleCreateButton}>
              태스크 생성하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default EditModal;
