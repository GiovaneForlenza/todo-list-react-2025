import {
  decreaseFilterCount,
  getTasksFromLocalStorage,
  increaseFilterCount,
  LOCAL_STORAGE_KEYS,
  updateTasksInLocalStorage,
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

export interface TasksContextProps {
  tasks: Task[];
  toggleCompleted: (id: number) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTaskList: () => void;
  lastUsedId: number;
  setLastUsedId: React.Dispatch<React.SetStateAction<number>>;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);
const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lastUsedId, setLastUsedId] = useState(0);

  function toggleCompleted(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        if (!task.completed) {
          increaseFilterCount(LOCAL_STORAGE_KEYS.COMPLETED_TASKS);
          decreaseFilterCount(LOCAL_STORAGE_KEYS.INCOMPLETE_TASKS);
        } else {
          increaseFilterCount(LOCAL_STORAGE_KEYS.INCOMPLETE_TASKS);
          decreaseFilterCount(LOCAL_STORAGE_KEYS.COMPLETED_TASKS);
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    updateTasksInLocalStorage(updatedTasks);
  }

  function updateTaskList() {
    setTasks(getTasksFromLocalStorage());
  }

  useEffect(() => {
    let tasksFromLocalStorage = getTasksFromLocalStorage();

    setTasks(tasksFromLocalStorage);
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        toggleCompleted,
        setTasks,
        updateTaskList,
        lastUsedId,
        setLastUsedId,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
