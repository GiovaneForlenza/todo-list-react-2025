import { ModalContext } from "@/contexts/ModalContext";
import React, { useContext } from "react";

function Header() {
  const { openModal } = useContext(ModalContext) || {
    openModal: () => {},
    
  };
  return (
    <div className="header-wrapper">
      <div className="text">
        <div className="title">Your tasks</div>
        <div className="date">Wednesday, 31 Jan</div>
      </div>
      <button className="primary-button" onClick={() => openModal("add")}>
        + Add task
      </button>
    </div>
  );
}

export default Header;
