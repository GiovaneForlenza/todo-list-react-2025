"use client";

import React, { useContext, useEffect, useState } from "react";
import FilterItem from "./FilterItem";
import { FiltersContext, FiltersContextProps } from "@/contexts/FiltersContext";
import { TasksContext } from "@/contexts/TasksContext";
import { LOCAL_STORAGE_KEYS, getFilterCount } from "@/utils/localStorage";

export type FilterItemType = {
  id: number;
  text: "All" | "Incomplete" | "Completed";
  selected: boolean;
  numberOfTasks: number;
};

function FilterList() {
  const tasksContext = useContext(TasksContext);

  if (!tasksContext) {
    return null; // or handle the error appropriately
  }
  const { tasks } = tasksContext;

  let completedTasksCount = getFilterCount(LOCAL_STORAGE_KEYS.COMPLETED_TASKS);
  let incompleteTasksCount = getFilterCount(
    LOCAL_STORAGE_KEYS.INCOMPLETE_TASKS
  );
  let totalOfTasksCount = getFilterCount(LOCAL_STORAGE_KEYS.TOTAL_OF_TASKS);

  function updateFiltersCount() {
    completedTasksCount = getFilterCount(LOCAL_STORAGE_KEYS.COMPLETED_TASKS);
    incompleteTasksCount = getFilterCount(LOCAL_STORAGE_KEYS.INCOMPLETE_TASKS);
    const updatedFilters = filters.map((filter) => {
      if (filter.id === 1) {
        return {
          ...filter,
          numberOfTasks: getFilterCount(LOCAL_STORAGE_KEYS.TOTAL_OF_TASKS),
        };
      } else if (filter.id === 2) {
        return {
          ...filter,
          numberOfTasks: getFilterCount(LOCAL_STORAGE_KEYS.INCOMPLETE_TASKS),
        };
      } else if (filter.id === 3) {
        return {
          ...filter,
          numberOfTasks: getFilterCount(LOCAL_STORAGE_KEYS.COMPLETED_TASKS),
        };
      }
      return filter;
    });
    setFilters(updatedFilters);
  }

  useEffect(() => {
    updateFiltersCount();
  }, [tasks]);

  const [filters, setFilters] = useState<FilterItemType[]>([
    {
      id: 1,
      text: "All",
      selected: true,
      numberOfTasks: totalOfTasksCount,
    },
    {
      id: 2,
      text: "Incomplete",
      selected: false,
      numberOfTasks: incompleteTasksCount,
    },
    {
      id: 3,
      text: "Completed",
      selected: false,
      numberOfTasks: completedTasksCount,
    },
  ]);
  function handleClick(itemId: number) {
    const updatedFilters = filters.map((filter) => {
      if (filter.id === itemId) {
        return { ...filter, selected: true };
      }
      return { ...filter, selected: false };
    });
    setFilters(updatedFilters);
  }
  return (
    <div className="filter-list-wrapper">
      {filters.map((filter) => (
        <FilterItem key={filter.id} item={filter} handleClick={handleClick} />
      ))}
    </div>
  );
}

export default FilterList;
