import React, { useState } from "react";

function FilterList() {
  const [FilterList, setFilterList] = useState([
    "All",
    "Incomplete",
    "Completed",
  ]);
  return <div className="filter-list-wrapper">FilterList</div>;
}

export default FilterList;
