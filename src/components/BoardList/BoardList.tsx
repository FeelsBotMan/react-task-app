import { FC, useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
  userInfo,
  userInfoImg,
} from "./BoardList.css";
import clsx from "clsx";
import SideForm from "./SIdeForm/SideForm";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "../../hooks/useAuth";
type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsFormOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isFormOpen) {
      inputRef.current?.focus();
    }
  }, [isFormOpen]);

  const { isAuth, handleSignIn, handleSignOut, photoURL } = useAuth();

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boardArray.map((board, index) => (
        <div
          key={board.boardId}
          onClick={() => setActiveBoardId(boardArray[index].boardId)}
          className={clsx(
            {
              [boardItemActive]:
                boardArray.findIndex(
                  (board) => board.boardId === activeBoardId
                ) === index,
            },
            {
              [boardItem]:
                boardArray.findIndex(
                  (board) => board.boardId === activeBoardId
                ) !== index,
            }
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle
            title="게시판 추가"
            className={addButton}
            onClick={handleClick}
          />
        )}

        {isAuth ? (
          <>
            <div className={userInfo}>
              <img
                src={photoURL || "/default-avatar.png"}
                alt="userProfile"
                className={userInfoImg}
              />
            </div>

            <GoSignOut
              title="로그아웃"
              className={addButton}
              onClick={handleSignOut}
            />
          </>
        ) : (
          <FiLogIn
            title="로그인"
            className={addButton}
            onClick={handleSignIn}
          />
        )}
      </div>
    </div>
  );
};
export default BoardList;
