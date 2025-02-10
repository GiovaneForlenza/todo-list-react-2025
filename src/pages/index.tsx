import TaskList from "@/components/Tasks/TaskList";
import Header from "@/components/Header";
import FilterList from "@/components/Filters/FilterList";
import { FiltersProvider } from "@/contexts/FiltersContext";
import { TasksProvider } from "@/contexts/TasksContext";
import { ModalProvider } from "@/contexts/ModalContext";
import Modal from "@/components/Modal/Modal";
import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

export default function Home() {
  return (
      <div className="todo-wrapper">
        <ModalProvider>
          <Header />
          <TasksProvider>
            <FiltersProvider>
              <FilterList />
            </FiltersProvider>
            <TaskList />
            <Modal />
          </TasksProvider>
        </ModalProvider>
      </div>
  );
}
