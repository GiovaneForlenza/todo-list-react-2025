"use client";

import React, { useContext, useState } from "react";
import FilterItem from "./FilterItem";
import { FiltersContext, FiltersContextProps } from "@/contexts/FiltersContext";
import { TasksContext } from "@/contexts/TasksContext";

export type FilterItemType = {
  id: number;
  text: "All" | "Incomplete" | "Completed";
  selected: boolean;
  numberOfTasks: number;
};

// const filters: FilterItemType[] = [
//   { id: 1, text: "All", selected: true, numberOfTasks: 20 },
//   { id: 2, text: "Incomplete", selected: false, numberOfTasks: 10 },
//   { id: 3, text: "Completed", selected: false, numberOfTasks: 10 },
// ];

function FilterList() {
  // const filtersContext = useContext(FiltersContext);
  // if (!filtersContext) {
  //   return null; // or handle the error appropriately
  // }

  const tasksContext = useContext(TasksContext);
  if (!tasksContext) {
    return null; // or handle the error appropriately
  }
  const { completedTasks, incompleteTasks } = tasksContext;
  const [filters, setFilters] = useState<FilterItemType[]>([
    {
      id: 1,
      text: "All",
      selected: true,
      numberOfTasks: completedTasks + incompleteTasks,
    },
    {
      id: 2,
      text: "Incomplete",
      selected: false,
      numberOfTasks: incompleteTasks,
    },
    {
      id: 3,
      text: "Completed",
      selected: false,
      numberOfTasks: completedTasks,
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
