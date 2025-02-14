import { getFilterCount, LOCAL_STORAGE_KEYS } from "@/utils/localStorage";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { TasksContext } from "./TasksContext";

export type FilterItemType = {
  id: number;
  text: "All" | "Incomplete" | "Completed";
  selected: boolean;
  numberOfTasks: number;
};
export interface FiltersContextProps {
  filters: FilterItemType[];
  setFilters: React.Dispatch<React.SetStateAction<FilterItemType[]>>;
  updateFiltersCounter: () => void;
}
export const FiltersContext = createContext<FiltersContextProps | null>(null);

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({
  children,
}) => {
  const tasksContext = useContext(TasksContext);
  if (!tasksContext) {
    throw new Error("TasksContext must be used within a TasksProvider");
  }
  const { tasks } = tasksContext;

  const [filters, setFilters] = useState<FilterItemType[]>([
    {
      id: 0,
      text: "All",
      selected: true,
      numberOfTasks: getFilterCount(LOCAL_STORAGE_KEYS.TOTAL_OF_TASKS),
    },
    {
      id: 1,
      text: "Incomplete",
      selected: false,
      numberOfTasks: getFilterCount(LOCAL_STORAGE_KEYS.INCOMPLETE_TASKS),
    },
    {
      id: 2,
      text: "Completed",
      selected: false,
      numberOfTasks: getFilterCount(LOCAL_STORAGE_KEYS.COMPLETED_TASKS),
    },
  ]);

  function updateFiltersCounter() {
    const updatedFilters = filters.map((filter) => {
      if (filter.id === 0) {
        return {
          ...filter,
          numberOfTasks: getFilterCount(LOCAL_STORAGE_KEYS.TOTAL_OF_TASKS),
        };
      } else if (filter.id === 1) {
        return {
          ...filter,
          numberOfTasks: getFilterCount(LOCAL_STORAGE_KEYS.INCOMPLETE_TASKS),
        };
      } else if (filter.id === 2) {
        return {
          ...filter,
          numberOfTasks: getFilterCount(LOCAL_STORAGE_KEYS.COMPLETED_TASKS),
        };
      } else {
        return filter;
      }
    });
    setFilters(updatedFilters);
  }

  
  useEffect(() => {
    updateFiltersCounter();
  }, [tasks]);

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        updateFiltersCounter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
