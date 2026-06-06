import { ModalContext } from "@/contexts/ModalContext";
import React, { useContext } from "react";

function Header() {
  // const { openModal } = useContext(ModalContext) || {
  //   openModal: () => {},
  // };

  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div className="header-wrapper">
      <div className="text">
        <div className="title">Your tasks</div>
        <div className="date">{date.toLocaleDateString("en-US", options)}</div>
      </div>
      <button className="primary-button" /*onClick={() => openModal("add")}*/>
        + Add task
      </button>
    </div>
  );
}

export default Header;
