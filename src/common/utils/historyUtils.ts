import type {
  GameHistory,
  GameMove,
  SerializedGameHistory,
} from "../../models/types";

const HISTORY_KEY = "ticTacToeHistory";

export const saveGameToHistory = (game: GameHistory): void => {
  const history = getGameHistory();
  history.unshift(game);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getGameHistory = (): GameHistory[] => {
  const historyStr = localStorage.getItem(HISTORY_KEY);
  if (!historyStr) return [];

  try {
    const serializedHistory: SerializedGameHistory[] = JSON.parse(historyStr);

    return serializedHistory.map(
      (serializedGame): GameHistory => ({
        id: serializedGame.id,
        date: new Date(serializedGame.date),
        players: serializedGame.players,
        winner: serializedGame.winner,
        moves: serializedGame.moves.map(
          (serializedMove): GameMove => ({
            player: serializedMove.player,
            position: serializedMove.position,
            timestamp: new Date(serializedMove.timestamp),
          })
        ),
      })
    );
  } catch (e) {
    console.error("Failed to parse game history", e);
    return [];
  }
};

export const clearGameHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};

export const getGameResult = (game: GameHistory | null) => {
  if (game?.winner === "draw") return "Ничья";
  const winnerName =
    game?.winner === "X" ? game.players.playerX : game?.players.playerO;

  return `Победил ${winnerName}`;
};
