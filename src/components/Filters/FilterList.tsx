"use client";

import React, { useContext } from "react";
import FilterItem from "./FilterItem";
import dynamic from "next/dynamic";
import { FiltersContext } from "@/contexts/FiltersContext";


function FilterList() {

  const context = useContext(FiltersContext);
  if (!context) {
    return null; // or handle the null case appropriately
  }
  const { filters } = context;

  return (
    <div className="filter-list-wrapper">
      {filters.map((filter) => (
        <FilterItem key={filter.id} item={filter} />
      ))}
    </div>
  );
}

export default dynamic(() => Promise.resolve(FilterList), { ssr: false });
