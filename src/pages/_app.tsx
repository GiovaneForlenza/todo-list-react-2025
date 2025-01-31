import "@/styles/main.scss";
import "@/styles/todo-list.scss";
import "@/styles/header.scss";
import "@/styles/variables.scss";
import "@/styles/filter/item.scss";
import "@/styles/filter/list.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
