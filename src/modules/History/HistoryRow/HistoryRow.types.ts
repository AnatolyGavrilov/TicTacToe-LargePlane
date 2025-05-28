import { GameHistory } from "@/models/types";

export interface HistoryRowProps {
  game: GameHistory;
  handleClick: (game: GameHistory) => void;
}
