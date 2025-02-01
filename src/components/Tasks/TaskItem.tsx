import React from "react";

import { Task } from "./TaskList";
import { FaCheck } from "react-icons/fa";

interface TodoItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  toggleCompleted: (id: number) => void;
}

const descriptionLength: number = 40;

function TaskItem({ task, deleteTask, toggleCompleted }: TodoItemProps) {
  return (
    <div className={`task-item-wrapper ${task.completed ? "completed" : ""}`}>
      <div className="main-wrapper">
        <div className="left">
          <div className="title">{task.title}</div>
          <div className="description">
            {task.description.slice(0, descriptionLength) +
              (task.description.length > descriptionLength ? "..." : "")}
          </div>
        </div>
        <div className="right">
          <div className={`radio-btn`} onClick={() => toggleCompleted(task.id)}>
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
