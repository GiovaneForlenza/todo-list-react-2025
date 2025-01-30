import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div>
      <TodoList />
    </div>
  );
}
