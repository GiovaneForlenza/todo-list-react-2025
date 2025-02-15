import TaskList from "@/components/Tasks/TaskList";
import Header from "@/components/Header";
import FilterList from "@/components/Filters/FilterList";
import { FiltersProvider } from "@/contexts/FiltersContext";
import { TasksProvider } from "@/contexts/TasksContext";
import { ModalProvider } from "@/contexts/ModalContext";
import Modal from "@/components/Modal/Modal";

export default function Home() {
  return (
    <div className="todo-wrapper">
      <ModalProvider>
        <Header />
        <TasksProvider>
          <FiltersProvider>
            <FilterList />
            <TaskList />
            <Modal />
          </FiltersProvider>
        </TasksProvider>
      </ModalProvider>
    </div>
  );
}
