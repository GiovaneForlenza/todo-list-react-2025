import React, { createContext, useContext, useState, ReactNode } from "react";

export type modalTypes = "add" | "edit" | "delete";

interface ModalContextProps {
  isModalOpen: boolean;
  modalType: modalTypes | null;
  openModal: (type: modalTypes) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<modalTypes | null>(null);

  const openModal = (type: modalTypes) => {
    setModalType(type);
    setIsModalOpen(true);
    const modalElement = document.getElementById("modal-wrapper");
    if (modalElement) {
      modalElement.classList.add("show");
      modalElement.classList.remove("hide");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    const modalElement = document.getElementById("modal-wrapper");
    if (modalElement) {
      modalElement.classList.add("hide");
      modalElement.classList.remove("show");
    }
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalType, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
