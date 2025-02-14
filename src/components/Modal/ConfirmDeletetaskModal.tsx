import { ModalContext } from "@/contexts/ModalContext";
import React, { useContext, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

interface ConfirmDeleteTaskModalProps {
  handleClickDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    taskId: number
  ) => void;
  setTaskTitle: (title: string) => void;
  setTaskDescription: (description: string) => void;
  taskTitle: string;
  // taskDescription: string;
  setConfirmDeletedSelected: (selected: boolean) => void;
  confirmDeleteSelected: boolean;
  updateTaskListAndCloseModal: () => void;
}

function ConfirmDeleteTaskModal({
  handleClickDelete,
  setTaskTitle,
  setTaskDescription,
  taskTitle,
  // taskDescription,
  setConfirmDeletedSelected,
  updateTaskListAndCloseModal,
}: // confirmDeleteSelected,
ConfirmDeleteTaskModalProps) {
  const { closeModal, taskInfo } = useContext(ModalContext) || {
    closeModal: () => {},
    taskInfo: { title: "", description: "" },
  };

  useEffect(() => {
    setTaskTitle(taskInfo.title);
    setTaskDescription(taskInfo.description);
  }, []);

  return (
    <div className="modal-wrapper">
      <div className="header-wrapper">
        <div className="left">
          <div className="title">Delete task</div>
          <p className="confirm-delete-text">
            Are you sure you want to delete the task {taskTitle}?
          </p>
          <div className="date-and-time">This action cannot be undone</div>
        </div>
        <div className="right">
          <div
            className="close"
            onClick={() => {
              closeModal();
              setConfirmDeletedSelected(false);
            }}
          >
            <IoIosClose />
          </div>
        </div>
      </div>
      <div className="body-wrapper">
        <form className="form-wrapper" onSubmit={(e) => e.preventDefault()}>
          {/* <div className="form-line">
            <div className="title">Task Title</div>
            <div className="input">
              <input
                type="text"
                name=""
                id=""
                placeholder="Task title"
                onChange={(e) => setTaskTitle(e.target.value)}
                required
                value={taskTitle}
                disabled={confirmDeleteSelected}
              />
            </div>
          </div>
          <div className="form-line">
            <div className="title">Task description</div>
            <div className="input">
              <textarea
                name=""
                id=""
                placeholder="Task title"
                onChange={(e) => setTaskDescription(e.target.value)}
                value={taskDescription}
                disabled={confirmDeleteSelected}
              />
            </div>
          </div> */}
          <button
            className="delete-button-filled"
            onClick={(e) => handleClickDelete(e, taskInfo.id || 0)}
            type="button"
          >
            Delete task
          </button>
          <button
            className="outlined-button"
            type="button"
            onClick={updateTaskListAndCloseModal}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmDeleteTaskModal;
