import React, { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { TasksContext } from "@/contexts/TasksContext";

function index() {
  const { toggleCompleted = (id: number) => {}, tasks } =
    useContext(TasksContext) || {};

  return (
    <div className="task-list-wrapper">
      {tasks ? (
        tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              toggleCompleted={toggleCompleted}
            />
          );
        })
      ) : (
        <h1>You don't have any tasks</h1>
      )}
    </div>
  );
}

export default index;
