import {
  getTasksFromLocalStorage,
  initialTasksForLocalStorage,
} from "@/utils/localStorage";
import { log } from "console";
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
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTaskList: () => void;
  lastUsedId: number;
  setLastUsedId: React.Dispatch<React.SetStateAction<number>>;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);
const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [incompleteTasks, setIncompleteTasks] = useState(0);
  const [lastUsedId, setLastUsedId] = useState(0);

  function toggleCompleted(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function updateTaskList() {
    setTasks(getTasksFromLocalStorage());
  }

  useEffect(() => {
    let tasksFromLocalStorage = getTasksFromLocalStorage();

    setTasks(tasksFromLocalStorage);
    // if (tasksFromLocalStorage) {
    // } else {
    //   setTasks([]);
    // }
  }, []);
  console.log(tasks[0]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        toggleCompleted,
        setTasks,
        incompleteTasks,
        updateTaskList,
        completedTasks,
        lastUsedId,
        setLastUsedId,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
