import TaskList from "@/components/Tasks/TaskList";
import Header from "@/components/Header";
import FilterList from "@/components/Filters/FilterList";
import { FiltersContext, FiltersProvider } from "@/contexts/FiltersContext";

export default function Home() {
  return (
    <div>
      <div className="todo-wrapper">
        <Header />
        <FiltersProvider>
          <FilterList />
        </FiltersProvider>
        <TaskList />
      </div>
    </div>
  );
}
