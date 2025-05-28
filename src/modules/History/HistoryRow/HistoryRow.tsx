import type { FC } from "react";
import type { HistoryRowProps } from "./HistoryRow.types";
import { Button, TableCell, TableRow } from "@mui/material";
import { getGameResult } from "@/common/utils/historyUtils";

export const HistoryRow: FC<HistoryRowProps> = ({ game, handleClick }) => {
  const date = new Date(game.date).toLocaleString();
  const result = getGameResult(game);

  return (
    <TableRow key={game.id}>
      <TableCell>{date}</TableCell>
      <TableCell>
        {game.players.playerX} vs {game.players.playerO}
      </TableCell>
      <TableCell>{result}</TableCell>
      <TableCell>
        <Button variant="outlined" onClick={() => handleClick(game)}>
          Просмотр
        </Button>
      </TableCell>
    </TableRow>
  );
};
