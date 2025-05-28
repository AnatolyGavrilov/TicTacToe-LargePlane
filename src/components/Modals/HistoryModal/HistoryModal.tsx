import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { getGameResult } from "@/common/utils/historyUtils";
import { GameHistory } from "@/models/types";

interface HistoryModalProps {
  game: GameHistory | null;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  game,
  onClose,
}) => {
  const result = getGameResult(game);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        overflow: "auto",
        maxHeight: "90vh",
      }}
    >
      {game && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            Игра от {new Date(game.date).toLocaleString()}
          </Typography>
          <Typography gutterBottom>
            {game.players.playerX} (X) vs {game.players.playerO} (O)
          </Typography>
          <Typography gutterBottom>Результат: {result}</Typography>
          <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
            Закрыть
          </Button>
        </>
      )}
    </Box>
  );
};
