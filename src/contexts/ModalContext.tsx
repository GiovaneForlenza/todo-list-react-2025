import React, { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "./TasksContext";
import { MdDescription } from "react-icons/md";

export type modalTypes = "add" | "edit" | "delete";

interface ModalContextProps {
  isModalOpen: boolean;
  modalType: modalTypes | null;
  openModal: (type: modalTypes) => void;
  closeModal: () => void;
  taskInfo: Task;
  setTaskInfo: React.Dispatch<React.SetStateAction<Task>>;
}

const ModalContext = createContext<ModalContextProps | null>(null);

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<modalTypes | null>(null);
  const [taskInfo, setTaskInfo] = useState({
    id: 0,
    title: "",
    description: "",
    completed: false,
  });

  const openModal = (type: modalTypes) => {
    setModalType(type);
    setIsModalOpen(true);
    const modalElement = document.getElementById("modal-wrapper");
    if (modalElement) {
      modalElement.classList.add("show");
      modalElement.classList.remove("hide");
    }
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    const modalElement = document.getElementById("modal-wrapper");
    if (modalElement) {
      modalElement.classList.add("hide");
      modalElement.classList.remove("show");
    }
    document.body.style.overflow = "visible";
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalType,
        openModal,
        closeModal,
        taskInfo,
        setTaskInfo,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
