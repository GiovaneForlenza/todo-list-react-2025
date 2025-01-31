interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  toggleCompleted: (id: number) => void;
}

const TodoItem = ({ task, deleteTask, toggleCompleted }: TodoItemProps) => {};


export default TodoItem;
