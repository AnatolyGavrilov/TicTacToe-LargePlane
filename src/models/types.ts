export type Player = "X" | "O";
export type CellValue = Player | null;

export interface CellPosition {
  x: number;
  y: number;
}

export interface GameMove {
  player: Player;
  position: CellPosition;
  timestamp: Date;
}

export interface GameHistory {
  id: string;
  date: Date;
  players: {
    playerX: string;
    playerO: string;
  };
  winner: Player | "draw";
  moves: GameMove[];
}

export interface GameBoardProps {
  players: {
    player1: string;
    player2: string;
  };
  onGameEnd: (winner: Player | null) => void;
  onMove: (player: Player, position: CellPosition) => void;
}

export interface GamePageLocationState {
  player1: string;
  player2: string;
}

export interface SerializedGameHistory {
  id: string;
  date: string;
  players: {
    playerX: string;
    playerO: string;
  };
  winner: "X" | "O" | "draw";
  moves: SerializedGameMove[];
}

export interface SerializedGameMove {
  player: "X" | "O";
  position: {
    x: number;
    y: number;
  };
  timestamp: string;
}
