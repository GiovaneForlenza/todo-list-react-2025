import React, { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { FiltersContext } from "@/contexts/FiltersContext";

export interface Task {
  id: number;
  title: string;
  description: string;
  date?: string;
  time?: string;
  completed: boolean;
}

function index() {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const {
    setCompletedTasks,
    setIncompleteTasks,
    completedTasks
  } = useContext(FiltersContext) || {};

  function addTask(text: string) {
    const newTask = { id: Date.now(), text, completed: false };
    // setTasks([...tasks, newTask]);
    setText("");
  }
  function clearAll() {
    setTasks([]);
  }

  function toggleCompleted(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  function deleteTasks(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const tasksListArray: Task[] = [
    {
      id: 1,
      title: "Buy groceries",
      description:
        "Buy groceries from the supermarket, including fruits, vegetables, and dairy products.",
      completed: true,
      date: "Today",
      time: "10:00",
    },
    {
      id: 2,
      title: "Walk the dog",
      description:
        "Take the dog for a walk in the park for at least 30 minutes.",
      completed: false,
    },
    {
      id: 3,
      title: "Read a book",
      description: "Read a book for at least one hour to relax and unwind.",
      completed: false,
    },
    {
      id: 4,
      title: "Clean the house",
      description:
        "Clean the house thoroughly, including vacuuming and dusting all rooms.",
      completed: false,
    },
    {
      id: 5,
      title: "Exercise",
      description: "Do a 30-minute workout session.",
      completed: false,
    },
    {
      id: 6,
      title: "Call Mom",
      description: "Have a chat with mom over the phone.",
      completed: true,
      date: "Tomorrow",
      time: "15:00",
    },
    {
      id: 7,
      title: "Finish project report",
      description: "Complete the final report for the project.",
      completed: false,
    },
    {
      id: 8,
      title: "Attend meeting",
      description: "Participate in the team meeting via Zoom.",
      completed: true,
      date: "Today",
      time: "14:00",
    },
    {
      id: 9,
      title: "Grocery shopping",
      description: "Buy weekly groceries from the local market.",
      completed: false,
    },
    {
      id: 10,
      title: "Pay bills",
      description: "Pay electricity and water bills online.",
      completed: true,
    },
    {
      id: 11,
      title: "Write blog post",
      description: "Write a new blog post about React hooks.",
      completed: false,
    },
    {
      id: 12,
      title: "Plan vacation",
      description: "Plan the itinerary for the upcoming vacation.",
      completed: false,
    },
    {
      id: 13,
      title: "Visit the dentist",
      description: "Go for a routine dental check-up.",
      completed: true,
      date: "Next Monday",
      time: "09:00",
    },
    {
      id: 14,
      title: "Cook dinner",
      description: "Prepare a healthy dinner for the family.",
      completed: false,
    },
    {
      id: 15,
      title: "Water plants",
      description: "Water all the indoor and outdoor plants.",
      completed: true,
    },
    {
      id: 16,
      title: "Study for exam",
      description: "Review notes and study for the upcoming exam.",
      completed: false,
    },
    {
      id: 17,
      title: "Organize closet",
      description: "Sort and organize clothes in the closet.",
      completed: false,
    },
    {
      id: 18,
      title: "Reply to emails",
      description: "Respond to all pending emails.",
      completed: true,
    },
    {
      id: 19,
      title: "Fix the bike",
      description: "Repair the flat tire on the bicycle.",
      completed: false,
    },
    {
      id: 20,
      title: "Meditate",
      description: "Spend 20 minutes meditating to relax.",
      completed: true,
    },
  ];

  function countCompleteAndIncompleteTasks() {
    if (setCompletedTasks && setIncompleteTasks) {
      tasks.forEach((task) => {
        task.completed
          ? setCompletedTasks((prev) => prev + 1)
          : setIncompleteTasks((prev) => prev + 1);
      });
    }
    alert(completedTasks);
  }

  useEffect(() => {
    setTasks(tasksListArray);
    countCompleteAndIncompleteTasks();
  }, []);

  return (
    <div className="task-list-wrapper">
      {tasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTasks}
            toggleCompleted={toggleCompleted}
          />
        );
      })}
    </div>
  );
}

export default index;
