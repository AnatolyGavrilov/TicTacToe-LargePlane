import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ROUTES } from "@/constants";

export const LoginPage: React.FC = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleStartGame = () => {
    if (player1 && player2) {
      navigate(ROUTES.GAME, { state: { player1, player2 } });
    }
  };

  const buttonFontSize = isMobile ? "0.875rem" : "1rem";
  const buttonSize = isMobile ? "medium" : "large";
  const boxMt = isMobile ? 4 : 8;
  const TypographyVariant = isMobile ? "h5" : "h4";
  const TextFieldSize = isMobile ? "small" : "medium";

  return (
    <Container maxWidth="sm" sx={{ py: isMobile ? 2 : 4 }}>
      <Box
        sx={{
          mt: boxMt,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant={TypographyVariant}
          component="h1"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Крестики-Нолики
        </Typography>

        <TextField
          label="Игрок 1 (X)"
          variant="outlined"
          fullWidth
          size={TextFieldSize}
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />

        <TextField
          label="Игрок 2 (O)"
          variant="outlined"
          fullWidth
          size={TextFieldSize}
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          size={buttonSize}
          fullWidth
          sx={{
            mt: 2,
            py: isMobile ? 1 : 1.5,
            fontSize: buttonFontSize,
          }}
          onClick={handleStartGame}
          disabled={!player1 || !player2}
        >
          Начать игру
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          size={buttonSize}
          fullWidth
          sx={{
            py: isMobile ? 0.5 : 1,
            fontSize: buttonFontSize,
          }}
          onClick={() => navigate(ROUTES.HISTORY)}
        >
          История игр
        </Button>
      </Box>
    </Container>
  );
};
