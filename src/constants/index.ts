const COLORS = {
  BLUE_DARK: "#1976D2",
  BLUE_LIGHT: "#90CAF9",
  BLUE_GRADIENT: "linear-gradient(45deg, #1976D2, #90CAF9)",
  DIMMED_BLACK: "rgba(0, 0, 0, 0.05)",
  WHITE_SMOKE: "#f5f5f5",
};

const ROUTES = {
  ROOT: "/",
  GAME: "/game",
  HISTORY: "/history",
} as const;

export { COLORS, ROUTES };
