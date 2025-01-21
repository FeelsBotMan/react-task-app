import { GrSubtract } from "react-icons/gr";
import { IList, ITask } from "../../types";
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { setModalActive } from "../../store/slices/boardsSlice";
import { listWrapper, listName, listHeader, deleteButton } from "./List.css";

type TListProps = {
  boardId: string;
  list: IList;
};

const List = ({ list, boardId }: TListProps) => {
  const dispatch = useTypedDispatch();
  const handleDeleteList = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `리스트 삭제하기: ${list.listName}`,
        logAuthor: "user",
        logTimestamp: String(Date.now()),
      })
    );
  };
  const handleTaskChange = (
    boardId: string,
    listId: string,
    taskId: string,
    task: ITask
  ) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };
  return (
    <div className={listWrapper}>
      <div className={listHeader}>
        <div className={listName}>{list.listName}</div>
        <GrSubtract
          className={deleteButton}
          onClick={() => handleDeleteList(list.listId)}
        />
      </div>

      {list.tasks.map((task, index) => (
        <div
          onClick={() =>
            handleTaskChange(boardId, list.listId, task.taskId, task)
          }
          key={task.taskId}
        >
          <Task
            taskName={task.taskName}
            taskDescription={task.taskDescription}
            boardId={boardId}
            id={task.taskId}
            index={index}
          />
        </div>
      ))}
      <ActionButton boardId={boardId} listId={list.listId} />
    </div>
  );
};
export default List;
