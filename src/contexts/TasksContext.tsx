import {
  getTasksFromLocalStorage,
  initialTasksForLocalStorage,
} from "@/utils/localStorage";
import React, { createContext, useState, ReactNode, useEffect } from "react";

export interface Task {
  id: number;
  title: string;
  description: string;
  date?: string;
  time?: string;
  completed: boolean;
}

interface TasksContextProps {
  tasks: Task[];
  toggleCompleted: (id: number) => void;
  completedTasks: number;
  incompleteTasks: number;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);
const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [incompleteTasks, setIncompleteTasks] = useState(0);

  function toggleCompleted(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function countCompleteAndIncompleteTasks() {
    let completedCount = 0;
    let incompleteCount = 0;

    tasks.forEach((task) => {
      if (task.completed) {
        completedCount++;
      } else {
        incompleteCount++;
      }
    });

    setCompletedTasks(completedCount);
    setIncompleteTasks(incompleteCount);
  }

  useEffect(() => {
    setTasks(getTasksFromLocalStorage());
  }, []);

  console.log(tasks);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        toggleCompleted,
        completedTasks,
        incompleteTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
