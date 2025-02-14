import React, { useContext} from "react";
import TaskItem from "./TaskItem";
import { TasksContext } from "@/contexts/TasksContext";

function index() {
  const { toggleCompleted = () => {}, tasks } =
    useContext(TasksContext) || {};

  return (
    <div className="task-list-wrapper">
      {tasks && tasks.length !== 0 ? (
        tasks.map((task, id) => {
          return (
            <TaskItem key={id} task={task} toggleCompleted={toggleCompleted} />
          );
        })
      ) : (
        <div className="no-tasks-wrapper">
          <h1>You don't have any tasks</h1>
          <h2>To add a new task, click on the button above</h2>
        </div>
      )}
    </div>
  );
}

export default index;
