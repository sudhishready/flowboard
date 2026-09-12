import { BoardProvider } from "@/context/board-context";
import { Board } from "@/components/board/board";

export default function Home() {
  return (
    <BoardProvider><Board /></BoardProvider>
  );
}