import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { TasksContext } from "./TasksContext"; // Import TaskContext

export interface FiltersContextProps {
  completedTasks: number;
  setCompletedTasks: React.Dispatch<React.SetStateAction<number>>;
  incompleteTasks: number;
  setIncompleteTasks: React.Dispatch<React.SetStateAction<number>>;
  totalOfTasks: number;
  setTotalOfTasks: React.Dispatch<React.SetStateAction<number>>;
}

export const FiltersContext = createContext<FiltersContextProps | null>(null);

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({
  children,
}) => {
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [incompleteTasks, setIncompleteTasks] = useState<number>(0);
  const [totalOfTasks, setTotalOfTasks] = useState<number>(0);

  const { tasks } = useContext(TasksContext) || {};

  useEffect(() => {
    resetFilters();
    countTasks();
  }, [tasks]);
  function resetFilters() {
    setCompletedTasks(0);
    setIncompleteTasks(0);
    setTotalOfTasks(0);
  }
  function countTasks() {
    if (tasks) {
      // console.log(tasks);
      tasks.map((task) => {
        console.log(task.completed);

        if (task.completed) {
          setCompletedTasks(completedTasks + 1);
        } else {
          setIncompleteTasks(incompleteTasks + 1);
        }
        setTotalOfTasks(totalOfTasks + 1);
      });
    }
    console.log(completedTasks, incompleteTasks, totalOfTasks);
  }

  return (
    <FiltersContext.Provider
      value={{
        completedTasks,
        setCompletedTasks,
        incompleteTasks,
        setIncompleteTasks,
        totalOfTasks,
        setTotalOfTasks,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
