import React from "react";
import { Box } from "@mui/material";
import { GameCellProps } from "./GameCell.types";
import { COLORS } from "@/constants";

export const GameCell: React.FC<GameCellProps> = ({
  x,
  y,
  value,
  onClick,
  isWinning,
  cellSize = 40,
}) => {
  const handleClick = () => {
    onClick(x, y);
  };

  const boxBackgroundColor = isWinning ? COLORS.BLUE_DARK : "background.paper";
  const boxCursor = value ? "default" : "pointer";
  const boxBackgrondHover = !value ? "rgba(0, 0, 0, 0.05)" : undefined;

  return (
    <Box
      sx={{
        width: cellSize,
        height: cellSize,
        minWidth: cellSize,
        minHeight: cellSize,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: boxBackgroundColor,
        cursor: boxCursor,
        "&:hover": {
          backgroundColor: boxBackgrondHover,
        },
        position: "relative",
        fontSize: cellSize * 0.4,
        fontWeight: "bold",
        userSelect: "none",
      }}
      onClick={!value ? handleClick : undefined}
    >
      {value}
      <Box
        sx={{
          position: "absolute",
          bottom: 2,
          right: 2,
          fontSize: cellSize * 0.2,
          color: "text.secondary",
          opacity: 0.6,
        }}
      ></Box>
    </Box>
  );
};
