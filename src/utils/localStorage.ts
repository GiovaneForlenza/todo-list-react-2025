import { Task, TasksContext } from "@/contexts/TasksContext";
import { useContext, useEffect, useState } from "react";

export function addTaskToLocalStorage(key: string, value: Task) {
  let returnedTasks = getTasksFromLocalStorage();
  if (returnedTasks) {
    returnedTasks.push(value);
  } else {
    returnedTasks = [value];
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(returnedTasks));
  } catch (error) {
    console.log(error);
  }
}

export function getLastUsedId(): number {
  let lastUsedId = 0;
  let tasks = getTasksFromLocalStorage();
  tasks &&
    tasks.forEach((task: { id: number }) => {
      if (task.id > lastUsedId) lastUsedId = task.id;
    });
  return lastUsedId;
}

export function getTasksFromLocalStorage() {
  try {
    const item = window.localStorage.getItem("tasks");
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.log(error);
  }
}

export const initialTasksForLocalStorage = [
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
    description: "Take the dog for a walk in the park for at least 30 minutes.",
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
];
