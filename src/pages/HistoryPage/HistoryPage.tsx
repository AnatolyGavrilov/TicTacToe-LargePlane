import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { GameHistory } from "@/models/types";
import { getGameHistory } from "@/common/utils/historyUtils";
import { HistoryRow } from "@/modules/History/HistoryRow";
import { HistoryModal } from "@/components/Modals/HistoryModal";

export const HistoryPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameHistory | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleViewGame = (game: GameHistory) => {
    setSelectedGame(game);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const history = getGameHistory();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        История игр
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Игроки</TableCell>
              <TableCell>Результат</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((game) => (
              <HistoryRow game={game} handleClick={handleViewGame} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={handleClose}>
        <HistoryModal game={selectedGame} onClose={handleClose} />
      </Modal>
    </Box>
  );
};
