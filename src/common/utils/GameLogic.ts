import { CellValue, Player } from "@/models/types";

type GridType = Record<string, CellValue>;
type Direction = [number, number];

const DIRECTIONS: Direction[] = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
];

const getCellValue = (grid: GridType, x: number, y: number): CellValue => {
  return grid[`${x},${y}`] || null;
};

export const checkWinner = (
  grid: GridType,
  x: number,
  y: number,
  player: Player
): boolean => {
  return DIRECTIONS.some(([dx, dy]) => {
    let count = 1;

    for (let i = 1; i < 5; i++) {
      if (getCellValue(grid, x + i * dx, y + i * dy) !== player) break;
      count++;
    }

    for (let i = 1; i < 5; i++) {
      if (getCellValue(grid, x - i * dx, y - i * dy) !== player) break;
      count++;
    }

    return count >= 5;
  });
};

export const getWinningCells = (
  grid: GridType,
  x: number,
  y: number,
  player: Player
): Set<string> => {
  const winningCells = new Set<string>();

  DIRECTIONS.forEach(([dx, dy]) => {
    const cellsInLine = new Set<string>();

    for (let i = -4; i <= 4; i++) {
      const nx = x + i * dx;
      const ny = y + i * dy;
      if (getCellValue(grid, nx, ny) === player) {
        cellsInLine.add(`${nx},${ny}`);
      } else {
        if (cellsInLine.size >= 5) {
          cellsInLine.forEach((cell) => winningCells.add(cell));
        }
        cellsInLine.clear();
      }
    }

    if (cellsInLine.size >= 5) {
      cellsInLine.forEach((cell) => winningCells.add(cell));
    }
  });

  return winningCells;
};
