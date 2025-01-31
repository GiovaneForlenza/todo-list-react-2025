import React from "react";

function Header() {
  return <div className="header-wrapper">
   <div className="text">
    <div className="title">Your tasks</div>
    <div className="date">Wednesday, 31 Jan</div>
   </div>
   <div className="button">
    <button>+ Add task</button>
   </div>
  </div>;
}

export default Header;
