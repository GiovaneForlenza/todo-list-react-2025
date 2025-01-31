import React, { useState } from "react";
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function index() {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(text: string) {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText("");
  }
  function clearAll() {
    setTasks([]);
  }

  function toggleCompleted(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }
  function deleteTasks(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  return (
    <div className="">
      <div className="header">
        <div className="title">
          <h1>Todo-List</h1>
        </div>
      </div>
      <input
        type="text"
        name=""
        id=""
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="add"
        onClick={() => {
          addTask(text);
        }}
      >
        Add task
      </button>
      <br />
      you have {tasks.length} tasks
      <br />
      {tasks.map((task) => task.text)}
      <br />
    </div>
  );
}

export default index;
