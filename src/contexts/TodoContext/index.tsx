// import { createContext, useState } from "react";

// const TodoContext = createContext({
//   todos: [],
//   addTodo: (todoText: string) => {},
//   toggleTodo: (index: number) => {},
// });

// type Todo = { text: string; completed: boolean; completedAt?: Date };

// import { ReactNode } from "react";

// export const TodoProvider = ({ children }: { children: ReactNode }) => {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   const addTodo = (todoText: string) => {
//     const newTodo = { text: todoText, completed: false };
//     setTodos([...todos, newTodo]);
//   };

//   /**
//    * The `toggleTodo` function toggles the completion status of a todo item at a specific index and
//    * updates the completion timestamp accordingly.
//    * @param {number} index - The `index` parameter in the `toggleTodo` function represents the index of
//    * the todo item in the `todos` array that you want to toggle between completed and not completed.
//    */
//   const toggleTodo = (index: number) => {
//     const updatedTodos: Todo[] = todos.map((item, i) => {
//       if (i === index) {
//         return Object.assign(item, {
//           ...item,
//           completedAt: item.completed ? new Date().toISOString : null,
//           completed: !item.completed,
//         });
//       } else {
//         return item;
//       }
//     });

//     setTodos(updatedTodos);
//   };

//   return (
//     <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
//       {children}
//     </TodoContext.Provider>
//   );
// };
