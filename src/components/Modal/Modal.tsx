import { useContext, useState } from "react";

import { ModalContext } from "@/contexts/ModalContext";
import { Task, TasksContext } from "@/contexts/TasksContext";
import {
  addTaskToLocalStorage,
  decreaseFilterCount,
  getLastUsedId,
  getTasksFromLocalStorage,
  LOCAL_STORAGE_KEYS,
  updateTasksInLocalStorage,
} from "@/utils/localStorage";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import ConfirmDeleteTaskModal from "./ConfirmDeletetaskModal";
import { FiltersContext } from "@/contexts/FiltersContext";
// v4();

function Modal() {
  const { closeModal, isModalOpen, modalType } = useContext(ModalContext) || {
    closeModal: () => {},
  };

  const { updateTaskList } = useContext(TasksContext) || {};
  const { updateFiltersCounter } = useContext(FiltersContext) || {
    updateFiltersCounter: () => {},
  };

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [confirmDeleteSelected, setConfirmDeleteSelected] = useState(false);

  function resetModalText() {
    setTaskTitle("");
    setTaskDescription("");
  }

  function handleSubmitAdd(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    addTaskToLocalStorage({
      id: getLastUsedId() + 1,
      title: taskTitle,
      description: taskDescription,
      completed: false,
      // date: "Today",
      // time: "10:00",
    });
    updateTaskListAndCloseModal();
  }
  function handleSubmitEdit(
    e: React.FormEvent<HTMLFormElement>,
    taskId: number
  ): void {
    e.preventDefault();
    let tasksInLocalStorage = getTasksFromLocalStorage();
    const updatedTasks = tasksInLocalStorage.map((task: Task) => {
      if (task.id === taskId) {
        return { ...task, title: taskTitle, description: taskDescription };
      } else {
        return task;
      }
    });
    updateTasksInLocalStorage(updatedTasks);
    updateTaskListAndCloseModal();
  }
  function handleClickDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    taskId: number
  ): void {
    e.preventDefault();
    const tasksInLocalStorage = getTasksFromLocalStorage();
    const updatedTasks = tasksInLocalStorage.filter(
      (task: Task) => task.id !== taskId
    );
    tasksInLocalStorage.map((task: Task) => {
      if (task.id === taskId) {
        if (task.completed) {
          decreaseFilterCount(LOCAL_STORAGE_KEYS.COMPLETED_TASKS);
        } else {
          decreaseFilterCount(LOCAL_STORAGE_KEYS.INCOMPLETE_TASKS);
        }
      }
    });
    decreaseFilterCount(LOCAL_STORAGE_KEYS.TOTAL_OF_TASKS);
    updateTasksInLocalStorage(updatedTasks);
    updateTaskListAndCloseModal();
  }

  function updateTaskListAndCloseModal() {
    updateTaskList && updateTaskList();
    setConfirmDeleteSelected(false);
    getLastUsedId();
    resetModalText();
    closeModal();
    updateFiltersCounter();
  }
  return (
    <>
      {isModalOpen && (
        <div className="modal-background-wrapper" id="modal-wrapper">
          <div className="modal-background"></div>
          {modalType === "add" ? (
            <AddTaskModal
              handleSubmit={handleSubmitAdd}
              setTaskTitle={setTaskTitle}
              setTaskDescription={setTaskDescription}
              updateTaskListAndCloseModal={updateTaskListAndCloseModal}
            />
          ) : !confirmDeleteSelected ? (
            <EditTaskModal
              handleSubmit={handleSubmitEdit}
              handleClickDelete={handleClickDelete}
              setTaskTitle={setTaskTitle}
              setTaskDescription={setTaskDescription}
              taskTitle={taskTitle}
              taskDescription={taskDescription}
              setConfirmDeletedSelected={setConfirmDeleteSelected}
            />
          ) : (
            <ConfirmDeleteTaskModal
              handleClickDelete={handleClickDelete}
              setTaskTitle={setTaskTitle}
              setTaskDescription={setTaskDescription}
              taskTitle={taskTitle}
              // taskDescription={taskDescription}
              confirmDeleteSelected={confirmDeleteSelected}
              setConfirmDeletedSelected={setConfirmDeleteSelected}
              updateTaskListAndCloseModal={updateTaskListAndCloseModal}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Modal;
