import { CellValue } from "@/models/types";

export interface GameCellProps {
  x: number;
  y: number;
  value: CellValue;
  onClick: (x: number, y: number) => void;
  isWinning: boolean;
  cellSize?: number;
}
