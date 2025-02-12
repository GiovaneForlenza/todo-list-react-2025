import { ModalContext } from "@/contexts/ModalContext";
import React, { useContext } from "react";
import { IoIosClose } from "react-icons/io";

interface AddTaskModalProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setTaskTitle: (title: string) => void;
  setTaskDescription: (description: string) => void;
}

function AddTaskModal({
  handleSubmit,
  setTaskTitle,
  setTaskDescription,
}: AddTaskModalProps) {
  const { closeModal } = useContext(ModalContext) || {
    closeModal: () => {},
  };
  return (
    <div className="modal-wrapper">
      <div className="header-wrapper">
        <div className="left">
          <div className="title">Add a new task</div>
          <div className="date-and-time">Today, Wednesday 30 Jan</div>
        </div>
        <div className="right">
          <div className="close" onClick={() => closeModal()}>
            <IoIosClose />
          </div>
        </div>
      </div>
      <div className="body-wrapper">
        <form className="form-wrapper" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-line">
            <div className="title">
              Task Title*
              <span className="modal-form-span required"> (required)</span>
            </div>
            <div className="input">
              <input
                type="text"
                name=""
                id=""
                placeholder="Task title"
                onChange={(e) => setTaskTitle(e.target.value)}
                required
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
                placeholder="Task title"
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
          </div>
          <button className="primary-button" type="submit">
            + Add task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
