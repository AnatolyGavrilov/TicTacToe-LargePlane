import React, { useState, useCallback, useMemo } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { GameBoardProps, Player } from "@/models/types";
import { checkWinner, getWinningCells } from "@/common/utils/GameLogic";
import { GameCell } from "../GameCell";

export const GameBoard: React.FC<GameBoardProps> = ({
  players,
  onGameEnd,
  onMove,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery("(min-width: 1920px)");

  const [grid, setGrid] = useState<Record<string, Player | null>>({});
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winningCells, setWinningCells] = useState<Set<string>>(new Set());

  const cellSize = isMobile ? 32 : isTablet ? 40 : isLargeScreen ? 64 : 48;
  const initialGridSize = 1;

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      const key = `${x},${y}`;
      if (grid[key]) return;

      const newGrid = { ...grid, [key]: currentPlayer };
      setGrid(newGrid);
      onMove(currentPlayer, { x, y });

      if (checkWinner(newGrid, x, y, currentPlayer)) {
        setWinningCells(getWinningCells(newGrid, x, y, currentPlayer));
        onGameEnd(currentPlayer);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    },
    [grid, currentPlayer, onMove, onGameEnd]
  );

  const gridBounds = useMemo(() => {
    const keys = Object.keys(grid);
    if (keys.length === 0)
      return {
        minX: -initialGridSize,
        maxX: initialGridSize,
        minY: -initialGridSize,
        maxY: initialGridSize,
      };

    const coords = keys.map((key) => {
      const [x, y] = key.split(",").map(Number);
      return { x, y };
    });

    return {
      minX: Math.min(...coords.map((c) => c.x)) - 1,
      maxX: Math.max(...coords.map((c) => c.x)) + 1,
      minY: Math.min(...coords.map((c) => c.y)) - 1,
      maxY: Math.max(...coords.map((c) => c.y)) + 1,
    };
  }, [grid, initialGridSize]);

  const { minX, maxX, minY, maxY } = gridBounds;
  const gridWidth = maxX - minX + 1;
  const gridHeight = maxY - minY + 1;

  const calculatedCellSize = useMemo(() => {
    const maxCellsHorizontal = Math.floor(window.innerWidth / (cellSize + 8));
    if (gridWidth > maxCellsHorizontal) {
      return Math.max(24, Math.floor(window.innerWidth / gridWidth) - 8);
    }
    return cellSize;
  }, [gridWidth, cellSize]);

  const boxPadding = isMobile ? 1 : 2;
  const currentPlayerLabel =
    currentPlayer === "X" ? players.player1 : players.player2;
  const currentMove = `${currentPlayerLabel} (${currentPlayer})`;
  const typographyVariant = isMobile ? "h6" : "h5";
  const boxMaxHeight = isMobile ? "60vh" : "70vh";
  const initialRows = Array.from({ length: gridHeight });
  const initialColumns = Array.from({ length: gridWidth });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: boxPadding,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Typography
        variant={typographyVariant}
        gutterBottom
        sx={{ textAlign: "center", mb: 2 }}
      >
        Ход: {currentMove}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          overflow: "auto",
          maxHeight: boxMaxHeight,
          pb: 1,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: `repeat(${gridWidth}, ${calculatedCellSize}px)`,
            gridAutoRows: `${calculatedCellSize}px`,
            mx: "auto",
          }}
        >
          {initialRows.map((_, rowIndex) => {
            const y = maxY - rowIndex;
            return initialColumns.map((_, colIndex) => {
              const x = minX + colIndex;
              const key = `${x},${y}`;
              return (
                <GameCell
                  key={key}
                  x={x}
                  y={y}
                  value={grid[key]}
                  onClick={handleCellClick}
                  isWinning={winningCells.has(key)}
                  cellSize={calculatedCellSize}
                />
              );
            });
          })}
        </Box>
      </Box>
    </Box>
  );
};
