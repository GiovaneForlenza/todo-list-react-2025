import TodoList from "@/components/Tasks/TaskList";
import Header from "@/components/Header";
import FilterList from "@/components/Filters/FilterList";

export default function Home() {
  return (
    <div>
      <div className="todo-wrapper">
        <Header />
        <FilterList />
        {/* <TodoList /> */}
      </div>
    </div>
  );
}
