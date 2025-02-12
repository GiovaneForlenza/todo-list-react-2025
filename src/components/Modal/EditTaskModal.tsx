import { ModalContext } from "@/contexts/ModalContext";
import React, { useContext, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

interface EditTaskModalProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, taskId: number) => void;
  handleClickDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    taskId: number
  ) => void;
  setTaskTitle: (title: string) => void;
  setTaskDescription: (description: string) => void;
  taskTitle: string;
  taskDescription: string;
  setConfirmDeletedSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditTaskModal({
  handleSubmit,
  handleClickDelete,
  setTaskTitle,
  setTaskDescription,
  taskTitle,
  taskDescription,
  setConfirmDeletedSelected,
}: EditTaskModalProps) {
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
          <div className="title">Edit task</div>
          <div className="date-and-time">Today, Wednesday 30 Jan</div>
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
        <form
          className="form-wrapper"
          onSubmit={(e) => handleSubmit(e, taskInfo.id || 0)}
        >
          <div className="form-line">
            <div className="title">
              Task Title
              <span className="modal-form-span required">* (required)</span>
            </div>
            <div className="input">
              <input
                type="text"
                name=""
                id=""
                placeholder="Task title"
                onChange={(e) => setTaskTitle(e.target.value)}
                required
                value={taskTitle}
              />
            </div>
          </div>
          <div className="form-line">
            <div className="title">
              Task description
              <span className="modal-form-span"> (optional)</span>
            </div>
            <div className="input">
              <textarea
                name=""
                id=""
                placeholder="Task description"
                onChange={(e) => setTaskDescription(e.target.value)}
                value={taskDescription}
              />
            </div>
          </div>
          <button className="primary-button" type="submit">
            Save task
          </button>
          <button
            className="delete-button-outlined"
            onClick={() => setConfirmDeletedSelected(true)}
            type="button"
          >
            Delete task
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
