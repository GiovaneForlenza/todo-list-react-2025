import React, { useContext } from "react";
import { FilterItemType } from "@/contexts/FiltersContext";

interface FilterItemProps {
  item: FilterItemType;
}
import { FiltersContext } from "@/contexts/FiltersContext";
import { TasksContext } from "@/contexts/TasksContext";

function FilterItem({ item }: FilterItemProps) {
  const filtersContext = useContext(FiltersContext);
  if (!filtersContext) {
    return null; // or handle the null case appropriately
  }
  const { filters, setFilters } = filtersContext;

  const tasksContext = useContext(TasksContext);
  if (!tasksContext) {
    return null; // or handle the null case appropriately
  }
  const { updateDisplayedTaskList } = tasksContext;

  function handleClick(itemId: number) {
    const updatedFilters = filters.map((filter) => {
      if (filter.id === itemId) {
        return { ...filter, selected: true };
      }
      return { ...filter, selected: false };
    });
    setFilters(updatedFilters);
    updateDisplayedTaskList(item.text);
  }
  return (
    <div
      className={`filter-item-wrapper ${
        item.selected ? "selected" : "not-selected"
      }`}
      onClick={() => {
        handleClick(item.id);
      }}
    >
      <div className="text">{item.text}</div>
      <div className="number">{item.numberOfTasks}</div>
    </div>
  );
}

export default FilterItem;
