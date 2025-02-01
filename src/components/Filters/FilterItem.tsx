import React, { useState } from "react";
import { FilterItemType } from "./FilterList";

interface FilterItemProps {
  item: FilterItemType;
  handleClick: (id: number) => void;
}

function FilterItem({ item, handleClick }: FilterItemProps) {
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
