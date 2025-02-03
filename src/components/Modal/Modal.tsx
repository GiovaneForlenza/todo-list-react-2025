import { ModalContext, modalTypes } from "@/contexts/ModalContext";
import { addTaskToLocalStorage } from "@/utils/localStorage";
import React, { useContext, useState } from "react";
import { IoIosClose } from "react-icons/io";

function Modal() {
  const { closeModal } = useContext(ModalContext) || {
    closeModal: () => {},
  };

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  return (
    <div className="modal-background-wrapper" id="modal-wrapper">
      <div className="modal-background"></div>
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
          <div className="form-wrapper">
            <div className="form-line">
              <div className="title">Task Title</div>
              <div className="input">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Task title"
                  onChange={(e) => setTaskTitle(e.target.value)}
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
                />
              </div>
            </div>
          </div>
          <div
            className="primary-button"
            onClick={() =>
              addTaskToLocalStorage("tasks", {
                id: 7,
                title: taskDescription,
                description: taskDescription,
                completed: false,
                // date: "Today",
                // time: "10:00",
              })
            }
          >
            <button>+ Add task</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
