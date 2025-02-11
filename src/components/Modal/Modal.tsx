import { ModalContext, modalTypes } from "@/contexts/ModalContext";
import { TasksContext } from "@/contexts/TasksContext";
import { addTaskToLocalStorage, getLastUsedId } from "@/utils/localStorage";
import { useContext, useEffect, useId, useState } from "react";
import { IoIosClose } from "react-icons/io";
// v4();

function Modal() {
  const { closeModal, isModalOpen } = useContext(ModalContext) || {
    closeModal: () => {},
  };

  const { updateTaskList } = useContext(TasksContext) || {};

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  function resetModalText() {
    setTaskTitle("");
    setTaskDescription("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    addTaskToLocalStorage({
      id: getLastUsedId() + 1,
      title: taskTitle,
      description: taskDescription,
      completed: false,
      // date: "Today",
      // time: "10:00",
    });
    updateTaskList && updateTaskList();
    getLastUsedId();
    resetModalText();
    closeModal();
  }
  return (
    <>
      {isModalOpen && (
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
              <form className="form-wrapper" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-line">
                  <div className="title">
                    Task Title*
                    <span className="modal-form-span required">
                      {" "}
                      (required)
                    </span>
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
        </div>
      )}
    </>
  );
}

export default Modal;
