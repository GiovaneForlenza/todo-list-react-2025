import React, { createContext, useContext, useState, ReactNode } from "react";

export type modalTypes = "add" | "edit" | "delete";

interface ModalContextProps {
  isOpen: boolean;
  modalType: modalTypes | null;
  openModal: (type: modalTypes) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [modalType, setModalType] = useState<modalTypes | null>(null);

  const openModal = (type: modalTypes) => {
    setModalType(type);
    setIsOpen(true);
    const modalElement = document.getElementById("modal-wrapper");
    if (modalElement) {
      modalElement.classList.add("show");
      modalElement.classList.remove("hide");
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    const modalElement = document.getElementById("modal-wrapper");
    if (modalElement) {
      modalElement.classList.add("hide");
      modalElement.classList.remove("show");
    }
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
