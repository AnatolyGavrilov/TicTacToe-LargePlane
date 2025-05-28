import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Box, Modal } from "@mui/material";
import { GameBoard } from "@/modules/Game/GameBoard";
import { saveGameToHistory } from "@/common/utils/historyUtils";
import { GameModal } from "@/components/Modals/GameModal";
import { CellPosition, GameHistory, GameMove, Player } from "@/models/types";

export const GamePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { player1, player2 } = location.state || {
    player1: "Игрок 1",
    player2: "Игрок 2",
  };
  const [winner, setWinner] = useState<Player | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [moves, setMoves] = useState<GameMove[]>([]);

  const handleGameEnd = (winner: Player | null) => {
    setWinner(winner);
    setOpenModal(true);
    const gameHistory: GameHistory = {
      id: Date.now().toString(),
      date: new Date(),
      players: {
        playerX: player1,
        playerO: player2,
      },
      winner: winner || "draw",
      moves: moves,
    };
    saveGameToHistory(gameHistory);
  };

  const handleMove = (player: Player, position: CellPosition) => {
    setMoves([...moves, { player, position, timestamp: new Date() }]);
  };

  const handleClose = () => {
    setOpenModal(false);
    navigate("/");
  };

  const winnerLabel = winner
    ? `Победитель: ${winner === "X" ? player1 : player2} (${winner})`
    : "Ничья!";

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Игра: {player1} (X) vs {player2} (O)
      </Typography>
      <GameBoard
        players={{ player1, player2 }}
        onGameEnd={handleGameEnd}
        onMove={handleMove}
      />
      <Modal open={openModal} onClose={handleClose}>
        <GameModal label={winnerLabel} handleClose={handleClose} />
      </Modal>
    </Box>
  );
};
