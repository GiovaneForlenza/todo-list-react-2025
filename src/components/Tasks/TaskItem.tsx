import { ModalContext, modalTypes } from "@/contexts/ModalContext";
import { Task } from "@/contexts/TasksContext";
import React, { useContext } from "react";

import { FaCheck } from "react-icons/fa";

interface TodoItemProps {
  task: Task;
  toggleCompleted: (id: number) => void;
}

const descriptionLength: number = 40;

function TaskItem({ task, toggleCompleted }: TodoItemProps) {
  const { openModal, setTaskInfo } = useContext(ModalContext) || {
    openModal: (type: modalTypes) => {},
    setTaskInfo: (task: Task) => {},
  };
  return (
    <div
      className={`task-item-wrapper ${task.completed ? "completed" : ""}`}
      onClick={() => {
        openModal("edit");
        setTaskInfo(task);
      }}
    >
      <div className="main-wrapper">
        <div className="left">
          <div className="title">{task.title}</div>
          {task.description && (
            <div className="description">
              {task.description &&
                task.description.slice(0, descriptionLength) +
                  (task.description.length > descriptionLength ? "..." : "")}
            </div>
          )}
        </div>
        <div className="right">
          <div
            className={`radio-btn`}
            onClick={(e) => {
              toggleCompleted(task.id);
              e.stopPropagation();
            }}
          >
            {task.completed ? <FaCheck /> : ""}
          </div>
        </div>
      </div>
      {task.date !== undefined ? (
        <>
          <div className="divider"></div>
          <div className="date-time-wrapper">
            <div className="date">{task.date}</div>
            <div className="time">{task.time}</div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default TaskItem;
