import { Task, TasksContext } from "@/contexts/TasksContext";
import { useContext, useEffect, useState } from "react";

export const LOCAL_STORAGE_KEYS = {
  TASKS: "tasks",
  COMPLETED_TASKS: "completed_tasks",
  INCOMPLETE_TASKS: "incomplete_tasks",
  TOTAL_OF_TASKS: "total_of_tasks",
};

export function addTaskToLocalStorage(value: Task) {
  let returnedTasks = getTasksFromLocalStorage();

  let totalOfTasks = getFilterCount(LOCAL_STORAGE_KEYS.TOTAL_OF_TASKS);
  let incomplete_tasks = getFilterCount(LOCAL_STORAGE_KEYS.INCOMPLETE_TASKS);

  if (returnedTasks) {
    returnedTasks.push(value);
  } else {
    returnedTasks = [value];
  }

  try {
    if (!getFilterCount(LOCAL_STORAGE_KEYS.COMPLETED_TASKS))
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.COMPLETED_TASKS,
        JSON.stringify(0)
      );

    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.TASKS,
      JSON.stringify(returnedTasks)
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.INCOMPLETE_TASKS,
      JSON.stringify(incomplete_tasks + 1)
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.TOTAL_OF_TASKS,
      JSON.stringify(totalOfTasks + 1)
    );
  } catch (error) {
    console.log(error);
  }
}

export function getFilterCount(filter: string): number {
  try {
    let filterCounter = window.localStorage.getItem(filter);
    return filterCounter ? parseInt(filterCounter) : 0;
    
  } catch (error) {
    
  }
  return 0
}

export function increaseFilterCount(filter: string) {
  let filterCount = getFilterCount(filter);
  if (!filterCount) filterCount = 0;
  window.localStorage.setItem(filter, JSON.stringify(filterCount + 1));
}

export function decreaseFilterCount(filter: string) {
  let filterCount = getFilterCount(filter);
  if (!filterCount) filterCount = 0;
  window.localStorage.setItem(filter, JSON.stringify(filterCount - 1));
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
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.log(error);
  }
}

export function updateTasksInLocalStorage(updatedTasks:Task[]) {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.TASKS,
    JSON.stringify(updatedTasks)
  );
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
