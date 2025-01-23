import { GrSubtract } from "react-icons/gr";
import { IList, ITask } from "../../types";
import Task from "../Task/Task";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import {
  listWrapper,
  listName,
  listHeader,
  deleteButton,
  addTaskButton,
} from "./List.css";
import { Droppable } from "@hello-pangea/dnd";
import { IoIosAdd } from "react-icons/io";

type TListProps = {
  boardId: string;
  list: IList;
};

const List = ({ list, boardId }: TListProps) => {
  const dispatch = useTypedDispatch();
  const handleDeleteList = (listId: string) => {
    const confirmDelete = window.confirm(
      "정말로 이 리스트를 삭제하시겠습니까?"
    );
    if (confirmDelete) {
      dispatch(deleteList({ boardId, listId }));
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `리스트 삭제: ${list.listName}`,
          logAuthor: "user",
          logTimestamp: String(Date.now()),
        })
      );
    }
  };
  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  const handleAddTask = (boardId: string, listId: string) => {
    dispatch(
      setModalData({
        boardId,
        listId,
        task: {
          taskId: "",
          taskName: "",
          taskDescription: "",
          taskOwner: "",
        },
      })
    );
    dispatch(setModalActive(true));
  };

  return (
    <Droppable droppableId={list.listId}>
      {(provided) => (
        <div className={listWrapper}>
          <div className={listHeader}>
            <div className={listName}>{list.listName}</div>
            <GrSubtract
              title="리스트 삭제"
              className={deleteButton}
              onClick={() => handleDeleteList(list.listId)}
            />
          </div>

          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list.tasks.map((task, index) => (
              <div
                onClick={() => handleTaskChange(boardId, list.listId, task)}
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

            {provided.placeholder}

            <div
              className={addTaskButton}
              onClick={() => handleAddTask(boardId, list.listId)}
            >
              <IoIosAdd />
              <p>태스크 생성하기</p>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};
export default List;
