import React, { createContext, useState, ReactNode } from "react";

export interface FiltersContextProps {
  completedTasks: number;
  setCompletedTasks: React.Dispatch<React.SetStateAction<number>>;
  incompleteTasks: number;
  setIncompleteTasks: React.Dispatch<React.SetStateAction<number>>;
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

  return (
    <FiltersContext.Provider
      value={{
        completedTasks,
        setCompletedTasks,
        incompleteTasks,
        setIncompleteTasks,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
